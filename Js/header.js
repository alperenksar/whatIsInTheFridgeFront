const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click",linkToLogin);

export function linkToLogin(){
     window.location.href = "../Html/login.html";
     console.log("Tıklandı")
}

