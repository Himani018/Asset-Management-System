<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
   header("Location: ../login.php");
   exit;
}

$email = $_POST["email"] ?? "";
$pwd = $_POST["pwd"] ?? "";

if ($email === "" || $pwd === "") {
   header("Location: ../login.php?error=empty");
   exit;
}

try {
   require_once __DIR__ . "/dbh.inc.php";

   $query = "SELECT id, username, email, pwd FROM users WHERE email = :email LIMIT 1;";
   $stmt = $pdo->prepare($query);
   $stmt->bindParam(":email", $email);
   $stmt->execute();

   $user = $stmt->fetch(PDO::FETCH_ASSOC);
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
