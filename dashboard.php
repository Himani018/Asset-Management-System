<?php
session_start();

//to get asset table
require_once __DIR__ . "/includes/dbh.inc.php";

$userId = $_SESSION['user_id'];

$query = "SELECT id, asset, category, assignee, stat
          FROM assets
          WHERE user_id = :user_id
          ORDER BY id DESC";

$stmt = $pdo->prepare($query);
$stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);
$stmt->execute();
$assets = $stmt->fetchAll(PDO::FETCH_ASSOC);
//to get asset table

// Unique categories for report filter (lowercased to keep consistent)
$categories = [];
foreach ($assets as $a) {
    $cat = strtolower(trim((string)($a['category'] ?? '')));
    if ($cat === '') {
        continue;
    }
    $categories[$cat] = $cat;
}
$categories = array_values($categories);
sort($categories, SORT_NATURAL | SORT_FLAG_CASE);

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
if (!isset($_SESSION['username'])) {
    $_SESSION['username'] = 'user';

}
if (!isset($_SESSION['email'])) {
    $_SESSION['email'] = 'user@email.com';

}
if (!isset($_SESSION['company'])) {
    $_SESSION['company'] = 'bluevault';

}
if (!isset($_SESSION['role'])) {
    $_SESSION['role'] = 'manager';

}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asset Dashboard</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="./dashboard.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
        integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>

<body>

    <!-- Sidebar startttt-->
    <div class="sidebar">
        <h4><i class="fa-solid fa-box-archive"></i> BlueVault Asset</h4>
        <div class="sidebar-links">
            <a href="#dash-sec" id="dashboard"><i class="fa-solid fa-chart-line"></i> Dashboard</a>
            <a href="#asset-sec" id="asset"><i class="fa-solid fa-box"></i> Assets</a>
            <a href="#repo-sec" id="report"><i class="fa-solid fa-file"></i> Reports</a>
            <a href="#sett-sec" id="setting"><i class="fa-solid fa-gear"></i> Settings</a>
        </div>
    </div>
    <!-- sidebar enddddddd -->

    <!-- right side bar start -->
    <div class="main">

<!-- dashboard -->
        <div id="dash-sec">

            <div class="profile" onclick="toggleMenu()">
                <i class="fa-solid fa-user-circle fa-2x"></i>
                <div class="profile-menu" id="menu">
                    <a href="#" onclick="profile()"><i class="fa fa-user"></i> Profile </a>
                    <a href="#" onclick="logout()"><i class="fa fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
                     
        </div>
