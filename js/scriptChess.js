function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("active");
}

const diceEl = document.getElementById("dice");
const rollHistoryEl = document.getElementById("roll-history");
let historyList =[];


//Generate random numbers from 1 to 6
function rollDice(){
    const rollResult = Math.floor(Math.random() * 6) + 1;
    const diceFace = getDiceFace(rollResult)
    diceEl.innerHTML = diceFace;
    historyList.push(rollResult);
    updateRollHistory();
}
// Save all the dice rolls
function updateRollHistory() {
    rollHistoryEl.innerHTML = ""; // limpia el historial

    for (let i = 0; i < historyList.length; i++) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Roll ${i + 1}: <span>${getDiceFace(historyList[i])}</span>`;
        rollHistoryEl.appendChild(listItem);
    }
}
    

//Show all the dice faces
function getDiceFace(rollResult){
    switch(rollResult){
        case 1:
            return "&#9856;";
        case 2:
            return "&#9857";
        case 3:
            return "&#9858;"; 
        case 4:
            return "&#9859;";
        case 5:
            return "&#9860;";
        case 6:
            return "&#9861;";
        default:
            return "";
    }
}

// Make my dice animation
function diceAnimation() {
const buttonEl = document.getElementById("roll-button")
buttonEl.addEventListener("click", ()=>{
    diceEl.classList.add("roll-animation");
    setTimeout(() =>{
        diceEl.classList.remove("roll-animation");
        rollDice()
    }, 1000);
})
}


// Insertar imágenes en las casillas
function insertImages() {
    document.querySelectorAll('.box').forEach(box => {
        if (box.innerText.trim() !== "") {
            const piece = box.innerText.trim();
            box.setAttribute('data-piece', piece); // guardar la pieza
            box.innerHTML = `<img class="all-img" src="img/${piece}.png" alt="${piece}">`;
            box.style.cursor = "pointer";
        }
    });
}
insertImages();
// Variables globales
let selectedBox = null;
let turn = 'W'; // White empieza

// Actualizar etiqueta de turno
function updateTurnLabel() {
    document.getElementById('Zug').innerText = (turn === 'W') ? "White" : "Black";
}

// Resetear colores del tablero
function resetBoardColors() {
    document.querySelectorAll('.box').forEach(box => {
        const id = box.id;
        const row = parseInt(id[1]);
        const col = parseInt(id[2]);
        if ((row + col) % 2 === 0) {
            box.style.background = '#8ec9c9';
        } else {
            box.style.background = '#ffffff';
        }
    });
}

// Función para seleccionar peones y mostrar movimientos
function enablePawnSelection() {
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', () => {
            const piece = box.getAttribute('data-piece');

            // Si la casilla es del turno actual
            if (piece && piece.startsWith(turn)) {
                selectedBox = box;
                resetBoardColors(); // primero resetear

                // pintar la casilla seleccionada
                box.style.background = 'orange';

                const id = box.id;
                const row = parseInt(id[1]);
                const col = parseInt(id[2]);

                // Si es peón, marcar posibles movimientos
                if (piece.endsWith('pawn')) {
                    const nextRow = (turn === 'W') ? row + 1 : row - 1;
                    const nextBox = document.getElementById(`b${nextRow}${col}`);
                    if (nextBox && !nextBox.getAttribute('data-piece')) {
                        nextBox.dataset.move = "true"; // marcar como movimiento
                        nextBox.style.background = 'greenyellow';
                    }

                    // capturas diagonales
                    [-1, 1].forEach(offset => {
                        const diagBox = document.getElementById(`b${nextRow}${col + offset}`);
                        if (diagBox && diagBox.getAttribute('data-piece') && !diagBox.getAttribute('data-piece').startsWith(turn)) {
                            diagBox.dataset.capture = "true"; // marcar como captura
                            diagBox.style.background = 'red';
                        }
                    });
                }
            }
            // Mover la pieza si se hace click en una casilla marcada como movimiento
            else if (selectedBox && box.dataset.move === "true") {
                box.innerHTML = selectedBox.innerHTML;
                box.setAttribute('data-piece', selectedBox.getAttribute('data-piece'));
                
                // limpiar la casilla anterior
                selectedBox.innerHTML = '';
                selectedBox.removeAttribute('data-piece');
                selectedBox = null;

                // cambiar turno
                turn = (turn === 'W') ? 'B' : 'W';
                updateTurnLabel();

                // limpiar dataset y colores
                document.querySelectorAll('.box').forEach(b => {
                    delete b.dataset.move;
                    delete b.dataset.capture;
                    const id = b.id;
                    const row = parseInt(id[1]);
                    const col = parseInt(id[2]);
                    b.style.background = (row + col) % 2 === 0 ? '#8ec9c9' : '#ffffff';
                });
            }
        });
    });
}
enablePawnSelection();
updateTurnLabel(); // para que al inicio muestre "White"
diceAnimation() ;