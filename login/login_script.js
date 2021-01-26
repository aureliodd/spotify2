function validation(){
    ul.innerHTML = "";

    if(form.username.value.length === 0){
        form.username.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci username"
        ul.appendChild(li);
        event.preventDefault();
    }

    if(form.password.value.length === 0){
        form.password.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci password"
        ul.appendChild(li);
        event.preventDefault();
    }

    
    let divError2 = document.querySelector("#wrongcredentials");
    if (divError !== null) 
        divError2.classList.add("hidden");
}


const ul = document.querySelector("ul");
const divError = document.querySelector("#problems");

const form = document.forms["login-form"];

form.addEventListener('submit', validation);