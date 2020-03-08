var total_villagers = 2;
var total_homes = 1;

var total_food = 10;
var food_upkeep = 0;
var villager_food_cost = 5;
var villager_food_generation = 1;
var villager_energy_decay = .25;
var villager_energy_gain = 0.7;
var villagers_per_home = 2;
var villager_fatigue_punishment = 3;

var total_foragers = 0;

var total_wood = 0;
var total_collectors = 0;

var total_scientists = 0;

var total_builders = 0;
var total_atHome = 0;

var wallStrength = 0;
var wallStrengthIncreaseAmount = 5;
var enemyStrength = 2;

var buildHomesNow = true;

var villager_food_generation = 1;
var villager_wood_generation = 1;

var timeOfDay = 0;

var nextAttackCountdown = 20;
var nextAttackCountdownBonus = 10;
var attacksSurvived = 0;

var buildingHomeTick = 0;
var buildingHomeTickLimit = 1000;

var buildingHomeTickPerWood = 50;
var buildingHomeTickWoodCost = 1;

var buildingWallTick = 0;
var buildingWallTickLimit = 1000;

var buildingWallTickPerWood = 50;
var buildingWallTickWoodCost = 1;

var foodTick = 0;
var foodTickLimit = 25;
var woodTick = 0;
var woodTickLimit = 40;

var ids = 0;

var resourceCalculationTime = 100;

var buttons = document.getElementsByTagName("button");

var speedButton_0 = document.getElementById("speedButton_0");
var speedButton_1 = document.getElementById("speedButton_1");
var speedButton_2 = document.getElementById("speedButton_2");
var speedButton_3 = document.getElementById("speedButton_3");
var speedButton_pause = document.getElementById("speedButton_pause");

var resourceIntervalId;

let villagers = [];

var gameStarted = false;

preGameStart();

function preGameStart(){
    setMultipleDivDisplay(["gameDiv", "speedControlDiv"], false);
}

function gameStart(){
    updateText("new game, good luck!");

    audio_gameStart.play();

    total_games_played++;
    
    setMultipleDivDisplay(["gameDiv", "speedControlDiv"], true);
    setMultipleDivDisplay(["menuDiv", "startGameButton"], false);

    resourceIntervalId = setInterval(calculateResources, resourceCalculationTime);

    addVillager(2, false);
    buildHomes();
    gameSpeed(0);

    document.addEventListener('keydown', keypressHandler);

    total_homes = 1;
    total_food = 0;
    total_wood = 0;
    enemyStrength = 2.5;
    wallStrength = 0;
    buildingWallTickLimit = 1000;
    buildingHomeTickLimit = 1000;
    buildingWallTick = 0;
    buildingHomeTick = 0;
    scienceTick = 0;
    nextAttackCountdown = 20;
    total_days = 0;
    timeOfDay = 0;
}

function gameRestart(){
    document.removeEventListener('keydown', keypressHandler);
    
    for (let i = villagers.length - 1; i >= 0; i--) {
        killVillager(villagers[i], false);        
    }

    clearInterval(resourceIntervalId);

    gameStart();
}

let gamePaused = false;

function gameSpeed(speed){
    
    buttons = document.getElementsByTagName("button");
    
    for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].className == "speedController" || buttons[i].className == "menuControls"){

        }else{
            buttons[i].classList.remove("disabled");
        }
    }

    speedButton_0.style.cursor = "auto";
    speedButton_1.style.cursor = "auto";
    speedButton_2.style.cursor = "auto";
    speedButton_pause.style.cursor = "auto";

    speedButton_0.style.opacity = 1;
    speedButton_1.style.opacity = 1;
    speedButton_2.style.opacity = 1;
    speedButton_pause.style.opacity = 1;

    gamePaused = false;

    switch(speed){
        case 0:
            resourceCalculationTime = 100;
            speedButton_0.style.cursor = "not-allowed";
            speedButton_0.style.opacity = 0.2;
            break;
        case 1:
            resourceCalculationTime = 40;
            speedButton_1.style.cursor = "not-allowed";
            speedButton_1.style.opacity = 0.2;
            break;
        case 2:
            resourceCalculationTime = 10;
            speedButton_2.style.cursor = "not-allowed";
            speedButton_2.style.opacity = 0.2;
            break;
        case 99:
            clearInterval(resourceIntervalId);

            gamePaused = true;

            speedButton_pause.style.cursor = "not-allowed";
            speedButton_pause.style.opacity = 0.2;

            for (let i = 0; i < buttons.length; i++) {
                if(buttons[i].className == "speedController" || buttons[i].className == "menuControls"){

                }else{
                    buttons[i].classList.add("disabled");
                }
            }

            return;
    }
    clearInterval(resourceIntervalId);

    resourceIntervalId = setInterval(calculateResources, resourceCalculationTime);
}

