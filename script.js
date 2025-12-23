const grid = document.getElementById("bingo-grid");
const generateBtn = document.getElementById("generate");
const sizeSelect = document.getElementById("size");
const banner = document.getElementById("bingo-banner");

generateBtn.addEventListener("click", generateGrid);

function generateGrid() {
    const size = parseInt(sizeSelect.value);
    grid.innerHTML = "";

    for (let r = 0; r < size; r++) {
        const row = document.createElement("tr");

        for (let c = 0; c < size; c++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");

            input.type = "text";
            input.placeholder = "Prediction";

            cell.appendChild(input);
            cell.addEventListener("dblclick", () => toggleCell(cell));

            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
}

function toggleCell(cell) {
    const input = cell.querySelector('input');
    if (input && input.value.trim() !== '') {
        cell.classList.toggle("checked");
        checkBingo();
    }
}

function checkBingo() {
    const size = grid.rows.length;
    if (size === 0) return;
    
    // Check if ALL cells are checked (HYPER BINGO)
    const allCells = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            allCells.push(grid.rows[r].cells[c]);
        }
    }
    const allChecked = allCells.every(cell => cell.classList.contains("checked"));
    if (allChecked) return showBingo(true);

    // Rows
    for (let r = 0; r < size; r++) {
        const cells = [...grid.rows[r].cells];
        const checkedCount = cells.filter(cell => cell.classList.contains("checked")).length;
        if (checkedCount === size) return showBingo(false);
    }

    // Columns
    for (let c = 0; c < size; c++) {
        let checkedCount = 0;
        for (let r = 0; r < size; r++) {
            if (grid.rows[r].cells[c].classList.contains("checked")) {
                checkedCount++;
            }
        }
        if (checkedCount === size) return showBingo(false);
    }

    // Diagonal left → right
    let checkedCount = 0;
    for (let i = 0; i < size; i++) {
        if (grid.rows[i].cells[i].classList.contains("checked")) {
            checkedCount++;
        }
    }
    if (checkedCount === size) return showBingo(false);

    // Diagonal right → left
    checkedCount = 0;
    for (let i = 0; i < size; i++) {
        if (grid.rows[i].cells[size - i - 1].classList.contains("checked")) {
            checkedCount++;
        }
    }
    if (checkedCount === size) return showBingo(false);
}

function showBingo(isHyper = false) {
    banner.textContent = isHyper ? "HYPER BINGO!" : "BINGO!";
    banner.style.display = "block";
    banner.style.left = "-100%";

    let position = -100;
    const interval = setInterval(() => {
        position += 2;
        banner.style.left = position + "%";

        if (position > 100) {
            clearInterval(interval);
            banner.style.display = "none";
        }
    }, 16);
}

// Generate initial grid
generateGrid();