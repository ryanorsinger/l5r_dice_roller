let allRolls = [];

function mean(values) {
    let total = 0;
    for(let i=0; i < values.length; i++) {
        total += values[i];
    }

    return total / values.length;
}

function median(values){
    if(values.length === 0) {
        return 0;
    }

    values.sort(function(a,b){
        return a-b;
    });

    var half = Math.floor(values.length / 2);

    // if the number of items is odd, then return the middle item
    if (values.length % 2 != 0) {
        return values[half];
    }

    // for an even number of values, average the two middle
    return (values[half - 1] + values[half]) / 2.0;
}

function parseRoll(rollToParse, explodeTens=false, explodeNines=false, rerollOnes=false) {
    let parts = rollToParse.split("k");
    
    const numberRolled = parseInt(parts[0]);
    const keep = parseInt(parts[1]);
    
    return { "keep": keep, "roll": numberRolled };
}

function updateTargetNumber(val) {
    val = parseInt(val);

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
    
    // reset the allRolls
    allRolls = [];

    let numberOfSimulatedRolls = parseInt(document.querySelector("#simulations").value);
    
    if(isNaN(numberOfSimulatedRolls)) {
        numberOfSimulatedRolls = 10_000;
    }
    
    let explodeTens = document.querySelector("#tens").checked
    let explodeNines = document.querySelector("#nines").checked
    let rerollOnes = document.querySelector("#ones").checked

    let rollToParse = document.querySelectorAll("input[type='radio']:checked")[0].value;
    
    let parsedRoll = parseRoll(rollToParse);
    
    let keep = parsedRoll.keep;
    let numberRolled = parsedRoll.roll;

    produceSimulations(numberOfSimulatedRolls, numberRolled, keep, explodeTens, explodeNines, rerollOnes);
});


function produceSimulations(numberOfSimulatedRolls, numberRolled, keep, explodeTens, explodeNines, rerollOnes ) {
    
    for(let i = 0; i < numberOfSimulatedRolls; i++) {
        let rollResult = makeRoll(numberRolled, keep, explodeTens, explodeNines, rerollOnes);
        allRolls.push(rollResult);
    }

    compareAllToTarget(allRolls);

}

function compareAllToTarget(allRolls) {
    let targetNumber = parseInt(document.querySelector("#target_number").value);
    let totalNumberOfRolls = allRolls.length;
    let numberGreaterThanOrEqualToTarget = 0;

    for(let i = 0; i < allRolls.length; i++) {
        if(allRolls[i] >= targetNumber) {
            numberGreaterThanOrEqualToTarget++;
        }
    }

    let probabilityOfBeatingTN = numberGreaterThanOrEqualToTarget / totalNumberOfRolls;
    console.log("total number of rolls is " + totalNumberOfRolls);
    console.log("total number of wins vs. target number is " + numberGreaterThanOrEqualToTarget);

    // multiply by 100 to show percentage
    probabilityOfBeatingTN = probabilityOfBeatingTN * 100;
  
    // update the display to show the % chance of beating the target number given the number of simulations
    document.querySelector("#output > h2:nth-child(1) > span").innerText = probabilityOfBeatingTN;
    document.querySelector("#median > span").innerText = median(allRolls);
    document.querySelector("#mean > span").innerText = mean(allRolls);
 
    // TODO: setup min, max, range
    // TODO: Chart a histogram
    // TODO: Chart a box plot
    // TODO: setup standard deviation
    
    // let max = Math.max(allRolls);
    // let min = Math.min(allRolls);
    
    // document.querySelector("#max > span").innerText = max;
    // document.querySelector("#min > span").innerText = min;
    // document.querySelector("#range > span").innerText = max - min;
    
    addHistogramToPage(allRolls);
    addBoxPlot(allRolls);
}

function addBoxPlot(allRolls) {
    var trace = {
        x: allRolls,
        type: 'box',
        name: 'All Rolls'
      };
      
      var data = [trace];
      
      var layout = {
        title: 'Quartiles and Outliers'
      };
      
      Plotly.newPlot('boxplot', data, layout);
}
function addHistogramToPage(allRolls) {
    var layout = {
        bargap: 0.05, 
        bargroupgap: 0.2, 
        barmode: "overlay", 
        title: "Distribution of Rolls", 
        xaxis: {title: "Value"}, 
        yaxis: {title: "Count"}
      };
    
    var trace = {
        x: allRolls,
        type: 'histogram',
    };
    var data = [trace];
    Plotly.newPlot('histogram', data, layout);
}

// To match game mechanics, ensure that both 9 and 10 become checked if 9 is checked.
document.querySelector("#nines").addEventListener('change', function(e) {
    let tens = document.querySelector("#tens");
    if(tens.checked == false) {
        tens.checked = true;
    }
});

// To match game mechanics, ensure that both 9 and 10 become unchecked if 10 is un-checked while 9 is still checked.
document.querySelector("#tens").addEventListener('change', function() {
    if(document.querySelector("#nines").checked && document.querySelector("#tens").checked  == false) {
        document.querySelector("#nines").checked = false;
    }
});