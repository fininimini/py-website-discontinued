var userFieldIsOk = false
var pswdFieldIsOk = false
var errorExists = false

function cheackButton() {
    let button = document.getElementById("register")
    if (userFieldIsOk == true && pswdFieldIsOk == true) {
        button.removeAttribute('disabled');
    }
    else {
        button.setAttribute('disabled', '');
    }
}

function checkUser() {
    let user_input = document.getElementById("user_input")
    let errorDiv = document.getElementById('user_has_spaces')
    let lenght = user_input.value.length > 0
    let spaces = user_input.value.includes(' ') == false
    if (!spaces && errorExists == false) {
        displayError("Username can't contain spaces!", 'error', id='user_has_spaces')
        errorExists = true
    }
    else if (spaces && errorExists == true) {
        errorExists = false
        errorDiv.parentNode.removeChild(errorDiv);
    }
    if (lenght && spaces) {
        userFieldIsOk = true
    }
    else {
        userFieldIsOk = false
    }
    cheackButton()
}

function checkPswd() {
    let pswd_input = document.getElementById("pswd_input");
    let spaces = pswd_input.value.includes(' ') == false;
    let lenght = pswd_input.value.length >= 8;
    let pswdDiv = document.getElementById('pswd_div');
    let bigLetter = /[A-Z]/.test(pswd_input.value);
    let smallLetter = /[a-z]/.test(pswd_input.value);
    let specialChar = /\d/.test(pswd_input.value) || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]°/.test(pswd_input.value);
    let criterias = {
        '#pswd_spaces': spaces,
        '#pswd_min_char': lenght,
        '#pswd_big_char': bigLetter,
        '#pswd_sml_char': smallLetter,
        '#pswd_spc_char': specialChar
    }

    for (criteria in criterias) {
        let dot = document.querySelector(criteria);
        if (criterias[criteria]) {
            dot.setAttribute('style', 'background-color: #00ffaad8;');
            dot.parentNode.setAttribute('style', 'color: #00ffaad8;');
        }
        else {
            dot.setAttribute('style', 'background-color: #ff4b4bd8;');
            dot.parentNode.setAttribute('style', 'color: #ff4b4bd8;');
        };
    };

    if (spaces && lenght && bigLetter && smallLetter && specialChar) {
        pswdFieldIsOk = true;
        pswdDiv.setAttribute('style', 'border-color: #00ffaad8');
    }
    else {
        pswdFieldIsOk = false;
        pswdDiv.setAttribute('style', 'border-color: #ff4b4bd8');
    };
    cheackButton();
};

function displayError(error, className, id=null) {
    let divChild = document.createElement("div");
    let target = document.getElementById("main");
    divChild.innerHTML = error;
    if (id != null) {
        divChild.id = id;
    };
    divChild.className = className;
    divChild.style.width = parseInt(getComputedStyle(target).width) - 10 + "px";
    target.appendChild(divChild);
}
if (error !== 'None') {
    displayError(error, 'error')
};
if (success !== 'None') {
    displayError(success, 'success')
};

let form = document.getElementById("form");
form.addEventListener('submit', function(event) {
    let targetStyle = getComputedStyle(form);
    let loading = document.getElementById("loading");
    let loading_outer = document.getElementById("loading_outer");
    loading_outer.style.width = parseInt(targetStyle.width) + "px";
    loading_outer.style.height = parseInt(targetStyle.height) + "px";
    if (parseInt(targetStyle.width) < parseInt(targetStyle.height)) {
        loading.style.width = parseInt(targetStyle.width) / 3 + "px";
        loading.style.height = parseInt(targetStyle.width) / 3 + "px";
    }
    else {
        loading.style.width = parseInt(targetStyle.height) / 3 + "px";
        loading.style.height = parseInt(targetStyle.height) / 3 + "px";
    }
    loading.style.display = 'block';
    if (success !== 'None') {
        document.getElementsByClassName('success')[0].style.display = 'none';
    }
    if (error !== 'None') {
        document.getElementsByClassName('error')[0].style.display = 'none';
    }
    form.style.display = 'none';
});