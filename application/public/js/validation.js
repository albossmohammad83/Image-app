var form = document.getElementById('form');
var username = document.getElementById('username');
var email = document.getElementById('email');
var password = document.getElementById('password');
var password2 = document.getElementById('cpassword');
var valid= true;
form.addEventListener('input', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    var usernameValue = username.value;
    var emailValue = email.value;
    var passwordValue = password.value;
    var password2Value = password2.value;
    var re_aplhanum = /^[a-z0-9]+$/;

    if(("a" > usernameValue[0] || usernameValue[0] > "z" ) &&
    ("A" > usernameValue[0] || usernameValue[0] > "Z")) {
        setErrorFor(username, 'Username must start with a-z or A-Z');
        valid= false;
    } else if (usernameValue.length < 3 || !re_aplhanum.test(usernameValue)) {
        setErrorFor(username, 'Username must include 3 or more alphanumeric characters');
        valid = false;
    } else {
        setSuccessFor(username);
        valid= true;
    }
    if (emailValue ===''){
        setErrorFor(email, 'Email cant be blank');
        valid = false;
    } else{
        setSuccessFor(email);
        valid= true;
    }
    var nums = /[0-9]/;
    var uppercase = /[A-Z]/;
    var chars = /[/*-+!@#$^&*]/;

    if (passwordValue ===''){
        setErrorFor(password, 'Password cant be blank');
        valid = false;
    } else if((passwordValue.length < 8)) {
        setErrorFor(password, 'Password must be 8 or more characters');
        valid = false;
    } else if (!nums.test(passwordValue)) {
        setErrorFor(password, 'Password must contain at least one number');
        valid = false;
    } else if (!uppercase.test(passwordValue)){
        setErrorFor(password, 'Password must contain at least one Uppercase Letter');
        valid = false;
    } else if (!chars.test(passwordValue)) {
        setErrorFor(password, 'Password must contain one special character.(/*-+!@#$^&)');
        valid = false;
    } else {
        setSuccessFor(password);
        valid= true;
    }

    if (password2Value ===''){
        setErrorFor(password2, 'Password check cant be blank');
        valid = false;
    }
    else if(passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords do not match');
        valid = false;
    } else{
        setSuccessFor(password2);
        valid= true;
    }

}

function setErrorFor(input, message) {
    var formControl = input.parentElement;
    var small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    var formControl = input.parentElement;
    formControl.className = 'form-control success';
}