const rollDie = (chanceOutOfHundred) => {
    let randNum = Math.floor(Math.random() * 100);
    return Math.floor(randNum <= chanceOutOfHundred);
}   

function calculateResources(){

    dayCycle();
    //FOOD
    if(total_foragers > 0){
        foodTick++;
    }

    if(foodTick >= (foodTickLimit - (total_foragers / 4))){
        foodTick = 0;
        total_food += villager_food_generation * total_foragers;
        total_food_collected += villager_food_generation * total_foragers;

        if(rollDie(chanceForDoubleFood)){
            total_food += villager_food_generation * total_foragers;
        }

        if(total_food > highest_food_count){
            highest_food_count = total_food;
        }

        audio_gotFood.play();
    }

    //WOOD
    if(total_collectors > 0){
        woodTick++;
    }

    if(woodTick >= (woodTickLimit - (total_collectors / 4))){
        woodTick = 0;
        total_wood += villager_wood_generation * total_collectors;
        total_wood_collected += villager_wood_generation * total_collectors;

        if(rollDie(chanceForDoubleWood)){
            total_wood += villager_wood_generation * total_collectors;
        }

        if(total_wood > highest_wood_count){
            highest_wood_count = total_wood;
        }

        audio_gotWood.play();
    }

    building();
    doScience();

    //building bar
    document.getElementById("buildingBarFiller").style.width = (((buildHomesNow ? buildingHomeTick : buildingWallTick) / (buildHomesNow ? buildingHomeTickLimit : buildingWallTickLimit)) * 100) + "%";

    //science bar
    document.getElementById("upgradeBarFiller").style.width = ((scienceTick / scienceTickLimit) * 100) + "%";

    //check upkeep and wood stocks and signify if too low
    checkFoodAndWoodStock();

    drainVillagersEnergy();
    updateGameText();
}

const checkFoodAndWoodStock = () =>{
    
    if(total_wood === 0){
        if(total_builders > 0){
            document.getElementById("woodStockBox").style.background = "#FF847C";
        }else{
            document.getElementById("woodStockBox").style.background = "#e9ffe9";
        }
    }

    if(total_food < food_upkeep){
        document.getElementById("foodStockBox").style.background = "#FF847C";
    }else{
        document.getElementById("foodStockBox").style.background = "#e9ffe9";
    }

}

function building(){
    if(buildHomesNow){
        buildingHomes();
    }else{
        buildingWalls();
    }
}

function buildHomes(){
    audio_buildingChange.play();

    buildHomesNow = true;

    document.getElementById("currentlyBuilding").innerHTML = "homes";

    let buildHomesButton = document.getElementById("build_homes");
    let buildWallsButton = document.getElementById("build_walls");

    buildHomesButton.classList.add("disabled");
    buildWallsButton.classList.remove("disabled");

    buildHomesButton.style.opacity = 0.6;
    buildWallsButton.style.opacity = 1;
}

function buildWalls(){

    audio_buildingChange.play();

    buildHomesNow = false;

    document.getElementById("currentlyBuilding").innerHTML = "walls";

    let buildHomesButton = document.getElementById("build_homes");
    let buildWallsButton = document.getElementById("build_walls");

    buildHomesButton.classList.remove("disabled");
    buildWallsButton.classList.add("disabled");

    buildHomesButton.style.opacity = 1;
    buildWallsButton.style.opacity = 0.6;
}

function buildingHomes(){
    if(total_builders > 0 && total_wood > 0){

        for (let i = 0; i < total_builders; i++) {
            buildingHomeTick++;

            if(buildingHomeTick % buildingHomeTickPerWood === 0){
                total_wood -= buildingHomeTickWoodCost;
                audio_buildTick.play();
            }
        }

        if(buildingHomeTick >= buildingHomeTickLimit){
            buildingHomeTick = 0;
            audio_buildingFinished.play();
            updateText("new home built");
            total_homes++;
            total_homes_built++;

            buildingHomeTickLimit += 50;
        }
    }
}


