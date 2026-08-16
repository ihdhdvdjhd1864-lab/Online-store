

let moddd = localStorage.getItem("modal");
let bodyy = document.querySelector("body");
if (moddd === "link") {
    bodyy.classList.add("show");
}
let signinEmail = document.querySelector("#signinEmail");
let signinPassword = document.querySelector("#signinPassword");
let signinForm = document.querySelector("#signinForm");
signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"));
    if (signinEmail.value === user.email && signinPassword.value === user.password) {
        window.location.href = "index.html";
    }
 else {
        alert("Wrong email or password");
    }
});
