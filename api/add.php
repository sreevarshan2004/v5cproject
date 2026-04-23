<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$host = "localhost";
$dbname = "v5c_new";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["status" => false, "error" => $e->getMessage()]);
    exit;
}

function saveBase64Image($base64String, $folder) {
    if (empty($base64String) || !str_starts_with($base64String, 'data:')) {
        return $base64String;
    }
    
    preg_match('/^data:([A-Za-z-+\/]+);base64,(.+)$/', $base64String, $matches);
    if (count($matches) !== 3) return null;
    
    $data = base64_decode($matches[2]);
    $ext = 'jpg';
    if (strpos($matches[1], 'png')) $ext = 'png';
    if (strpos($matches[1], 'webp')) $ext = 'webp';
    if (strpos($matches[1], 'pdf')) $ext = 'pdf';
    if (strpos($matches[1], 'mp4')) $ext = 'mp4';
    
    $uploadDir = __DIR__ . '/uploads/' . $folder;
    if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);
    
    $filename = time() . '_' . uniqid() . '.' . $ext;
    $filepath = $uploadDir . '/' . $filename;
    file_put_contents($filepath, $data);
    
    return 'uploads/' . $folder . '/' . $filename;
}

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;

// Process files
$floorImage = !empty($data['floorImage']) ? saveBase64Image($data['floorImage'], 'floor') : null;
$brochure = !empty($data['browsure']) ? saveBase64Image($data['browsure'], 'brochures') : null;
$blueprint = !empty($data['blueprint']) ? saveBase64Image($data['blueprint'], 'blueprints') : null;
$video = !empty($data['video']) ? saveBase64Image($data['video'], 'videos') : null;

$images = [];
if (!empty($data['image']) && is_array($data['image'])) {
    foreach ($data['image'] as $img) {
        $saved = saveBase64Image($img, 'images');
        if ($saved) $images[] = $saved;
    }
}

if ($id) {
    // UPDATE existing property
    $stmt = $pdo->prepare("UPDATE properties SET 
        title=?, location=?, price=?, no_of_beds=?, no_of_bath=?, sq_ft=?, 
        description=?, youtube=?, floor_bedroom=?, size=?, 
        floor_image=COALESCE(?, floor_image), 
        contact_name=?, email=?, phone=?, estimated_value=?, 
        brochure_url=COALESCE(?, brochure_url), 
        video=COALESCE(?, video), 
        updated_at=NOW() 
        WHERE id=?");
    
    $stmt->execute([
        $data['title'], $data['location'], $data['price'], 
        $data['no_of_beds'], $data['no_of_bath'], $data['sq_ft'],
        $data['description'], $data['youtube'], $data['floorbeadroom'], $data['size'],
        $floorImage, $data['contactname'], $data['email'], $data['phone'], 
        $data['estimatedvalue'], $brochure, $video, $id
    ]);
    
    // Update images if new ones provided
    if (!empty($images)) {
        $pdo->prepare("DELETE FROM property_images WHERE property_id=?")->execute([$id]);
        foreach ($images as $img) {
            $pdo->prepare("INSERT INTO property_images (property_id, image_url) VALUES (?, ?)")->execute([$id, $img]);
        }
    }
    
    // Update blueprint if provided
    if ($blueprint) {
        $pdo->prepare("DELETE FROM property_blueprints WHERE property_id=?")->execute([$id]);
        $pdo->prepare("INSERT INTO property_blueprints (property_id, blueprint_url) VALUES (?, ?)")->execute([$id, $blueprint]);
    }
    
    // Update company
    if (!empty($data['company'])) {
        $pdo->prepare("DELETE FROM property_company WHERE property_id=?")->execute([$id]);
        foreach ($data['company'] as $c) {
            $pdo->prepare("INSERT INTO property_company (property_id, name, website) VALUES (?, ?, ?)")->execute([$id, $c['name'], $c['website']]);
        }
    }
    
    // Update connectivity
    if (!empty($data['connectivity'])) {
        $pdo->prepare("DELETE FROM property_connectivity WHERE property_id=?")->execute([$id]);
        foreach ($data['connectivity'] as $c) {
            $pdo->prepare("INSERT INTO property_connectivity (property_id, name, value) VALUES (?, ?, ?)")->execute([$id, $c['name'], $c['value']]);
        }
    }
    
    // Update lifestyle
    if (!empty($data['lifestyle'])) {
        $pdo->prepare("DELETE FROM property_lifestyle WHERE property_id=?")->execute([$id]);
        foreach ($data['lifestyle'] as $l) {
            $pdo->prepare("INSERT INTO property_lifestyle (property_id, name, value) VALUES (?, ?, ?)")->execute([$id, $l['name'], $l['value']]);
        }
    }
    
    echo json_encode(["status" => true, "message" => "Property updated successfully", "property_id" => $id]);
    
} else {
    // INSERT new property
    $stmt = $pdo->prepare("INSERT INTO properties (
        title, location, price, no_of_beds, no_of_bath, sq_ft, description, youtube,
        floor_bedroom, size, floor_image, contact_name, email, phone, estimated_value,
        brochure_url, video, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
    
    $stmt->execute([
        $data['title'], $data['location'], $data['price'],
        $data['no_of_beds'], $data['no_of_bath'], $data['sq_ft'],
        $data['description'], $data['youtube'], $data['floorbeadroom'], $data['size'],
        $floorImage, $data['contactname'], $data['email'], $data['phone'],
        $data['estimatedvalue'], $brochure, $video
    ]);
    
    $propertyId = $pdo->lastInsertId();
    
    // Insert images
    foreach ($images as $img) {
        $pdo->prepare("INSERT INTO property_images (property_id, image_url) VALUES (?, ?)")->execute([$propertyId, $img]);
    }
    
    // Insert blueprint
    if ($blueprint) {
        $pdo->prepare("INSERT INTO property_blueprints (property_id, blueprint_url) VALUES (?, ?)")->execute([$propertyId, $blueprint]);
    }
    
    // Insert company
    foreach ($data['company'] ?? [] as $c) {
        $pdo->prepare("INSERT INTO property_company (property_id, name, website) VALUES (?, ?, ?)")->execute([$propertyId, $c['name'], $c['website']]);
    }
    
    // Insert connectivity
    foreach ($data['connectivity'] ?? [] as $c) {
        $pdo->prepare("INSERT INTO property_connectivity (property_id, name, value) VALUES (?, ?, ?)")->execute([$propertyId, $c['name'], $c['value']]);
    }
    
    // Insert lifestyle
    foreach ($data['lifestyle'] ?? [] as $l) {
        $pdo->prepare("INSERT INTO property_lifestyle (property_id, name, value) VALUES (?, ?, ?)")->execute([$propertyId, $l['name'], $l['value']]);
    }
    
    echo json_encode(["status" => true, "message" => "Property created successfully", "property_id" => $propertyId]);
}
?>
