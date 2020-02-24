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

const potentialUpgrades = [
    increaseWoodCollection = () =>{
        
    },
    increaseFoodCollection = () =>{

    },
    increaseWallStrengthOnBuild = () =>{

    }
];