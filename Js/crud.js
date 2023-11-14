import {actualizarTabla} from "./tabla.js";
import {LeerData, GuardarData} from "./localStorage.js";
import {Monstruo} from "./monstruo.js";

const armas = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre Lobo"];
GuardarData("armas", armas);

const $selectArmas = document.getElementById("selectTipo");
const armasStorage = LeerData("armas");

armasStorage.forEach(arma => {
    $selectArmas.innerHTML += `<option value="${arma}">${arma}</option>`;
});

const elementoMensaje = document.getElementById("mensaje");

const monstruos = LeerData("Monstruos");
const $tabla = document.getElementById("tabla");
const $formulario = document.forms[0];
const $spinner = document.getElementById("spinner");
const $btnCancelar = document.getElementById("cancelar");
const $btnEliminar = document.getElementById("eliminar");

if(monstruos.length)
{
    setTimeout(()=>{
        actualizarTabla($tabla, monstruos);
        $spinner.classList.add("ocultar");
    }, 2000);
}
else
{
    setTimeout(() => {
        $spinner.classList.add("ocultar");
        $tabla.insertAdjacentHTML("afterbegin", `<p>No se encontraron monstruos.</p>`);
    }, 2000);
}

/*** MANEJADORES DE EVENTOS ***/

window.addEventListener("click", (e)=>{
    if(e.target.matches("td"))
    {
        const id = e.target.parentElement.dataset.id;
        
        elementoMensaje.textContent = "";
        const selectedMostruo = monstruos.find((mostruo)=> mostruo.id == id);
        cargarFormulario($formulario, selectedMostruo);
        MostrarBotonesEliminarCancelar();
    }
    else if(e.target.matches("input[value='Eliminar']")){
        handlerEliminar(parseInt($formulario.txtId.value));
        $formulario.reset();
        $formulario.txtId.value = "";
        elementoMensaje.textContent = "Baja realizada correctamente";
        OcultarBotonesEliminarCancelar();
    }
    else if(e.target.matches("input[value='Cancelar']")){
        $formulario.reset();
        $formulario.txtId.value = "";
        OcultarBotonesEliminarCancelar();
    }
});

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    const {txtId, txtNombre, rangeMiedo, txtAlias, rdoDefensa, selectTipo, checkBosque,checkPolar,checkOceano} = $formulario;
    
    if(txtNombre.value.length < 100 && txtAlias.value.length < 100 && txtNombre.value.length > 0 && txtAlias.value.length > 0 && isNaN(txtNombre.value) && isNaN(txtAlias.value))
    {

        if(txtId.value === ""){
            const nuevoMostruo = new Monstruo(Date.now(), txtNombre.value, parseInt(rangeMiedo.value), txtAlias.value, rdoDefensa.value, selectTipo.value,checkBosque.checked,checkPolar.checked,checkOceano.checked);
    
            handlerCrear(nuevoMostruo);
            elementoMensaje.textContent = "Alta realizada Correctamente";
        }
        else{
            const monstruoActualizado = new Monstruo(parseInt(txtId.value), txtNombre.value, parseInt(rangeMiedo.value), txtAlias.value, rdoDefensa.value, selectTipo.value,checkBosque.checked,checkPolar.checked,checkOceano.checked);
            handlerActualizar(monstruoActualizado);
            $btnCancelar.classList.toggle("ocultar");
            $btnEliminar.classList.toggle("ocultar");
            elementoMensaje.textContent = "Modificacion realizada correctamente";
        }
       

        $formulario.reset();
    }
    else
    {
        elementoMensaje.textContent = "";
        alert("Verifique los datos ingresados.");
    }
});

/*** FUNCIONES CRUD ***/

function handlerCrear(monstruo){
    monstruos.push(monstruo);
    GuardarData("Monstruos", monstruos);
    $spinner.classList.remove("ocultar");
    $tabla.classList.add("ocultar");

    setTimeout(()=>{
        actualizarTabla($tabla, monstruos);
        $spinner.classList.add("ocultar");
        $tabla.classList.remove("ocultar");
    }, 2000);
}

function handlerActualizar(monstruoActualizado){
    let index = monstruos.findIndex((montruo)=> montruo.id == monstruoActualizado.id);
    monstruos.splice(index, 1, monstruoActualizado);

    GuardarData("Mostruos", monstruos);
    $spinner.classList.remove("ocultar");
    $tabla.classList.add("ocultar");


    setTimeout(()=>{
        actualizarTabla($tabla, monstruos);
        $spinner.classList.add("ocultar");
        $tabla.classList.remove("ocultar");
    }, 2000);
}

function handlerEliminar(id){
    let index = monstruos.findIndex((mostruo)=> mostruo.id == id);
    if(index != -1)
    {
        monstruos.splice(index, 1);

        GuardarData("Monstruos", monstruos);
        $spinner.classList.remove("ocultar");
        $tabla.classList.add("ocultar");

        setTimeout(()=>{
            actualizarTabla($tabla, monstruos);
            $spinner.classList.add("ocultar");
            $tabla.classList.remove("ocultar");
            if(!monstruos.length)
            {
                $tabla.insertAdjacentHTML("afterbegin", `<p>No se encontraron monstruos.</p>`);
            }
        }, 2000);
    }
}

/*** Otras Funciones ***/

function cargarFormulario(formulario, monstruo){
    formulario.txtId.value = monstruo.id;
    formulario.txtNombre.value = monstruo.nombre;
    formulario.rangeMiedo.value = monstruo.miedo;
    formulario.txtAlias.value = monstruo.alias;
    formulario.rdoDefensa.value = monstruo.defensa;
    formulario.selectTipo.value = monstruo.tipo;
    formulario.checkBosque.checked = monstruo.bosque;
    formulario.checkPolar.checked = monstruo.polar;
    formulario.checkOceano.checked = monstruo.oceano;
}

function MostrarBotonesEliminarCancelar() {
    if($btnCancelar.classList.contains("ocultar") && $btnEliminar.classList.contains("ocultar"))
    {
        $btnCancelar.classList.remove("ocultar");
        $btnEliminar.classList.remove("ocultar");
    }
}

function OcultarBotonesEliminarCancelar() {
    if(!$btnCancelar.classList.contains("ocultar") && !$btnEliminar.classList.contains("ocultar"))
    {
        $btnCancelar.classList.add("ocultar");
        $btnEliminar.classList.add("ocultar");
    }
}