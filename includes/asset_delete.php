<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  header("Location: ../dashboard.php#asset-sec");
  exit;
}

if (!isset($_SESSION["user_id"])) {
  $_SESSION["asset_error"] = "Please login first";
  header("Location: ../login.php");
  exit;
}

$id = (int)($_POST["id"] ?? 0);
if ($id <= 0) {
  $_SESSION["asset_error"] = "Invalid asset ID";
  header("Location: ../dashboard.php#asset-sec");
  exit;
}

try {
  require_once __DIR__ . "/dbh.inc.php";

  $userId = $_SESSION["user_id"];

  $query = "DELETE FROM assets WHERE id=:id AND user_id=:user_id";
  $stmt = $pdo->prepare($query);
  $stmt->bindParam(":id", $id, PDO::PARAM_INT);
  $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
  $stmt->execute();

  if ($stmt->rowCount() === 0) {
    $_SESSION["asset_error"] = "Delete failed: wrong ID or not your asset";
  } else {
    $_SESSION["asset_success"] = "Asset deleted successfully";
  }

  header("Location: ../dashboard.php#asset-sec");
  exit;

} catch (PDOException $e) {
  $_SESSION["asset_error"] = "Database error while deleting asset";
  header("Location: ../dashboard.php#asset-sec");
  exit;
}
