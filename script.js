const canvas = document.getElementById("pedigreeCanvas");
const ctx = canvas.getContext("2d");
let members = []; // To hold family members
let draggingMember = null;

// Add Member
function addMember() {
    const x = Math.random() * (canvas.width - 50);
    const y = Math.random() * (canvas.height - 50);
    members.push({ x, y, w: 50, h: 50 });
    drawCanvas();
}

// Save Pedigree to Local Storage
function savePedigree() {
    localStorage.setItem("familyTree", JSON.stringify(members));
    alert("Pedigree saved locally!");
}

// Save Pedigree to MongoDB (Updated Code)
async function savePedigreeToDB() {
    try {
        const response = await fetch("/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(members),
        });
        const result = await response.text();
        alert(result);
    } catch (error) {
        alert("Error saving pedigree to database: " + error.message);
    }
}

// Load Pedigree
function loadPedigree() {
    const savedData = localStorage.getItem("familyTree");
    if (savedData) {
        members = JSON.parse(savedData);
        drawCanvas();
    } else {
        alert("No saved pedigree found.");
    }
}

// Draw Canvas
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    members.forEach(member => {
        ctx.fillStyle = "blue";
        ctx.fillRect(member.x, member.y, member.w, member.h);
    });
}

// Drag-and-Drop Logic
canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    draggingMember = members.find(
        member =>
            mouseX > member.x &&
            mouseX < member.x + member.w &&
            mouseY > member.y &&
            mouseY < member.y + member.h
    );
});

canvas.addEventListener("mousemove", (e) => {
    if (draggingMember) {
        const rect = canvas.getBoundingClientRect();
        draggingMember.x = e.clientX - rect.left - draggingMember.w / 2;
        draggingMember.y = e.clientY - rect.top - draggingMember.h / 2;
        drawCanvas();
    }
});

canvas.addEventListener("mouseup", () => {
    draggingMember = null;
});

// Risk Calculator
document.getElementById("riskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const parent1 = document.getElementById("parent1").value.toUpperCase();
    const parent2 = document.getElementById("parent2").value.toUpperCase();
    const result = calculateRisk(parent1, parent2);
    document.getElementById("riskResult").innerText = `Genetic Risk: ${result}`;
});

function calculateRisk(parent1, parent2) {
    if (parent1 === "AA" && parent2 === "AA") return "0% (No risk)";
    if (parent1 === "Aa" && parent2 === "Aa") return "25% (Recessive disorder)";
    if (parent1 === "Aa" && parent2 === "aa") return "50% (Carrier)";
    return "Unknown combination";
}
