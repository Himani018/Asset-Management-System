<?php
session_start();
//this file is made for sign in 
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
   
   exit("Invalid Request");
}//above line are for security so this file cant open directly in browser without running login.php file
if (!isset($_SESSION['user_id'])) {
    $_SESSION["loginE"]="Please login first";
   header("Location: ../dashboard.php#sett-sec");
   exit;
}

$email = $_POST["email"] ?? "";
$username = $_POST["username"] ?? "";

if ($email === "" || $username === "") {
    $_SESSION["empty"]="Field can't be empty";
    header("Location: ../dashboard.php#sett-sec");
    exit;
  
}

try {
   require_once __DIR__ . "/dbh.inc.php"; //dtr is constant and it give path to current directrly for this C:/xampp/htdocs/assetmanagemntsystem/includes is dtr and the . connect it with /.dbc.inc.php file and it becomes C:/xampp/htdocs/assetmsystem/includes/dbh.inc.php
    $id=$_SESSION['user_id'];
    $query = "UPDATE users SET username=:username ,email=:email WHERE id=:id";
      
      $stmt = $pdo->prepare($query);
      $stmt ->bindParam(":username",$username);
      $stmt ->bindParam(":email",$email);
      $stmt -> bindParam(":id",$id);
      $stmt->execute();
      
      
       $_SESSION["username"] = $username;
       $_SESSION["email"] = $email;

      $_SESSION["success"]="Your setting is updated successfully";
      header("Location: ../dashboard.php#sett-sec");
      exit;
     
       
   exit;
} catch (PDOException $e) {
   die("Query Failed : " . $e->getMessage());
}
