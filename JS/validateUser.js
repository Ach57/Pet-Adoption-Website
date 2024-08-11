document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event){
        const userName = form.querySelector('input[name="user-name"]').value;
        const password= form.querySelector('input[name="pass-user"').value;

        //validating user name and password;
        const userNamePattern = /^[a-zA-Z0-9]+$/;
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;
        if(!userNamePattern.test(userName)){
            document.getElementById('error-message').innerHTML='Username can only contain letters and digits.';
            event.preventDefault();
            return;
        }

        if(!passwordPattern.test(password)){
            document.getElementById('error-message').innerHTML='Password must be at least 4 characters long and include at least one letter and one digit.'
            event.preventDefault();
            return;
        }


    });


});