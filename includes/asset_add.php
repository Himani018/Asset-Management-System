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

$asset    = trim($_POST["asset"] ?? "");
$category = strtolower(trim($_POST["category"] ?? ""));
$assignee = trim($_POST["assignee"] ?? "");
$stat     = trim($_POST["stat"] ?? "Active");

if ($asset === "" || $category === "" || $assignee === "" || $stat === "") {
  $_SESSION["asset_error"] = "All fields are required";
  header("Location: ../dashboard.php#asset-sec");
  exit;
}

try {
  require_once __DIR__ . "/dbh.inc.php";

  $userId = $_SESSION["user_id"];

  $query = "INSERT INTO assets (asset, category, assignee, stat, user_id)
            VALUES (:asset, :category, :assignee, :stat, :user_id)";

  $stmt = $pdo->prepare($query);
  $stmt->bindParam(":asset", $asset);
  $stmt->bindParam(":category", $category);
  $stmt->bindParam(":assignee", $assignee);
  $stmt->bindParam(":stat", $stat);
  $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
  $stmt->execute();

  $_SESSION["asset_success"] = "Asset added successfully";
  header("Location: ../dashboard.php#asset-sec");
  exit;

} catch (PDOException $e) {
  $_SESSION["asset_error"] = "Database error while adding asset";
  header("Location: ../dashboard.php#asset-sec");
  exit;
}
