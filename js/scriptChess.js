function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("active");
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