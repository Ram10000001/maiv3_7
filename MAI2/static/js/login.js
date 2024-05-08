function togglePasswordVisibility(id) {
    var passwordInput = document.getElementById(id);
    var eyeIcon = document.getElementById('eyeIcon' + id.charAt(0).toUpperCase() + id.slice(1));
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}
