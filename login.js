
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
    document.getElementById('signupForm').onsubmit = (e) => {
        if (p1.value !== p2.value) {
            e.preventDefault();
            alert("Passwords must match!");
        }
    };
