let userName = "";
let signBtn = document.querySelector('.sign_in');
let inputMessage = document.querySelector('.input_message');

signBtn.addEventListener('click', () => {
    userName = prompt();
    if (userName) {
        firebase.database().ref("messages").on("child_added", function (snapshot) {
            let html = "";

            if(userName == snapshot.val().sender) {
                html += "<li style='float:right; text-align: right;'>"+ "<p class='text_message'>" + snapshot.val().message + "</p>" +"</li>";
            } else
                html += "<li style='float:left; text-align: left;'>" + "<p>" + snapshot.val().sender + ": " + snapshot.val().message + "</p>" + "</li>";
            document.getElementById("messages").innerHTML += html;
        });
    } else alert ('Empty value');

});

inputMessage.addEventListener('focus', (event) => {
    inputMessage.placeholder = '';
});

inputMessage.addEventListener('blur', () => {
    inputMessage.placeholder = 'Enter message';
});

function sendMessage() {
    if (!userName) alert('You are not sign up');
    else {
        let message = document.getElementById("message").value;
        if(message){
            firebase.database().ref("messages").push().set({
                "sender": userName,
                "message": message
            });
        }
    }
    return false;
}


