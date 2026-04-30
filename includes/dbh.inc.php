<?php
$dsn ="mysql:host=localhost;dbname=amsdb";
$dbusername ="root";
$dbpassword ="";

try{ //pdo php data object
     $pdo = new PDO($dsn,$dbusername ,$dbpassword);
     $pdo->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
     echo "Connection failed:" .$e->getMessage();
}