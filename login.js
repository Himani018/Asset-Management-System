
    // 1. Toggle between Login and Signup
    function toggleForm(formId) {
        document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
        document.getElementById(formId).classList.add('active');
    }

    // 2. Real-time Password Match Logic for Signup
    const p1 = document.getElementById('s-pass');
    const p2 = document.getElementById('s-confirm');
    const msg = document.getElementById('match-msg');

    p2.oninput = () => {
        if (p1.value === p2.value) {
            msg.innerText = "✓ Passwords match";
            msg.style.color = "var(--success)";
        } else {
            msg.innerText = "× Passwords do not match";
            msg.style.color = "var(--error)";
        }
    };

    // 3. Form Submission Logic
    document.getElementById('loginForm').onsubmit = (e) => {
        e.preventDefault();
        window.location.href = 'dashboard.html'; // Goes to your dashboard file
    };

    document.getElementById('signupForm').onsubmit = (e) => {
        e.preventDefault();
        if (p1.value !== p2.value) {
            alert("Passwords must match!");
            return;
        }
        
        // Simulate Account Creation
        const btn = document.getElementById('create-btn');
        btn.innerText = "Account Created!";
        btn.style.background = "var(--success)";

        setTimeout(() => {
            alert("Success! You can now login with your new account.");
            toggleForm('login-box'); // Sends them back to login within the same file
            btn.innerText = "Create Account";
            btn.style.background = "var(--primary)";
            document.getElementById('signupForm').reset();
            msg.innerText = "";
        }, 1500);
    };