let boxes = document.querySelectorAll('.grid-item');
const r = document.getElementById("resultado");

// Inicia Jugador x
let turno_x = true;
let botonReset = document.querySelector('#reset');
var jugadorx = [];
var jugadorO = [];
var i = 0;

const jugadasGanadoras = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


boxes.forEach((griditem) => {
    griditem.addEventListener('click', function () {
        let seleccion = parseInt(griditem.dataset.value);
        if(turno_x){
            griditem.innerHTML = '<img src="./img/x.png"/>';
            turno_x = false;
            jugadorx.push(seleccion);
        }else{
            griditem.innerHTML = '<img src="./img/cero.png"/>';
            turno_x = true;
            jugadorO.push(seleccion);
        }
       
        griditem.inert = true;
        buscarGanador(jugadorx,jugadorO);
        i++;
    })
})

const buscarGanador =(X,O)=>{
    let existe = false; 
    X.sort(); 
    O.sort(); 
    if (X.length>=3){
        for(const valor of jugadasGanadoras){
            if(valor.every( item => X.includes(item)))
            {
                r.innerText =  "Jugador X Ganaste!";    
                inabilitarGrilla();
                break;}
        }
    }
    
    if (O.length>=3){
        for(const valor of jugadasGanadoras){
            if(valor.every( item => O.includes(item)))
            {  
                r.innerText =  "Jugador 0 Ganaste!";  
                inabilitarGrilla();
                break;
            }
        }
    }
    if(O.length + X.length == 9){
        r.innerText =  "Es un empate!";   
    }

}

const inabilitarGrilla = () => {
    for (let griditem of boxes) {
        griditem.inert = true;
    }
};

const habilitarGrilla = () => {
    for (let griditem of boxes) {
        griditem.innerHTML = '';
        griditem.inert = false;
    }
};

const resetJuego = () => {
    turno_x = true;
    jugadorx = [];
    jugadorO = [];
    habilitarGrilla();
    r.innerText = '';
};

botonReset.addEventListener('click', resetJuego);
