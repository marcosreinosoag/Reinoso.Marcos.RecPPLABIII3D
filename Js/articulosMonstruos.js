import {LeerData} from "./localStorage.js";

const monstruos = LeerData("Monstruos");
const $articulos = document.getElementById("articulos");



if(monstruos.length)
{ 
    monstruos.forEach(monstruo => 
        {

            $articulos.insertAdjacentHTML("beforeend",
            `<article>
                <p>Nombre: ${monstruo.nombre}</p>
                <p><img src="./icons/alias.png" alt="alias">Alias: ${monstruo.alias}</p>
                <p><img src="./icons/defensa.png" alt="alias">Defensa: ${monstruo.defensa}</p>
                <p><img src="./icons/miedo.png" alt="alias">Miedo: ${monstruo.miedo}</p>
                <p><img src="./icons/tipo.png" alt="alias">Tipo: ${monstruo.tipo}</p>
                <p>habitad:</p>
                <p>bosque: ${monstruo.bosque}</p>
                <p>polar: ${monstruo.polar}</p>
                <p>oceano: ${monstruo.oceano}</p>
            </article>`);
        });
}

