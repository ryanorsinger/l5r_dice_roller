function updateTargetNumber(val) {
    val = parseInt(val);
    console.log(val)

    if (document.getElementById('target_number').value != val) {
        document.getElementById('target_number').value = val;
    }

    if (document.getElementById('points').value != val) {
        document.getElementById('points').value = val;
    }
}




calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", function(event) {
    event.preventDefault();

    let numberOfSimulatedRolls = parseInt(document.querySelector("#simulations").value);
    
    if(isNaN(numberOfSimulatedRolls)) {
        numberOfSimulatedRolls = 1000;
    }

    let targetNumber = parseInt(document.querySelector("#target_number").value);
    
    let explodeTens = document.querySelector("#tens").checked
    let explodeNines = document.querySelector("#nines").checked
    let rerollOnes = document.querySelector("#ones").checked

    let rollToParse = document.querySelectorAll("input[type='radio']:checked")[0].value;
    
    console.log(`Roll to parse is ${rollToParse}`)
    console.log(`Explode 10s is ${explodeTens}`)
    console.log(`Explode 9s is ${explodeNines}`)
    console.log(`Reroll 1s is ${rerollOnes}`)

    
});

