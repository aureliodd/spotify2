function removeLi(){
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
}

function onResponse(response){
    return response.text();
}

function onText(text){
    removeLi();
    console.log(text);
    let resultImg = usernameText.parentNode.querySelector("img");
    if(text === "1"){
        invia.disabled = true;
        usernameText.classList.add("no");
        usernameText.classList.remove("ok");
        resultImg.src = "/~aurelio/Homework1/src/error.png";
        divError.classList.replace("hidden","show");
        let ul =  divError.querySelector("ul");
        let li = document.createElement("li");
        li.innerHTML = "Username già in uso"
        ul.appendChild(li);
    } else if (text === "0") {
        invia.disabled= false;
        divError.classList.replace("show","hidden");
        usernameText.classList.remove("no");
        usernameText.classList.add("ok");
        resultImg.src = "/~aurelio/Homework1/src/ok.png"
    }
}

function validation(){
    removeLi();

    let ul =  divError.querySelector("ul");
    
    if(form.username.value.length === 0){
        form.username.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci username"
        ul.appendChild(li);
        event.preventDefault();
    }

    if (form.nome.value.length === 0){
        form.nome.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci nome"
        ul.appendChild(li);
        event.preventDefault();
    }
    if (form.cognome.value.length === 0){
        form.cognome.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci cognome"
        ul.appendChild(li);
        event.preventDefault();
    }
    if (form.email.value.length === 0){
        form.email.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci email"
        ul.appendChild(li);
        event.preventDefault();
    } else if(!form.email.value.includes("@") || !form.email.value.includes(".")){
        form.email.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Per favore controllare la mail inserita";
        ul.appendChild(li);
        event.preventDefault();
    }
    if (form.telefono.value.length === 0){
        form.telefono.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci telefono"
        ul.appendChild(li);
        event.preventDefault();
    } else if(form.telefono.value.match(/^[0-9]+$/) === null){
        form.password.classList.replace("initial","no");
        form.confermap.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Puoi inserire solo numeri in telefono";
        ul.appendChild(li);
        event.preventDefault();
    }

    if (form.genere.value === "seleziona"){
        document.querySelector("#select").classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci genere"
        ul.appendChild(li);
        event.preventDefault();
    }
    if (form.password.value.length === 0){
        form.password.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci password"
        ul.appendChild(li);
        event.preventDefault();
    }
    if (form.confermap.value.length === 0){
        form.confermap.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Inserisci di nuovo la pasword"
        ul.appendChild(li);
        event.preventDefault();
    }
    if(form.password.value !== form.confermap.value){
        form.password.value = "";
        form.confermap.value = "";
        form.password.classList.replace("initial","no");
        form.confermap.classList.replace("initial","no");
        divError.classList.replace("hidden","show");
        let li = document.createElement("li");
        li.innerHTML = "Le password devono coincidere";
        ul.appendChild(li);
        event.preventDefault();
    }
}

function isInDatabase(event){
    let form = new FormData();
    form.append("username",event.target.value);
    let url =  "/~aurelio/Homework1/isinDB.php";
    fetch(url, {method: 'post', body:form}).then(onResponse).then(onText);
 }
 
const divError = document.querySelector("#problems");

const form = document.forms["signup-form"];
const user = document.getElementById("username");
const invia = document.querySelector("#send");
const usernameText = document.querySelector("#username");
form.addEventListener('submit', validation);
user.addEventListener('blur', isInDatabase);