<?php
$host = "localhost";
$dbname = "v5c_new";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => false, "error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}
?>
