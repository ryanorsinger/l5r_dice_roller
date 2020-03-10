"use strict";

// Once everything to parse and make a roll is done...
// simulate n_rolls to produce a distribution
// return 
// update the screen with % of values above the target_number
// update the screen with odds of hitting at least the target_number
// paint the screen w/ the distribution


function parseRoll(rollToParse, explodeTens=false, explodeNines=false, rerollOnes=false) {
    let parts = rollToParse.split("k");
    
    const numberRolled = parseInt(parts[0]);
    const keep = parseInt(parts[1]);
    
    // return makeRoll(numberRolled, keep, explodeTens, explodeNines, rerollOnes ) 
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

    // only explode values if they exist in the dice pool, otherwise we magnify the computational complexity of this algorithm.
    if(explodeTens && explodeTens && (pool.includes(10) || pool.includes(9))) {
        pool = explodeBothNinesAndTens(pool);
    } else if(explodeTens && pool.includes(10)) {
        pool = explodeOnlyTens(pool);    
    } 

    return pool;
}

function explodeBothNinesAndTens(pool) {
    // Iterate through the dice pool and explode 10s
    for(let i = 0; i < pool.length; i++) {
        let roll = pool[i];
        let total = roll;
        
        // Keep looping as long as the roll (or a new roll) is a 10 or a 9. 9s and 10s keep exploding if they occurr in each successive roll.
        while(roll == 10 || roll == 9) {
            
            // Roll a new roll
            roll = rollDie();
            
            // add the new roll to the total
            total += roll;
        }

        // update the dice pool at the 10s index with the exploded rolls
        pool[i] = total;
    }

    // return the transformed dicepool array
    return pool
}

function explodeOnlyTens(pool) {
    
    // Iterate through the dice pool and explode 10s
    for(let i = 0; i < pool.length; i++) {
        let roll = pool[i];
        let total = roll;
        
        // Keep looping as long as the roll (or a new roll) is a 10. 10s keep exploding as long as we keep rolling a 10.
        while(roll == 10) {
            
            // Roll a new roll
            roll = rollDie();
            
            // add the new roll to the total
            total += roll;
        }

        // update the dice pool at the 10s index with the exploded rolls
        pool[i] = total;
    }

    // return the transformed dicepool array
    return pool
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

// Roll a single 10 sided die
function rollDie() {
    return Math.ceil(Math.random() * 10)
}

// Roll n number of 10 sided dice to create a pool.
function rollPool(numberRolled) {
    let pool = [];
    for (let i=0; i < numberRolled; i++) {
        pool[i] = rollDie();
    }
    return pool;
}

// reroll all occurences of 1s only one time.
function rerollAnyOnes(pool) {
    return pool.map(die => {
        if(die == 1) {
            die = rollDie();
        }
        return die;
    });
}