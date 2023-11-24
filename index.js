// Ingreso de nombres

//***Select items***
const alert = document.querySelector(".alert")
const form = document.querySelector(".names-form")
const names = document.getElementById("names")
const submitBtn = document.querySelector(".submit-btn")
const container = document.querySelector(".names-container")
const list = document.querySelector(".names-list")
const clearBtn = document.querySelector(".clear-btn")
//edit option
let editElement;
let editFlag = false;
let editId = "";

//***event listeners ***/
form.addEventListener("submit", addItem);
//clear all items
clearBtn.addEventListener("click", clearItems);
//load content
window.addEventListener("DOMContentLoaded", setupItems);

//****FUNCTIONS****
function addItem(e) {
    e.preventDefault();
    const value = names.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createListItem(id, value);
        //display alert
        displayAlert("se agregó un nombre a la lista", "success");
        //show container
        container.classList.add("show-container");
        //add to local storage
        addToLocalStorage(id, value);
        //set back to default
        setBackToDefault()
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("se editó correctamente", "success");
        //edit local storage
        editLocalStorage(editId, value);
        setBackToDefault();

    } else {
        displayAlert("Agrega un nombre", "danger")
    }
}

//Display Alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000)
};

//clear items function

function clearItems() {
    const items = document.querySelectorAll(".names-item");
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item)
        })
    }
    container.classList.remove("show-container");
    displayAlert("Se eliminaron todos los nombres de la lista", "danger");
    setBackToDefault();
    localStorage.removeItem("list");
};
//edit function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    names.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "editar";
}
//delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove("show-container")
    }
    displayAlert("nombre eliminado", "danger");
    setBackToDefault()
    // remove from local storage
    removeFromLocalStorage(id)
}
//set back to default function

function setBackToDefault() {
    
    names.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = "agregar";
}


//***Local storage***///
function addToLocalStorage(id, value) {
    const names = { id, value };
    let items = getLocalStorage()
    console.log(items);
    items.push(names);
    localStorage.setItem("list", JSON.stringify(items));
};

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item
        }
    })
    localStorage.setItem("list", JSON.stringify(items));

}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    })
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}
//localStorageAPI
//setItem
//getItem
//removeItem
//save as string
//***SETUP ITEMS ***/
function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value)
        })
        container.classList.add("show-container")
    }
}
function createListItem(id, value) {
    const element = document.createElement("article");
    //add class
    element.classList.add("names-item");
    // add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
<div class="btn-container">
<button type="button" class="edit-btn">
<i class="fas fa-edit"></i>
</button>
<button type="button" class="delete-btn">
<i class="fas fa-trash"></i>
</button>
</div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem)
    //append child
    list.appendChild(element);
}

//FIN Ingreso de nombres















// SORTEADOR DE AMIGOS
const nombresDeAmigos = getLocalStorage()
const listaDeAmigos = nombresDeAmigos.map(function(item){
    return item.value
})
console.log(listaDeAmigos);

const btn = document.getElementById("btn");
const amigo = document.querySelector(".amigo");

btn.addEventListener("click", function () {
    //Queremos obtener un numero random entre 0 y 5
    const randomNumber = getRandomNumber();
    console.log(randomNumber);

    amigo.textContent = listaDeAmigos[randomNumber]
})

function getRandomNumber() {
    return Math.floor(Math.random() * listaDeAmigos.length);
}

