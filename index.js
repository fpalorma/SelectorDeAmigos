const listaDeAmigos = ["Agus Labiano","Agus Paz","Emi Canizzo","Fede Garrido","Fede Palorma","Osvaldo Soler"];

const btn = document.getElementById("btn");
const amigo = document.querySelector(".amigo");

btn.addEventListener("click",function(){
    //Queremos obtener un numero random entre 0 y 5
    const randomNumber = getRandomNumber();
    console.log(randomNumber);
    
    amigo.textContent = listaDeAmigos[randomNumber]
})

function getRandomNumber(){
    return Math.floor(Math.random()*listaDeAmigos.length);
}