let scienceTick = 0;
let scienceTickLimit = 2000;


const doScience = () =>{
    if(total_scientists > 0 && !upgradesComplete){
        for (let i = 0; i < total_scientists; i++) {
            scienceTick++;

            if(scienceTick >= scienceTickLimit){
                
                doUpgrade();
                scienceTick = 0;
                scienceTickLimit += 100;
            }
        }
    }
}

let completedUpgrades = [];
const totalUpgrades = 9;

const doUpgrade = () =>{
    let randomNum = Math.floor(Math.random() * potentialUpgrades.length - 1) + 1;

    if(randomNum === potentialUpgrades.indexOf(increaseHomeCapacity) || randomNum === potentialUpgrades.indexOf(increaseScientistLimit)){
        randomNum = Math.floor(Math.random() * potentialUpgrades.length - 1) + 1;
    }

    potentialUpgrades[randomNum]();
    checkIfAllUpgradesComplete();
}

checkIfAllUpgradesComplete = () =>{
    if(completedUpgrades.length === totalUpgrades){
        upgradesComplete;
    }
}

const chanceForDoubleWoodIncrease = 1;

const chanceForDoubleFoodIncrease = 1; 

const villagerEnergyDrainDecrease = 0.0025; //starts at 0.3 - minimum 0.1 (80 upgrades)
const villagerEnergyGainIncrease = 0.01; //starts at 0.7 - max 2 (130 upgrades)

//need to figure out how many of each upgrade is possible - these should be fairly equal

const potentialUpgrades = [
    increaseChanceForDoubleWood = () => {
        if(chanceForDoubleWood >= 30){
            return;
        }

        chanceForDoubleWood += chanceForDoubleWoodIncrease;
        if(chanceForDoubleWood >= 30){
            displayPrompt("double wood - MAXED", "awesome! you have maxed out your chance to find double wood");
            //prevent this option
            completedUpgrades.push(0);
            potentialUpgrades.splice(potentialUpgrades.indexOf(increase), 1);

        }else{
            displayPrompt("double wood", "your chance to find double wood has increased by " + chanceForDoubleWoodIncrease + "%");
        }
    },
    increaseChanceForDoubleFood = () => {
        if(chanceForDoubleFood >= 30){
            return;
        }

        chanceForDoubleFood += chanceForDoubleFoodIncrease;
        if(chanceForDoubleFood >= 30){
            displayPrompt("double food - MAXED", "nice! you have maxed out your chance to find double food");
            //prevent this option
            completedUpgrades.push(1);
            potentialUpgrades.splice(potentialUpgrades.indexOf(increaseChanceForDoubleFood), 1);

        }else{
            displayPrompt("double food", "your chance to find double food has increased by " + chanceForDoubleFoodIncrease + "%");
        }
    },
    increaseWallStrengthOnBuild = () => {
        if(wallStrengthIncreaseAmount >= 30){
            return;
        }

        wallStrengthIncreaseAmount += 1;

        if(wallStrengthIncreaseAmount >= 30){
            displayPrompt("more walls - MAXED", "crazy! you have maxed out your ability to build extra walls");
            //prevent this option
            completedUpgrades.push(2);
            potentialUpgrades.splice(potentialUpgrades.indexOf(increaseWallStrengthOnBuild), 1);

            
        }else{
            displayPrompt("more walls", "your wall strength increased by an extra point when built");
        }

    },
    increaseCowEnergyRegain = () => {
        if(villager_energy_gain >= 2){
            return;
        }

        villager_energy_gain += villagerEnergyGainIncrease;

        if(villager_energy_gain >= 2){
            displayPrompt("better rest - MAXED", "wow! you have maxed out how fast your cows can regain their energy");
            //prevent this option
            completedUpgrades.push(3);
            potentialUpgrades.splice(potentialUpgrades.indexOf(increaseCowEnergyRegain), 1);

            
        }else{
            displayPrompt("better rest", "your cows now regain their energy faster when at home");
        }
    },
    reduceCowEnergyDrain = () => {
        if(villager_energy_decay <= 0.1){
            return;
        }

        villager_energy_decay -= villagerEnergyDrainDecrease;

        if(villager_energy_decay <= 0.1){
            displayPrompt("increased stamina - MAXED", "impressive! you have maxed out your cows stamina endurance");
            //prevent this option
            completedUpgrades.push(4);
            potentialUpgrades.splice(potentialUpgrades.indexOf(reduceCowEnergyDrain), 1);

            
        }else{
            displayPrompt("increased stamina", "your cows energy now reduces slower while working");
        }
    },
    reduceCowFatiguePunishment = () => {
        if(villager_fatigue_punishment <= 1.5){
            return;
        }

        villager_fatigue_punishment -= 0.025;

        if(villager_fatigue_punishment <= 1.5){
            displayPrompt("less fatigue - MAXED", "check it out! you have maxed out your cows ability to quickly recover from fatigue");
            //prevent this option
            completedUpgrades.push(5);
            potentialUpgrades.splice(potentialUpgrades.indexOf(reduceCowFatiguePunishment), 1);
        }else{
            displayPrompt("less fatigue", "fatigued cows now return to full strength faster");
        }
    },
    increaseHomeCapacity = () => {  //rare upgrade
        if(villagers_per_home >= 10){
            return;
        }
        villagers_per_home++;

        if(villagers_per_home >= 10){
            displayPrompt("bigger homes - MAXED", "ahhh-moooo-zing! you have maxed out the cows home capacity");
            //prevent this option
            completedUpgrades.push(6);
            potentialUpgrades.splice(potentialUpgrades.indexOf(increaseHomeCapacity), 1);

        
        }else{
            displayPrompt("bigger homes", "each home can now house " + villagers_per_home + " cows");
        }
    },
    increaseScientistLimit = () => { //rare upgrade
        if(scientistLimit >= 10){
            return;
        }

        scientistLimit++;
        if(scientistLimit >= 10){
            displayPrompt("bigger labs - MAXED", "super! your labs capacity has been maxed out");
            //prevent this option
            completedUpgrades.push(7);
            potentialUpgrades.splice(potentialUpgrades.indexOf(increaseScientistLimit), 1);

        
        }else{
            displayPrompt("bigger labs", "your laboratory can now have " + scientistLimit + " scientists working at once");
        }
    },
    increaseNextAttackTime = () => {
        if(nextAttackCountdownBonus >= 20){
            return;
        }

        nextAttackCountdown++;
        nextAttackCountdownBonus++;

        if(nextAttackCountdownBonus >= 20){
            displayPrompt("slow attacker - MAXED", "now that's what I'm talking about! you have maxed out slowing the enemy")   
            completedUpgrades.push(8);
            potentialUpgrades.splice(potentialUpgrades.indexOf(increaseNextAttackTime), 1);
            
        }else{
            displayPrompt("slow attacker", "the enemy now takes longer to attack");

        }
    }
];