<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

function saveBase64Image($base64String, $folder) {
    if (empty($base64String) || !str_starts_with($base64String, 'data:')) {
        return $base64String;
    }
    
    preg_match('/^data:([A-Za-z-+\/]+);base64,(.+)$/', $base64String, $matches);
    if (count($matches) !== 3) return null;
    
    $type = $matches[1];
    $data = base64_decode($matches[2]);
    
    $ext = 'jpg';
    if (strpos($type, 'png')) $ext = 'png';
    if (strpos($type, 'webp')) $ext = 'webp';
    if (strpos($type, 'pdf')) $ext = 'pdf';
    
    $uploadDir = __DIR__ . '/uploads/' . $folder;
    if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);
    
    $filename = time() . '_' . uniqid() . '.' . $ext;
    $filepath = $uploadDir . '/' . $filename;
    file_put_contents($filepath, $data);
    
    return 'uploads/' . $folder . '/' . $filename;
}

$data = json_decode(file_get_contents('php://input'), true);

$floorImage = saveBase64Image($data['floorImage'] ?? '', 'floor');
$browsure = saveBase64Image($data['browsure'] ?? '', 'brochures');
$blueprint = saveBase64Image($data['blueprint'] ?? '', 'blueprints');

$images = [];
if (!empty($data['image']) && is_array($data['image'])) {
    foreach ($data['image'] as $img) {
        $saved = saveBase64Image($img, 'images');
        if ($saved) $images[] = $saved;
    }
}

$response = [
    'status' => true,
    'message' => 'Property created',
    'property_id' => rand(1, 999),
    'data' => [
        'title' => $data['title'] ?? '',
        'location' => $data['location'] ?? '',
        'price' => $data['price'] ?? '',
        'no_of_beds' => $data['no_of_beds'] ?? '',
        'no_of_bath' => $data['no_of_bath'] ?? '',
        'sq_ft' => $data['sq_ft'] ?? '',
        'floor_image' => $floorImage,
        'brochure_url' => $browsure,
        'images' => $images,
        'blueprints' => [$blueprint],
        'company' => $data['company'] ?? [],
        'connectivity' => $data['connectivity'] ?? [],
        'lifestyle' => $data['lifestyle'] ?? []
    ]
];

echo json_encode($response);
?>
