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

$id       = (int)($_POST["id"] ?? 0);
$asset    = trim($_POST["asset"] ?? "");
$category = strtolower(trim($_POST["category"] ?? ""));
$assignee = trim($_POST["assignee"] ?? "");
$stat     = trim($_POST["stat"] ?? "");

if ($id <= 0 || $asset === "" || $category === "" || $assignee === "" || $stat === "") {
  $_SESSION["asset_error"] = "All fields are required (including ID)";
  header("Location: ../dashboard.php#asset-sec");
  exit;
}

try {
  require_once __DIR__ . "/dbh.inc.php";

  $userId = $_SESSION["user_id"];

  $query = "UPDATE assets
            SET asset=:asset, category=:category, assignee=:assignee, stat=:stat
            WHERE id=:id AND user_id=:user_id";

  $stmt = $pdo->prepare($query);
  $stmt->bindParam(":asset", $asset);
  $stmt->bindParam(":category", $category);
  $stmt->bindParam(":assignee", $assignee);
  $stmt->bindParam(":stat", $stat);
  $stmt->bindParam(":id", $id, PDO::PARAM_INT);
  $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
  $stmt->execute();

  if ($stmt->rowCount() === 0) {
    $_SESSION["asset_error"] = "Update failed: wrong ID or not your asset";
  } else {
    $_SESSION["asset_success"] = "Asset updated successfully";
  }

  header("Location: ../dashboard.php#asset-sec");
  exit;

} catch (PDOException $e) {
  $_SESSION["asset_error"] = "Database error while updating asset";
  header("Location: ../dashboard.php#asset-sec");
  exit;
}
