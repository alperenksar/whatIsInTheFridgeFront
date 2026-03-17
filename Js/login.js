const loginBtn = document.querySelector("#login-btn-btn");

loginBtn.addEventListener("click" , adminPage);

function adminPage(){
    window.location.href = "../admin/adminIndex.html";
     console.log("Clicked");
}