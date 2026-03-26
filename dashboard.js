
// Profile dropdown
function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Add Asset
function addAsset() {
    let name = prompt("Enter Asset Name:");
    let category = prompt("Enter Category:");
    let assignee = prompt("Enter Assignee Name:");

    if (!name || !category || !assignee) {
        alert("All fields are required!");
        return;
    }

    let table = document.getElementById("assetTable");

    let newRow = `
        <tr>
            <td>AST-${Math.floor(Math.random()*1000)}</td>
            <td>${name}</td>
            <td>${category}</td>
            <td>${assignee}</td>
            <td><span class="badge bg-success">Active</span></td>
        </tr>
    `;

    table.innerHTML += newRow;
}

// Load username
window.onload = function() {
    let name = localStorage.getItem("username");

    if(name) {
        document.getElementById("userName").innerText = name;
    } else {
        document.getElementById("userName").innerText = "User";
    }
}

// Logout
function logout() {
    localStorage.removeItem("username");
    alert("Logged out successfully!");
}
