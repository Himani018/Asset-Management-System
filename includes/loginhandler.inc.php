<?php
//this file is made for sign in 
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
   header("Location: ../login.php");
   exit;
}//above line are for security so this file cant open directly in browser without running login.php file

$email = $_POST["email"] ?? "";
$pwd = $_POST["pwd"] ?? "";

if ($email === "" || $pwd === "") {
   header("Location: ../login.php?error=empty"); //login.php?error=empty -> means query string like in url in get method how the data sends just like that using get data go to login.php throuh url
   exit;
}

try {
   require_once __DIR__ . "/dbh.inc.php"; //dtr is constant and it give path to current directrly for this C:/xampp/htdocs/assetmanagemntsystem/includes is dtr and the . connect it with /.dbc.inc.php file and it becomes C:/xampp/htdocs/assetmsystem/includes/dbh.inc.php

   $query = "SELECT id, username, email, pwd FROM users WHERE email = :email LIMIT 1;";
   $stmt = $pdo->prepare($query);
   $stmt->bindParam(":email", $email);
   $stmt->execute();

   $user = $stmt->fetch(PDO::FETCH_ASSOC);//(PDO::FETCH_ASSOC) it mean fetch whole row as associative array
   if (!$user || $user["pwd"] !== $pwd) {
      header("Location: ../login.php?error=invalid");
      exit;
   }

   if (session_status() !== PHP_SESSION_ACTIVE) {
      session_start();
   }
   $_SESSION["user_id"] = $user["id"];
   $_SESSION["username"] = $user["username"];
   $_SESSION["email"] = $user["email"];

   header("Location: ../dashboard.php");
   exit;
} catch (PDOException $e) {
   die("Query Failed : " . $e->getMessage());
}
