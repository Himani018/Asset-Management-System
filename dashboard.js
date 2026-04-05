
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

    let newId = 1;
    //ye banaya taki asset add krne ke baad ye hat jaye  
    if(table.rows.length<1){
       let starting = document.getElementById("noasset");
       starting.style.display='none';
    }

    if (table.rows.length >= 1) {
        let lastRow = table.rows[table.rows.length - 1];
        let lastId = lastRow.cells[0].innerText;

        newId = parseInt(lastId) + 1;
    }

    let newRow = `
        <tr id ='${newId}'>
            <td>${newId}</td>
            <td>${name}</td>
            <td>${category}</td>
            <td>${assignee}</td>
            <td><span class="badge bg-success">Active</span></td>
        </tr>
    `;

    table.innerHTML += newRow;
}


function logout() {
    alert("Logged out successfully!");
    window.location.href='home.html';
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
 function profile(){
    removeBackColor();
    settSec.style.display="block";
    dashSec.style.display="none";
    assetSec.style.display="none";
    userSec.style.display="none";
    repoSec.style.display="none";
    settlink.style.backgroundColor=" rgb(84, 205, 253)";
    settlink.style.boxShadow=" 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)" ;
    settlink.style.color="white";
}
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

function deleteAsset(){
    let table = document.getElementById("assetTable");
    let del =prompt("Enter the asset id you want to delete");
    let delrow = document.getElementById(del);
    if(delrow){
        delrow.remove();
    }
    if(table.rows.length==0){
       setTimeout(()=>{
         let starting = document.getElementById("noasset");
         starting.style.display='block';
       },2000);
    }
 }

function editAsset(){
    let id= prompt("Enter asset id");
    let name = prompt("Edit Asset Name:");
    let category = prompt("Edit Category:");
    let assignee = prompt("Edit Assignee Name:");

    if (!id || !name || !category || !assignee) {
        alert("All fields are required!");
        return;
    }
     
    let row = document.getElementById(id);
    row.cells[1].innerHTML=name;
    row.cells[2].innerHTML=category;
    row.cells[3].innerHTML=assignee;
}
function openReport(){

    document.getElementById("asset-sec").style.display="none";
    document.getElementById("repo-sec").style.display="block";
    let tableA=document.getElementById("assetTable");
    let tableR =document.getElementById("repoTable");
    let selected = document.getElementById("select").value ;
    tableR.innerHTML = ''; //taki new time click krne par row vapis se ayye naki pichle wali row mai appned ho
    
    for(let i =0 ; i<tableA.rows.length ;i++){
        let cellValue = tableA.rows[i].cells[2].innerText;

        if(selected === "ALL" || cellValue === selected){
            tableR.innerHTML += tableA.rows[i].outerHTML;
        }
    }
    
}
function changePfp(){
    let pfp=document.getElementById("defaultPfp");
    let upload =document.getElementById("imageUpload");
    upload.click();
    
    upload.addEventListener('change',()=>{
        const file = upload.files[0];
    if(file){
        pfp.src = URL.createObjectURL(file);
    }
    })
}
function edit(){
    let name=document.getElementById("name");
    let email=document.getElementById("email");
    let company=document.getElementById("company");
    let role=document.getElementById("role");
    let role2=document.getElementById("role2");
     
    name.removeAttribute("readonly");
    email.removeAttribute("readonly");
    company.removeAttribute("readonly");
    role.removeAttribute("readonly");
    
    let save =document.getElementById("save");
    save.addEventListener('click',()=>{
         name.setAttribute("readonly",true);
         email.setAttribute("readonly",true);
         company.setAttribute("readonly",true);
         role.setAttribute("readonly",true);
        setTimeout(()=>{
               role2.innerHTML = role.value;
        },2000);
        
    })
}