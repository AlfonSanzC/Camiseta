const titulo = document.getElementById("titulo");
const posX = document.getElementById("posX");
const posY = document.getElementById("posY");
const camiseta = document.getElementById("camiseta");
const imagenGrande = document.getElementById("imagen-grande");
const imagenPecho = document.getElementById("imagen-pecho");
const labels = document.querySelectorAll('label');
const tituloPrincipal = document.getElementById("tituloPrincipal");
const textoCamiseta = document.getElementById("texto-personalizado"); 
let imagenesArrastrables = document.querySelectorAll(".imagen-arrastrable");

//Función para crear texto en el input titulo
function crearTexto() {
  let texto = titulo.value; 

  if(texto.length < 20){
    textoCamiseta.innerHTML = texto; 
  }
}

//Función Actualizar posiociones del título
function actualizarPosicion() {
  let x = posX.value; 
  let y = posY.value; 
  
  //Transformación en CSS para mover el texto
  textoCamiseta.style.transform = `translate(${x}px, ${y}px)`;
}

//Asigna la función crearTexto al evento oninput
titulo.oninput = crearTexto; 
//Asigna la función actualizarPosicion al evento oninput
posX.oninput = actualizarPosicion;
posY.oninput = actualizarPosicion;

//Función cambio color camiseta, alterna entre las imágenes
function manejarColorCamiseta(color) {
    const imagenCamiseta = document.getElementById("imagen-camiseta");
    if (color === "blanca") {
        imagenCamiseta.src = "img/camiseta/white.png";
    } else if (color === "negra") {
        imagenCamiseta.src = "img/camiseta/black.png";
    }
}

function manejarDragStart(e) {
    //Esto almacena el ID del elemento que se está arrastrando
    e.dataTransfer.setData("text/plain", e.target.id);
}

function manejarDragOver(e) {
    e.preventDefault();
}

function manejarDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const draggedImage = document.getElementById(id);
    const imageTitle = draggedImage.getAttribute("data-title");


    imagenGrande.innerHTML = `
        <div style="text-align: center;">
            <img src="${draggedImage.src}" style="max-width: 80%; max-height: 80%;">
            <div style="margin-top: 1px; font-size: 25px; color: #080808 ;">${imageTitle}</div>
        </div>
`
    imagenPecho.innerHTML = `<img src="${draggedImage.src}" style="max-width: 100%; max-height: 100%;">`;
}

function aplicarEstilos() {

     //Imagen Grande 
     imagenGrande.style.position = "absolute";
     imagenGrande.style.top = "65%";
     imagenGrande.style.left = "42%";

     imagenGrande.style.transform = "translate(-50%, -50%)";
 
  //Letras de los controles(Titulo, posicion, color...)
    labels.forEach(label => {
        label.style.color = "white";
    });

    //Imagen Pequeña del pecho
    imagenPecho.style.position = "absolute";
    imagenPecho.style.top = "21%";
    imagenPecho.style.left = "44%";
    imagenPecho.style.height = "250px";
    imagenPecho.style.transform = "scale(0.5) rotate(-15deg)";

    //Imagen del fondo
    document.body.style.backgroundImage = "url('img/imgfondo.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100%";

    //Titulo(The Witcher 3)
    tituloPrincipal.style.color = "white";
    tituloPrincipal.style.marginLeft = '210px';
    tituloPrincipal.style.marginTop = '50px';
    tituloPrincipal.style.fontFamily = "'The Witcher', sans-serif";
    tituloPrincipal.style.fontSize = '60px';

    //Frase Titulo
  textoCamiseta.style.top = `${37}%`; 
  textoCamiseta.style.left = `${41}%`;
  textoCamiseta.style.transform = 'translate(-50%, -50%)'; 

}

// Event Listeners
document.querySelectorAll('input[name="color"]').forEach((radio) => {
    radio.addEventListener("change", (e) => manejarColorCamiseta(e.target.value));
});

imagenesArrastrables.forEach((img) => {
    img.addEventListener("dragstart", manejarDragStart);
});

camiseta.addEventListener("dragover", manejarDragOver);
camiseta.addEventListener("drop", manejarDrop);

// Inicialización
aplicarEstilos();
