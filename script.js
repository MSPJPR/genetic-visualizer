// Pedigree Builder Logic
function generatePedigree() {
    const canvas = document.getElementById("pedigreeCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";

    // Draw a simple family tree
    ctx.fillRect(100, 50, 50, 50); // Parent 1
    ctx.fillRect(300, 50, 50, 50); // Parent 2
    ctx.fillRect(200, 150, 50, 50); // Child

    // Connectors
    ctx.beginPath();
    ctx.moveTo(125, 100);
    ctx.lineTo(225, 100);
    ctx.lineTo(225, 150);
    ctx.stroke();
}

// Genetic Risk Calculator Logic
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
