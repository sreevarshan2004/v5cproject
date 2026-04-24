<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

/* ================= GET JSON INPUT ================= */
$input = json_decode(file_get_contents("php://input"), true);

/* ================= SAFE VARIABLES ================= */
$id = $input['id'] ?? null;

$title = $input['title'] ?? '';
$location = $input['location'] ?? '';
$price = $input['price'] ?? 0;
$no_of_beds = $input['no_of_beds'] ?? 0;
$no_of_bath = $input['no_of_bath'] ?? 0;
$sq_ft = $input['sq_ft'] ?? 0;
$description = $input['description'] ?? '';
$youtube = $input['youtube'] ?? '';
$floor_bedroom = $input['floor_bedroom'] ?? 0;
$size = $input['size'] ?? '';
$floorImage = $input['floor_image'] ?? '';
$contactname = $input['contactname'] ?? '';
$email = $input['email'] ?? '';
$phone = $input['phone'] ?? '';
$estimatedvalue = $input['estimatedvalue'] ?? 0;
$brochure_type = $input['brochure_type'] ?? '';
$browsure = $input['browsure'] ?? '';
$video = $input['video'] ?? '';
$images = $input['images'] ?? [];
$blueprints = $input['blueprints'] ?? [];

/* ================= FILTER OUT BASE64 IMAGES ================= */
function filterBase64Images($imageArray) {
    if (!is_array($imageArray)) return [];
    return array_filter($imageArray, function($img) {
        return !empty($img) && !str_starts_with($img, 'data:');
    });
}

$images = filterBase64Images($images);
$blueprints = filterBase64Images($blueprints);

$pdo->beginTransaction();

try {

    /* ================= UPDATE PROPERTY ================= */
    if (!empty($id)) {

        $property_id = $id;

        // Get old files
        $old = $pdo->prepare("SELECT floor_image, brochure_url, video FROM properties WHERE id=?");
        $old->execute([$property_id]);
        $oldData = $old->fetch(PDO::FETCH_ASSOC);

        if (!$floorImage) $floorImage = $oldData['floor_image'];
        if (!$browsure) $browsure = $oldData['brochure_url'];
        if (!$video) $video = $oldData['video'];

        $stmt = $pdo->prepare("
            UPDATE properties SET
            title=?, location=?, price=?, no_of_beds=?, no_of_bath=?, sq_ft=?,
            description=?, youtube=?, floor_bedroom=?, size=?,
            floor_image=?, contact_name=?, email=?, phone=?,
            estimated_value=?, brochure_type=?, brochure_url=?, video=?,
            updated_at=NOW()
            WHERE id=?
        ");

        $stmt->execute([
            $title, $location, $price, $no_of_beds, $no_of_bath, $sq_ft,
            $description, $youtube, $floor_bedroom, $size,
            $floorImage, $contactname, $email, $phone,
            $estimatedvalue, $brochure_type, $browsure, $video,
            $property_id
        ]);

       /* ===== IMAGES ===== */
        if (isset($images) && is_array($images) && count($images) > 0) {
            $pdo->prepare("DELETE FROM property_images WHERE property_id=?")
                ->execute([$property_id]);

            foreach ($images as $img) {
                if (!empty($img) && !str_starts_with($img, 'data:')) {
                    $pdo->prepare("INSERT INTO property_images(property_id,image_url) VALUES (?,?)")
                        ->execute([$property_id, $img]);
                }
            }
        }

        /* ===== BLUEPRINTS ===== */
        if (isset($blueprints) && is_array($blueprints) && count($blueprints) > 0) {
            $pdo->prepare("DELETE FROM property_blueprints WHERE property_id=?")
                ->execute([$property_id]);

            foreach ($blueprints as $bp) {
                if (!empty($bp) && !str_starts_with($bp, 'data:')) {
                    $pdo->prepare("INSERT INTO property_blueprints(property_id,blueprint_url) VALUES (?,?)")
                        ->execute([$property_id, $bp]);
                }
            }
        }

        /* ===== COMPANY ===== */
        $pdo->prepare("DELETE FROM property_company WHERE property_id=?")
            ->execute([$property_id]);

        if (!empty($input['company'])) {
            $companies = is_array($input['company'])
                ? $input['company']
                : json_decode($input['company'], true);

            foreach ($companies as $comp) {
                $pdo->prepare("INSERT INTO property_company(property_id,name,website) VALUES (?,?,?)")
                    ->execute([
                        $property_id,
                        $comp['name'] ?? '',
                        $comp['website'] ?? ''
                    ]);
            }
        }

        /* ===== CONNECTIVITY ===== */
        $pdo->prepare("DELETE FROM property_connectivity WHERE property_id=?")
            ->execute([$property_id]);

        if (!empty($input['connectivity'])) {
            $connect = is_array($input['connectivity'])
                ? $input['connectivity']
                : json_decode($input['connectivity'], true);

            foreach ($connect as $item) {
                $pdo->prepare("INSERT INTO property_connectivity(property_id,name,value) VALUES (?,?,?)")
                    ->execute([
                        $property_id,
                        $item['name'] ?? '',
                        $item['value'] ?? ''
                    ]);
            }
        }

        /* ===== LIFESTYLE ===== */
        $pdo->prepare("DELETE FROM property_lifestyle WHERE property_id=?")
            ->execute([$property_id]);

        if (!empty($input['lifestyle'])) {
            $life = is_array($input['lifestyle'])
                ? $input['lifestyle']
                : json_decode($input['lifestyle'], true);

            foreach ($life as $item) {
                $pdo->prepare("INSERT INTO property_lifestyle(property_id,name,value) VALUES (?,?,?)")
                    ->execute([
                        $property_id,
                        $item['name'] ?? '',
                        $item['value'] ?? ''
                    ]);
            }
        }

        $pdo->commit();

        echo json_encode([
            "status" => true,
            "message" => "Property Updated Successfully",
            "property_id" => $property_id
        ]);

    }
    /* ================= INSERT NEW PROPERTY ================= */
    else {

        $stmt = $pdo->prepare("
            INSERT INTO properties
            (title,location,price,no_of_beds,no_of_bath,sq_ft,description,youtube,
            floor_bedroom,size,floor_image,contact_name,email,phone,estimated_value,
            brochure_type,brochure_url,video,created_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())
        ");

        $stmt->execute([
            $title,$location,$price,$no_of_beds,$no_of_bath,$sq_ft,$description,$youtube,
            $floor_bedroom,$size,$floorImage,$contactname,$email,$phone,$estimatedvalue,
            $brochure_type,$browsure,$video
        ]);

        $property_id = $pdo->lastInsertId();

        if (!empty($images) && is_array($images)) {
            foreach ($images as $img) {
                if (!empty($img) && !str_starts_with($img, 'data:')) {
                    $pdo->prepare("INSERT INTO property_images(property_id,image_url) VALUES (?,?)")
                        ->execute([$property_id,$img]);
                }
            }
        }

        if (!empty($blueprints) && is_array($blueprints)) {
            foreach ($blueprints as $bp) {
                if (!empty($bp) && !str_starts_with($bp, 'data:')) {
                    $pdo->prepare("INSERT INTO property_blueprints(property_id,blueprint_url) VALUES (?,?)")
                        ->execute([$property_id,$bp]);
                }
            }
        }

        $pdo->commit();

        echo json_encode([
            "status"=>true,
            "message"=>"Property Created Successfully",
            "property_id"=>$property_id
        ]);
    }

} catch(Exception $e) {

    $pdo->rollBack();

    http_response_code(500);
    echo json_encode([
        "status"=>false,
        "error"=>$e->getMessage()
    ]);
}
?>
