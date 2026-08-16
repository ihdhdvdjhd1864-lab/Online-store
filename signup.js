let moddd = localStorage.getItem("modal");
let bodyy = document.querySelector("body");
if (moddd === "link") {
  bodyy.classList.add("show");
}
let getUser = JSON.parse(localStorage.getItem("user"));
let signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.querySelector("#signupName").value;
  let email = document.querySelector("#signupEmail").value;
  let password = document.querySelector("#signupPassword").value;
  let confirmPassword = document.querySelector("#confirmPassword").value;
  if (
    name === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Please fill in all fields");
    return;
  }
  let user = {
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "index.html";
});
