<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "localhost";
$dbname = "v5c_new";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM properties ORDER BY created_at DESC");
    $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];

    foreach ($properties as $prop) {
        $id = $prop['id'];

        $images = [];
        $blueprints = [];
        $company = [];
        $connectivity = [];
        $lifestyle = [];

        try {
            $imageStmt = $pdo->prepare("SELECT image_url FROM property_images WHERE property_id = ?");
            $imageStmt->execute([$id]);
            $images = $imageStmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {}

        try {
            $blueprintStmt = $pdo->prepare("SELECT blueprint_url FROM property_blueprints WHERE property_id = ?");
            $blueprintStmt->execute([$id]);
            $blueprints = $blueprintStmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {}

        try {
            $companyStmt = $pdo->prepare("SELECT name, website FROM property_company WHERE property_id = ?");
            $companyStmt->execute([$id]);
            $company = $companyStmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {}

        try {
            $connectivityStmt = $pdo->prepare("SELECT * FROM property_connectivity WHERE property_id = ?");
            $connectivityStmt->execute([$id]);
            $connectivity = $connectivityStmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {}

        try {
            $lifestyleStmt = $pdo->prepare("SELECT * FROM property_lifestyle WHERE property_id = ?");
            $lifestyleStmt->execute([$id]);
            $lifestyle = $lifestyleStmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {}

        $result[] = [
            "id" => $id,
            "title" => $prop['title'] ?? '',
            "location" => $prop['location'] ?? '',
            "price" => $prop['price'] ?? '',
            "no_of_beds" => $prop['no_of_beds'] ?? 0,
            "no_of_bath" => $prop['no_of_bath'] ?? 0,
            "sq_ft" => $prop['sq_ft'] ?? 0,
            "description" => $prop['description'] ?? '',
            "youtube" => $prop['youtube'] ?? '',
            "floor_bedroom" => $prop['floor_bedroom'] ?? 0,
            "size" => $prop['size'] ?? '',
            "floor_image" => $prop['floor_image'] ?? '',
            "brochure_url" => $prop['brochure_url'] ?? '',
            "video" => $prop['video'] ?? '',
            "contact_name" => $prop['contact_name'] ?? '',
            "email" => $prop['email'] ?? '',
            "phone" => $prop['phone'] ?? '',
            "estimated_value" => $prop['estimated_value'] ?? '',
            "created_at" => $prop['created_at'] ?? '',
            "updated_at" => $prop['updated_at'] ?? '',
            "images" => $images,
            "blueprints" => $blueprints,
            "company" => $company,
            "connectivity" => $connectivity,
            "lifestyle" => $lifestyle
        ];
    }

    echo json_encode($result);

} catch (Exception $e) {
    echo json_encode(["error" => "Database connection failed"]);
}
?>