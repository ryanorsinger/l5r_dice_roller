"use strict";

// Once everything to parse and make a roll is done...
// simulate n_rolls to produce a distribution
// return % of values above the target_number
// paint the screen w/ 

function parseRoll(rollToParse, explodeTens=false, explodeNines=false, rerollOnes=false) {
    let parts = rollToParse.split("k");
    
    const numberRolled = parseInt(parts[0]);
    const keep = parseInt(parts[1]);

    
    return makeRoll(numberRolled, keep, explodeTens, explodeNines, rerollOnes ) 
}


function makeRoll(numberRolled, keep, explodeTens, explodeNines, rerollOnes) {
    
    // roll the original roll pool
    let pool = rollPool(numberRolled);

    // handle all the different cases that could reroll or explode dice in the dice pool.
    pool = handleCases(pool, explodeTens, explodeNines, rerollOnes);

    // keep only the highest value dice given the number to keep.
    pool = keepBest(pool, keep);

    // sum up the pool of dice
    let sum = sumPool(pool);

    return sum;
}

/** 
 * The handleCases function models the following senarios and returns a transformation of the original dice pool.
 * reroll 1, exploding 10, exploding 9
 * reroll 1, exploding 10 only
 * no reroll 1, exploding 10, exploding 9
 * no reroll 1, exploding 10
 * no reroll 1, no exploding 10, no exploding 9
 * because of game mechanics, we won't explode 9s unless we're already exploding 10s.
 */
function handleCases(pool, explodeTens, explodeNines, rerollOnes) {
    
    // Rerolling ones, by game mechanics, only happens on the first dice pool. Successive ones do not reroll.
    if(rerollOnes && pool.includes(1)) {
        pool = rerollAnyOnes(pool);
    }

    if(explodeTens && explodeTens) {
        pool = explodeBothNinesAndTens(pool);
    } else if(explodeTens) {
        pool = explodeOnlyTens(pool);    
    } 

    return pool;
}


// Keep the n best dice
function keepBest(pool, keep) {
    return pool.sort(function(a, b){return b - a}).slice(0, keep);
}

// sum up the entire dice pool
function sumPool(pool) {
    let total = 0;
    for(let i = 0; i < pool.length; i++) {
        total += pool[i];
    }
    return total;
}


function rollDie() {
    return Math.ceil(Math.random() * 10)
}

function rollPool(numberRolled) {
    let pool = [];
    for (let i=0; i < numberRolled; i++) {
        pool[i] = rollDie();
    }
    return pool;
}

function rerollAnyOnes(pool) {
    return pool.map(die => {
        if(die == 1) {
            die = rollDie();
        }
        return die;
    });
}