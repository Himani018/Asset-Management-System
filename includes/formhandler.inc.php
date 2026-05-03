<?php
//this is for signup
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $username = $_POST["username"];
   $pwd = $_POST["pwd"];
   $email = $_POST["email"];
   try {
      require_once __DIR__ . "/dbh.inc.php";

      $query = "INSERT INTO users (username ,pwd,email) VALUES
       (:username , :pwd , :email);";

      $stmt = $pdo->prepare($query);
      $stmt ->bindParam(":username",$username);
      $stmt -> bindParam(":pwd",$pwd);
      $stmt ->bindParam(":email",$email);

      $stmt->execute();

      $pdo = null;
      $stmt = null;
      header("Location: ../dashboard.php");

      die();
   } catch (PDOException $e) {
      die("Query Failed : " . $e->getMessage());
   }
} else {
   header("Location: ../login.php");
}
