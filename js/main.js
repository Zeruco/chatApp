let userName = "";
let signUp = document.querySelector('.sign_up');
let inputMessage = document.querySelector('.input_message');
let ul = document.getElementById('messages');
let closeBtn = document.querySelectorAll('.close');
let signIn = document.querySelector('.sign_in')

signIn.addEventListener('click', () => {
    let modalWindowLog = document.querySelector('.log_in');
    let modalWindowReg = document.querySelector('.registration')
    modalWindowLog.style.display = 'block';
    modalWindowReg.style.display = 'none';
});

closeBtn[0].addEventListener('click', () => {
    let modal = document.querySelector('.registration');
    modal.style.display = 'none';
});
closeBtn[1].addEventListener('click', () => {
    let modal = document.querySelector('.log_in')
    modal.style.display = 'none';
});

function load() {
    firebase.database().ref("messages").on("value", function (snapshot) {
        document.getElementById("messages").innerHTML = "";
        snapshot.forEach((element) => {
            let html = "";

            if(userName == element.val().sender) {
                html += "<li style='float:right; text-align: right;'>"+ "<p class='text_message'>" + element.val().message + "</p>" +"</li>";
            } else
                html += "<li style='float:left; text-align: left;'>" + "<p>" + element.val().sender + ": " + element.val().message + "</p>" + "</li>";
            document.getElementById("messages").innerHTML += html;
            ul.scrollIntoView(false);
        });

    });
    return false
}

function logIn() {

    let modalWindow = document.querySelector('.log_in')
    let correctEmail = false;
    let email = document.querySelector('.email_input');
    let password = document.querySelector('.password_input');
    firebase.database().ref("users").on("value", function (snapshot){
        snapshot.forEach((element) => {
            console.log(email.value);
            console.log(element.val().Email);
            if(email.value == element.val().Email && password.value == element.val().Password) {
                correctEmail = true;
                userName = element.val().Login;
            }
        });
        if (correctEmail) {
            modalWindow.style.display = 'none'
            load();
        }
        if(!correctEmail) alert("Incorrect email")
    });
    return false;
}

signUp.addEventListener('click', () => {
    let modalWindowLog = document.querySelector('.log_in');
    let modalWindowReg = document.querySelector('.registration')
    modalWindowLog.style.display = 'none';
    modalWindowReg.style.display = 'block';
});

if (userName) {
    firebase.database().ref("messages").on("child_added", function (snapshot) {
        let html = "";

        if(userName == snapshot.val().sender) {
            html += "<li style='float:right; text-align: right;'>"+ "<p class='text_message'>" + snapshot.val().message + "</p>" +"</li>";
        } else
            html += "<li style='float:left; text-align: left;'>" + "<p>" + snapshot.val().sender + ": " + snapshot.val().message + "</p>" + "</li>";
        document.getElementById("messages").innerHTML += html;
        ul.scrollIntoView(false);
    });
}


inputMessage.addEventListener('focus', (event) => {
    inputMessage.placeholder = '';
});

inputMessage.addEventListener('blur', () => {
    inputMessage.placeholder = 'Enter message';
});

function sendMessage() {
    if (!userName) alert('You are not sign up');
    else {
        let message = inputMessage.value;
        if(message){
            firebase.database().ref("messages").push().set({
                "sender": userName,
                "message": message
            });
        }
    }
    inputMessage.value = "";
    return false;
}



function reg() {
    let modalWindow = document.querySelector('.registration');
    let distinctEmail = true;
    let login = document.querySelector('.login');
    let email = document.querySelector('.email');
    let password = document.querySelector('.password');
    let repeatPassword = document.querySelector('.repeat_password');
    if (password.value != repeatPassword.value) {
        alert('error Password')
        return false;
    }
    if (login.value.length > 18 || login.value.length < 6) {
        alert('error Login')
        return false;
    }

    if (!validateEmail(email.value)) {
        alert('error Email');
        return false;
    }

    firebase.database().ref("users").on("child_added", function (snapshot){
        if(email.value === snapshot.val().Email) {
            distinctEmail = false;
        }
    });

    if (distinctEmail) {
        firebase.database().ref("users").push().set({
            "Login" : login.value,
            "Email" : email.value,
            "Password" : password.value
        });
    } else {
        alert("Your email is registered");
    }
    modalWindow.style.display = 'none';
    return false;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//Create validation for email, password and login
//Create sign in
//Add chating create
//Add friends by Login
//Send files
//