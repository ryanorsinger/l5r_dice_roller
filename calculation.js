"use strict";

function parseRoll(rollToParse, explodeTens=false, explodeNines=false, rerollOnes=false) {
    let parts = rollToParse.split("k");
    
    const numberRolled = parseInt(parts[0]);
    const keep = parseInt(parts[1]);

    // simulate n_rolls...
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
    

    // // emphasis to reroll any first occurences of ones, explode any and all occurences of 9s or 10s
    // if(rerollOnes && explodeTens && explodeNines) {
        

    // // emphasis to reroll any first occurences of ones and explode any and all tens 
    // } else if(rerollOnes && explodeTens) {


    // } else if(explodeTens && explodeNines) {

    // } 

    // // explode both tens and nines together (because a 9 that explo eachother)
    // // explode tens if only tens
    // // because of game mechanics, we won't explode 9s unless we're already exploding 10s
    // if(explodeTens && explodeNines && (pool.contains(10) || pool.contains(9))) {
    //     pool = rollExplodingNinesAndTens(pool);
    // } else if(explodeTens && pool.contains(10)) {
    //     pool = rollExplodingTens(pool);
    // } 
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

function rerollOnes(pool) {
    pool = pool.map(die => {
        if(die == 1) {
            die = rollDie();
        }
    });
    return pool;
}