<!-- asset sec -->
        <div id="asset-sec">


            <div id="assetWrap">
                <div class="topbar">
                    <input type="text" class="form-control w-50" placeholder="Search asset by id..." id="searchBar">
                    <button onclick="generatePDF()" class="btn pdf mb-3">Download As PDF</button>

                </div>
                <button class="btn btn-primary mb-3" type="button" onclick="showAdd()">+ Add Asset</button>
                <button class="btn btn-primary mb-3" type="button" onclick="showDelete()">- Delete Asset</button>
                <button class="btn btn-primary mb-3" type="button" onclick="showEdit()">* Edit Asset</button>
                <?php
                if (isset($_SESSION["asset_success"])) {
                    echo '<p class="text-success">'
                        . htmlspecialchars($_SESSION["asset_success"]) . '</p>';
                    unset($_SESSION["asset_success"]);
                }
                if (isset($_SESSION["asset_error"])) {
                    echo '<p class="text-danger">'
                        . htmlspecialchars($_SESSION["asset_error"]) . '</p>';
                    unset($_SESSION["asset_error"]);
                }
                ?>

                <!-- --------------------------------------------------- -->

                <div id="addBox" style="display:none;">
                    <h5>Add Asset</h5>
                    <form action="includes/asset_add.php" method="post">
                        <input class="form-control w-50" name="asset" placeholder="Asset name" required>
                        <input class="form-control w-50" name="category" placeholder="Category" required oninput="this.value=this.value.toLowerCase()">
                        <input class="form-control w-50" name="assignee" placeholder="Assignee" required>

                        <select class="form-control w-50" name="stat" required>
                            <option value="Active">Active</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Retired">Retired</option>
                        </select>

                        <button class="btn btn-primary mt-2" type="submit">Save</button>
                        <button class="btn btn-secondary mt-2" type="button" onclick="hideForms()">Cancel</button>
                    </form>
                </div>

                <!-- edit asset-->

                <div id="editBox" style="display:none;">
                    <h5>Edit Asset</h5>
                    <form action="includes/asset_update.php" method="post">
                        <input class="form-control w-50" name="id" placeholder="Asset ID" required>
                        <input class="form-control w-50" name="asset" placeholder="New asset name" required>
                        <input class="form-control w-50" name="category" placeholder="New category" required oninput="this.value=this.value.toLowerCase()">
                        <input class="form-control w-50" name="assignee" placeholder="New assignee" required>

                        <select class="form-control w-50" name="stat" required>
                            <option value="Active">Active</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Retired">Retired</option>
                        </select>

                        <button class="btn btn-primary mt-2" type="submit">Update</button>
                        <button class="btn btn-secondary mt-2" type="button" onclick="hideForms()">Cancel</button>
                    </form>
                </div>

                <!-- delete asset -->

                <div id="deleteBox" style="display:none;">
                    <h5>Delete Asset</h5>
                    <form action="includes/asset_delete.php" method="post">
                        <input class="form-control w-50" name="id" placeholder="Asset ID" required>
                        <button class="btn btn-danger mt-2" type="submit">Delete</button>
                        <button class="btn btn-secondary mt-2" type="button" onclick="hideForms()">Cancel</button>
                    </form>
                </div>



                <!-- --------------------------------------------------- -->


                <div id="pdf">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Assignee</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody id="assetTable">
                            <?php if (!empty($assets)): ?>
                                <?php foreach ($assets as $a): ?>
                                    <?php
                                    $status = $a['stat'] ?? '';
                                    $badgeClass = 'bg-secondary';

                                    if (strtolower($status) === 'active')
                                        $badgeClass = 'bg-success';
                                    elseif (strtolower($status) === 'maintenance')
                                        $badgeClass = 'bg-warning';
                                    elseif (strtolower($status) === 'retired')
                                        $badgeClass = 'bg-danger';
                                    ?>

                                    <tr id="<?php echo htmlspecialchars($a['id']); ?>">
                                        <td><?php echo htmlspecialchars($a['id']); ?></td>
                                        <td><?php echo htmlspecialchars($a['asset']); ?></td>
                                        <td><?php echo htmlspecialchars(strtolower(trim((string)($a['category'] ?? '')))); ?></td>
                                        <td><?php echo htmlspecialchars($a['assignee']); ?></td>
                                        <td><span class="badge <?php echo $badgeClass; ?>">
                                                <?php echo htmlspecialchars($status); ?>
                                            </span></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>


                    </table>
                </div>
                <div id="noasset" style="<?php echo empty($assets) ? 'display:block;' : 'display:none;'; ?>">


                    <p>No asset Found 😟</p>

                    <p>There are no asset available at this moment !!</p>
                    <p><i class="fa-solid fa-box-open"></i> </p>
                </div>
            </div>
        </div>
        <!-- asset sec enddddddddddddddddd -->

        <div id="repo-sec">
            <div id="repoWrap">
                <button onclick="generatePDF2()" class="btn pdf mb-3" id="pdfbtn2">Download As PDF</button>
                <p id="repoBadge">REPORTING WORKSPACE</p>
                <h2>Asset Report</h2>
                <p id="repoP">Filter the inventory by category, preview the result in one place ,and export a clean pdf
                    when the report
                    is ready
                </p>
                <div id="repo-sel">
                    <p>Report Category</p>

                    <?php if (!empty($categories)): ?>
                        <select name="" id="select">
                            <option value="ALL" selected>ALL</option>
                            <?php foreach ($categories as $cat): ?>
                                <option value="<?php echo htmlspecialchars($cat) ?>">
                                    <?php echo htmlspecialchars($cat) ?></option>

                            <?php endforeach ?>
                        </select>
                    <?php endif ?>

                     <select id="status">
                        <option value="ALL" selected>ALL</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Active">Active</option>
                        <option value="Retired">Retired</option>
                    </select>

                    <button class="btn btn-primary mb-3" onclick="openReport()" id="genBtn">Generate</button>
                </div>

                <div id="report">
                    <h6>Preview</h6>
                    <p id="#p2">Your filtered row will appear here and stay export - ready for pdf download</p>
                    <h3>Generated Asset report</h3>
                    <div id="pdf2">

                        <!-- Table -->
                        <table class="table table-bordered" style="margin-top: 40px;">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Assignee</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody id="repoTable">
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>


        <div id="sett-sec">

            <div id="set-card2">

                <h5>Personal Information</h5>
                <button onclick="edit()" id="edit" class="btn pdf mb-3">Edit</button>
                <form id="changedForm" method="post" action="includes/change.php">

                    <button class="btn pdf mb-3" id="save" type="submit">Save Changes</button>
                    <p>Keep Your Account details current and correct for asset assignment and reporting.</p>
                    <label for="name">Name:</label>
                    <input class="form-control w-50" type="text" name="username" id="name" readonly
                        value="<?php echo htmlspecialchars($_SESSION['username']) ?>">
                    <label for="name">Email:</label>
                    <input class="form-control w-50" type="email" name="email"
                        value="<?php echo htmlspecialchars($_SESSION['email']) ?>" id="email" readonly>
                    <label for="name">Company:</label>
                    <input class="form-control w-50" type="company" name="company"
                        value="<?php echo htmlspecialchars($_SESSION['company']) ?>" id="company" readonly>
                    <label for="name">Role:</label>
                    <input class="form-control w-50" type="role" name="role"
                        value="<?php echo htmlspecialchars($_SESSION['role']) ?>" id="role" readonly>
                    <?php
                    if (isset($_SESSION['success'])) {
                        echo '<p class="text-success">' . htmlspecialchars($_SESSION['success']) . '</p>';
                        unset($_SESSION['success']);
                    }
                    if (isset($_SESSION['empty'])) {
                        echo '<p class="text-danger">' . htmlspecialchars($_SESSION['empty']) . '</p>';
                        unset($_SESSION['empty']);
                    }
                    if (isset($_SESSION['loginE'])) {
                        echo '<p class="text-danger">' . htmlspecialchars($_SESSION['loginE']) . '</p>';
                        unset($_SESSION['loginE']);
                    }
                    ?>
                </form>
            </div>
            <p style="color: rgb(84, 84, 250);">WORKSPACE CONTROL CENTER</p>
            <h3> <i class="fa-solid fa-user-gear"></i>Settings</h3>
            <p>Update your profile and keep asset under control</p>

            <div class="set-card">
                <img src="./defaultPfp.jpg" alt="Oops!!Something went wrong." id="defaultPfp">
                <h5> <?php echo htmlspecialchars($_SESSION['username']) ?> </h5>
                <p id="role2"> <?php echo htmlspecialchars($_SESSION['role']) ?> </p>
                <button class="btn btn-primary mb-3" id="uploadBtn" onclick="changePfp()">Change Image</button>
                <input type="file" id="imageUpload" accept="image/*" hidden>
            </div>

        </div>
    </div>
    <!-- right side bar end -->
    <script src="dashboard.js?v=2"></script>
</body>

<script>
    function generatePDF() {
        const pdf = document.getElementById("pdf");
        html2pdf().from(pdf).save();
    }
    function generatePDF2() {
        const pdf = document.getElementById("pdf2");
        html2pdf().from(pdf).save();
    }
</script>

</html>
