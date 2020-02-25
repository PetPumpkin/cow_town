let scienceTick = 0;
let scienceTickLimit = 2000;
let scientistLimit = 10;

const doScience = () =>{
    if(total_scientists > 0){
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

const doUpgrade = () =>{
    let randomNum = Math.floor(Math.random() * potentialUpgrades.length - 1) + 1;
    potentialUpgrades[randomNum]();
}

let chanceForDoubleWood = 0;
const chanceForDoubleWoodIncrease = 1;

let chanceForDoubleFood = 0;
const chanceForDoubleFoodIncrease = 1;

const villagerEnergyDrainDecrease = 0.025;
const villagerEnergyGainIncrease = 0.05;

const potentialUpgrades = [
    increaseChanceForDoubleWood = () =>{
        displayPrompt("double food", "your chance to find double wood has increased by " + chanceForDoubleWoodIncrease + "%");
        chanceForDoubleWood += chanceForDoubleWoodIncrease;
    },
    increaseChanceForDoubleFood = () =>{
        displayPrompt("double wood", "your chance to find double food has increased by " + chanceForDoubleFoodIncrease + "%");
        chanceForDoubleFood += chanceForDoubleFoodIncrease;
    },
    increaseWallStrengthOnBuild = () =>{
        displayPrompt("more walls", "your wall strength increased by an extra point when built");
        wallStrengthIncreaseAmount += 1;
    },
    increaseCowEnergyRegain = () => {
        displayPrompt("better rest", "your cows now regain their energy faster when at home");
        villager_energy_gain += villagerEnergyGainIncrease;
    },
    reduceCowEnergyDrain = () => {
        displayPrompt("higher stamina", "your cows energy now reduces slower while working");
        villager_energy_decay -= villagerEnergyDrainDecrease;
    }
];