function buildingWalls(){
    if(total_builders > 0 && total_wood > 0){

        for (let i = 0; i < total_builders; i++) {

            buildingWallTick++;

            if(buildingWallTick % buildingWallTickPerWood === 0){
                total_wood -= buildingWallTickWoodCost;
                
                audio_buildTick.play();
            }         
        }

        if(buildingWallTick >= buildingWallTickLimit){
            buildingWallTick = 0;
            audio_buildingFinished.play();
            updateText("walls reinforced");
            wallStrength += wallStrengthIncreaseAmount;
            total_walls_built += wallStrengthIncreaseAmount;

            buildingWallTickLimit += 50;
        }
    }
}

function dayCycle(){ // ~30 seconds for a day
    
    timeOfDay += 0.33;

    if(timeOfDay > 100){

        //end of day
        timeOfDay = 0;

        endOfDay();
    }

    document.getElementById("dayCycleFiller").style.width = timeOfDay + "%";
}

function endOfDay(){

    total_days++;
    audio_dayFinished.play();


    updateText("end of day " + total_days);


    total_food -= food_upkeep;

    if(total_food < 0){
        while(total_food < 0){
            total_food += villager_food_cost;
            
            killVillager(villagers[Math.floor((Math.random() * villagers.length - 1) + 1)], true);

            if(villagers.length == 0){
                updateText("not enough food to feed everyone");
                return;
            }
        }

        total_food = 0;
    }else{
        if(total_villagers < total_homes * villagers_per_home){
            addVillager(1, true);
        }
    }

    enemyCheck();

}

function enemyCheck(){
    if(nextAttackCountdown == 0){ 
        
        updateText("enemies attacking");
        
        audio_attackRound.play();
        
        if(wallStrength < enemyStrength){
            updateText("walls overwhelmed");
            endGame();
            return;
        }else{
            wallStrength -= enemyStrength;
            Math.floor(buildingWallTickLimit -= (enemyStrength * 10));
            if(buildingWallTickLimit < 1000){
                buildingWallTickLimit = 1000;
            }
            attacksSurvived++;
            total_attacks_survived++;

            updateText("walls held, enemy retreating");

            enemyStrength += attacksSurvived * 2;

            nextAttackCountdown = nextAttackCountdownBonus;
        }
    }else{
        nextAttackCountdown--;
    }

}

function endGame(){

    sendStatsToKong();

    audio_gameEnd.play();

    document.getElementById("speedControlDiv").style.display = "none";
    document.removeEventListener('keydown', keypressHandler);

    updateText("game over");

    clearInterval(resourceIntervalId);
}

function updateGameText(){ //and manage some resource math
    
    //VILLAGERS
    document.getElementById("resText_homes").innerHTML = total_homes;
    total_villagers = findAliveVillagers();
    document.getElementById("resText_villagers").innerHTML = total_villagers;

    //FOOD
    document.getElementById("resText_food").innerHTML = total_food;

    food_upkeep = villager_food_cost * total_villagers;

    document.getElementById("resText_foodUpkeep").innerHTML = food_upkeep;

    //WOOD
    document.getElementById("resText_wood").innerHTML = total_wood;

    //BUILDERS
    document.getElementById("resText_builders").innerHTML = total_builders;

    //SCIENTISTS
    document.getElementById("resText_scientists").innerHTML = total_scientists;

    //DAYS
    document.getElementById("text_days").innerHTML = total_days;
    document.getElementById("nextAttack").innerHTML = nextAttackCountdown;

    //WALL
    document.getElementById("wallStrength").innerHTML = wallStrength;
    document.getElementById("enemyStrength").innerHTML = enemyStrength;

    if(wallStrength >= enemyStrength){
        document.getElementById("wallStrength").style.color = "#2A363B";
        document.getElementById("enemyStrength").style.color = "#E84A5F";
    }else{
        document.getElementById("enemyStrength").style.color = "#2A363B";
        document.getElementById("wallStrength").style.color = "#E84A5F";
    }

    //BUILD PRICES
    document.getElementById("homesWoodCost").innerHTML = (buildingHomeTickLimit / buildingHomeTickPerWood) + " wood";
    document.getElementById("wallsWoodCost").innerHTML = (buildingWallTickLimit / buildingWallTickPerWood) + " wood";
}


var helpOn = false;

function helpToggle(){

    helpOn = !helpOn;

    if(helpOn){
        gameSpeed(99);
    }else{
        gameSpeed(0);
        explainationStep = 0;
    }
    
    document.getElementById("helpDiv").style.display = helpOn? "block" : "none";
}

let statsOn = false;

function statsToggle(){
    statsOn = !statsOn;

    updateStatsText();

    if(statsOn){
        gameSpeed(99);
    }else{
        gameSpeed(0);
    }

    document.getElementById("statsBox").style.display = statsOn? "block" : "none";
}