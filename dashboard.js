
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
    assetlink.style.backgroundColor=" rgb(84, 205, 253)";
    assetlink.style.boxShadow=" 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)" ;
    assetlink.style.color="white";
 })
 dashlink.addEventListener('click',function(e){
    e.preventDefault();
    removeBackColor();
    dashSec.style.display="block";
    assetSec.style.display="none";
    userSec.style.display="none";
    repoSec.style.display="none";
    settSec.style.display="none";
    dashlink.style.backgroundColor=" rgb(84, 205, 253)";
    dashlink.style.boxShadow=" 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)" ;
    dashlink.style.color="white";
 })
 userlink.addEventListener('click',function(e){
    e.preventDefault();
    removeBackColor();
    userSec.style.display="block";
    dashSec.style.display="none";
    assetSec.style.display="none";
    repoSec.style.display="none";
    settSec.style.display="none";
    userlink.style.backgroundColor=" rgb(84, 205, 253)";
    userlink.style.boxShadow=" 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)" ;
    userlink.style.color="white";
 })
 repolink.addEventListener('click',function(e){
    e.preventDefault();
    removeBackColor();
    repoSec.style.display="block";
    dashSec.style.display="none";
    assetSec.style.display="none";
    userSec.style.display="none";
    settSec.style.display="none";
    repolink.style.backgroundColor=" rgb(84, 205, 253)";
    repolink.style.boxShadow=" 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)" ;
    repolink.style.color="white";
 })
 settlink.addEventListener('click',function(e){
    e.preventDefault();
    removeBackColor();
    settSec.style.display="block";
    dashSec.style.display="none";
    assetSec.style.display="none";
    userSec.style.display="none";
    repoSec.style.display="none";
    settlink.style.backgroundColor=" rgb(84, 205, 253)";
    settlink.style.boxShadow=" 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)" ;
    settlink.style.color="white";
 })
 function removeBackColor(){
    dashlink.style.backgroundColor="";
    dashlink.style.color="black";
    dashlink.style.boxShadow="";
    
    assetlink.style.backgroundColor="";
    assetlink.style.color="black";
    assetlink.style.boxShadow="";

    repolink.style.backgroundColor="";
    repolink.style.color="black";
    repolink.style.boxShadow="";

    userlink.style.backgroundColor="";
    userlink.style.color="black";
    userlink.style.boxShadow="";

    settlink.style.backgroundColor="";
    settlink.style.color="black";
    settlink.style.boxShadow="";
 }
