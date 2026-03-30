
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

const dashlink =document.getElementById('dashboard');
const dashSec =document.getElementById('dash-sec');

const assetlink =document.getElementById('asset');
const assetSec =document.getElementById('asset-sec');

const userlink =document.getElementById('user');
const userSec =document.getElementById('user-sec');

const repolink =document.getElementById('report');
const repoSec =document.getElementById('repo-sec');

const settlink =document.getElementById('setting');
const settSec =document.getElementById('sett-sec');

assetlink.addEventListener('click',function(e){
    e.preventDefault();
    removeBackColor();
    assetSec.style.display="block";
    dashSec.style.display="none";
    userSec.style.display="none";
    repoSec.style.display="none";
    settSec.style.display="none";
    assetlink.style.backgroundColor=" rgb(215, 221, 243)";
 })
 dashlink.addEventListener('click',function(e){
    e.preventDefault();
    removeBackColor();
    dashSec.style.display="block";
    assetSec.style.display="none";
    userSec.style.display="none";
    repoSec.style.display="none";
    settSec.style.display="none";
    dashlink.style.backgroundColor=" rgb(215, 221, 243)";
 })
 userlink.addEventListener('click',function(e){
    e.preventDefault();
    removeBackColor();
    userSec.style.display="block";
    dashSec.style.display="none";
    assetSec.style.display="none";
    repoSec.style.display="none";
    settSec.style.display="none";
    userlink.style.backgroundColor=" rgb(215, 221, 243)";
 })
 repolink.addEventListener('click',function(e){
    e.preventDefault();
    removeBackColor();
    repoSec.style.display="block";
    dashSec.style.display="none";
    assetSec.style.display="none";
    userSec.style.display="none";
    settSec.style.display="none";
    repolink.style.backgroundColor=" rgb(215, 221, 243)";
 })
 settlink.addEventListener('click',function(e){
    e.preventDefault();
    removeBackColor();
    settSec.style.display="block";
    dashSec.style.display="none";
    assetSec.style.display="none";
    userSec.style.display="none";
    repoSec.style.display="none";
    settlink.style.backgroundColor=" rgb(215, 221, 243)";
 })
 function removeBackColor(){
    dashlink.style.backgroundColor="";
    assetlink.style.backgroundColor="";
    repolink.style.backgroundColor="";
    userlink.style.backgroundColor="";
    settlink.style.backgroundColor="";
 }
