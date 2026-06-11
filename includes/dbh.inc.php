<?php

$host = getenv('DB_HOST') ?: 'localhost';
$dbname = getenv('DB_NAME') ?: 'inventory';
$dbusername = getenv('DB_USER') ?: 'root';
$dbpassword = getenv('DB_PASSWORD') ?: '';

$dsn ="mysql:host=$host;dbname=$dbname";
try{ //pdo php data object
     $pdo = new PDO($dsn,$dbusername ,$dbpassword);
     $pdo->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
     echo "Connection failed:" .$e->getMessage();
}
