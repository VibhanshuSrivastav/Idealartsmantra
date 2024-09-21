document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');

    const isPasswordVisible = passwordInput.type === 'text';

    if (isPasswordVisible) {
        passwordInput.type = 'password';
        // Change to eye-closed icon
    } else {
        passwordInput.type = 'text';
        // Change to eye-open icon
    }
});


document.getElementById('togglePassword2').addEventListener('click', function () {
    const passwordInput = document.getElementById('cPassword');

    const isPasswordVisible = passwordInput.type === 'text';

    if (isPasswordVisible) {
        passwordInput.type = 'password';
        // Change to eye-closed icon
    } else {
        passwordInput.type = 'text';
        // Change to eye-open icon
    }
});

document.getElementById('loginPassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');

    const isPasswordVisible = passwordInput.type === 'text';

    if (isPasswordVisible) {
        passwordInput.type = 'password';
        // Change to eye-closed icon
    } else {
        passwordInput.type = 'text';
        // Change to eye-open icon
    }

});