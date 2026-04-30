<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AssetFlow - Authentication</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="./login.css">
</head>
<body>

<div class="auth-container">

    

    <div class="logo"><i class="fa-solid fa-box-archive"></i> BlueVault Asset</div>

    <div id="login-box" class="form-box active">
        <h1>Welcome back</h1>
        <p class="subtitle">Please enter your credentials to sign in</p>
        <?php
        $loginError = $_GET["error"] ?? "";
        if ($loginError === "invalid") {
            echo '<p class="subtitle" style="color: var(--error);">Invalid email or password.</p>';
        } elseif ($loginError === "empty") {
            echo '<p class="subtitle" style="color: var(--error);">Please fill in all fields.</p>';
        }
        ?>
        
        <form id="loginForm" action="includes/loginhandler.inc.php" method="post">
            <div class="input-group">
                <label>Email address</label>
                <div class="wrapper"><i class="fa-regular fa-envelope"></i><input type="email" name="email" required placeholder="name@company.com"></div>
            </div>
            <div class="input-group">
                <label>Password</label>
                <div class="wrapper"><i class="fa-solid fa-lock"></i><input type="password" name="pwd" required placeholder="••••••••"></div>
            </div>
            <button type="submit" class="btn">Sign in</button>
        </form>
        <div class="footer">
            Don't have an account? <a onclick="toggleForm('signup-box')">Sign up</a>
        </div>
    </div>

    <div id="signup-box" class="form-box">
        <h1>Create account</h1>
        <p class="subtitle">Join us to start managing your assets</p>
        
        <form id="signupForm" action="includes/formhandler.inc.php" method="post">
            <div class="input-group">
                <label>Full Name</label>
                <div class="wrapper"><i class="fa-regular fa-user"></i><input type="text" name="username" required placeholder="John Doe"></div>
            </div>
            <div class="input-group">
                <label>Email address</label>
                <div class="wrapper"><i class="fa-regular fa-envelope"></i><input type="email" name="email" required placeholder="name@company.com"></div>
            </div>
            <div class="input-group">
                <label>Password</label>
                <div class="wrapper"><i class="fa-solid fa-lock"></i><input type="password" id="s-pass" name="pwd" required placeholder="••••••••"></div>
            </div>
            <div class="input-group">
                <label>Confirm Password</label>
                <div class="wrapper">
                    <i class="fa-solid fa-shield-check"></i>
                    <input type="password" id="s-confirm" required placeholder="••••••••">
                </div>
                <div id="match-msg"></div>
            </div>
            <button type="submit" class="btn" id="create-btn">Create Account</button>
        </form>
        <div class="footer">
            Already have an account? <a onclick="toggleForm('login-box')">Sign in</a>
        </div>
    </div>
</div>

<script src="./login.js?v=1"></script>

</body>
</html>
