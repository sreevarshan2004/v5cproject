<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require "config.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['status'])) {
    echo json_encode(["status" => false, "error" => "Missing id or status"]);
    exit();
}

try {
    $stmt = $pdo->prepare("UPDATE properties SET status = ? WHERE id = ?");
    $stmt->execute([$data['status'], $data['id']]);
    
    echo json_encode(["status" => true, "message" => "Status updated successfully"]);
} catch(PDOException $e) {
    echo json_encode(["status" => false, "error" => $e->getMessage()]);
}
?>
