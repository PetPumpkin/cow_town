var total_villagers = 2;
var total_homes = 1;

var total_food = 100000;
var food_upkeep = 0;
var villager_food_cost = 5;
var villager_food_generation = 1;
var villager_energy_decay = .3;
var villager_energy_gain = .7;
var villagers_per_home = 2;

var total_foragers = 0;

var total_wood = 10000;
var total_collectors = 0;

var total_builders = 0;
var total_atHome = 0;

var wallStrength = 0;
var wallLimit = 100;
var enemyStrength = 2;
var enemyLimit = 100;

var buildHomesNow = true;

var villager_food_generation = 1;
var villager_wood_generation = 1;

var timeOfDay = 0;
var total_days = 0;

var total_wood_collected = 0;
var total_food_collected = 0;
var total_cows = 0;

var nextAttackCountdown = 20;
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

    
   resourceIntervalId = setInterval(calculateResources, resourceCalculationTime);
    
    setMultipleDivDisplay(["gameDiv", "speedControlDiv"], true);
    setMultipleDivDisplay(["menuDiv", "startGameButton"], false);

    addVillager(40, false);
    buildHomes();
    gameSpeed(0);

    document.addEventListener('keydown', keypressHandler);
}



function gameRestart(){
    document.removeEventListener('keydown', keypressHandler);
    
    
    for (let i = villagers.length - 1; i >= 0; i--) {
        killVillager(villagers[i]);        
    }

    total_homes = 1;
    total_food = 0;
    total_wood = 0;
    total_wood_collected = 0;
    total_food_collected = 0;
    total_cows = 0;
    enemyStrength = 2.5;
    wallStrength = 0;
    buildingWallTickLimit = 1000;
    buildingHomeTickLimit = 1000;
    buildingWallTick = 0;
    buildingHomeTick = 0;
    nextAttackCountdown = 20;
    total_days = 0;
    timeOfDay = 0;

    clearInterval(resourceIntervalId);

    gameStart();
}

function keypressHandler(e){

    var key = e.code || e.key || e.which;

    if (key === '49' || key === 'Digit1' || key === "1") {
        gameSpeed(0);
    }else if(key === '50' || key === 'Digit2' || key === "2"){
        gameSpeed(1);

    }else if(key === '51' || key === 'Digit3' || key === "3"){
        gameSpeed(2);

    }else if(key === '32' || key === 'Space'){
        gameSpeed(99);

    }
}

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


function calculateResources(){

    dayCycle();
    //FOOD
    if(total_foragers > 0){
        foodTick++;
    }

    if(foodTick >= (foodTickLimit - (total_foragers / 2))){
        foodTick = 0;
        total_food += villager_food_generation * total_foragers;
        total_food_collected += villager_food_generation * total_foragers;
        audio_gotFood.play();
    }

    //WOOD
    if(total_collectors > 0){
        woodTick++;
    }

    if(woodTick >= (woodTickLimit - (total_collectors / 2))){
        woodTick = 0;
        total_wood += villager_wood_generation * total_collectors;
        total_wood_collected += villager_wood_generation * total_collectors
        audio_gotWood.play();
    }

    building();

    document.getElementById("buildingBarFiller").style.width = (((buildHomesNow ? buildingHomeTick : buildingWallTick) / (buildHomesNow ? buildingHomeTickLimit : buildingWallTickLimit)) * 100) + "%";

    drainVillagersEnergy();
    updateGameText();
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

            if(buildingHomeTick % buildingHomeTickPerWood == 0){
                total_wood -= buildingHomeTickWoodCost;
                audio_buildTick.play();
            }
        }

        if(buildingHomeTick > buildingHomeTickLimit){
            buildingHomeTick = 0;
            audio_buildingFinished.play();
            updateText("new home built");
            total_homes++;

            buildingHomeTickLimit += 500;
        }
    }
}


function buildingWalls(){
    if(total_builders > 0 && total_wood > 0){

        for (let i = 0; i < total_builders; i++) {

            buildingWallTick++;

            if(buildingWallTick % buildingWallTickPerWood == 0){
                total_wood -= buildingWallTickWoodCost;
                audio_buildTick.play();
            }         
        }

        if(buildingWallTick > buildingWallTickLimit){
            buildingWallTick = 0;
            audio_buildingFinished.play();
            updateText("walls reinforced");
            wallStrength += 5;

            buildingWallTickLimit += 500;
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

    kongregate.stats.submit("survived", total_days);

    total_food -= food_upkeep;

    if(total_food < 0){
        while(total_food < 0){
            total_food += villager_food_cost;
            
            killVillager(villagers[Math.floor((Math.random() * villagers.length - 1) + 1)]);

            if(villagers.length == 0){
                updateText("not enough food to feed everyone");
                endGame();
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
            buildingWallTickLimit -= (enemyStrength * 100)
            attacksSurvived++;

            updateText("walls held, enemy retreating");


            enemyStrength += attacksSurvived * 2;

            if(enemyStrength > enemyLimit){
                enemyStrength = enemyLimit;
            }

            nextAttackCountdown = 10;
        }
    }else{
        nextAttackCountdown--;
    }

}

function endGame(){
    audio_gameEnd.play();

    document.getElementById("speedControlDiv").style.display = "none";
    document.removeEventListener('keydown', keypressHandler);



    updateText("game over");

    gameSpeed(99);
    clearInterval(resourceIntervalId);

    kongregate.stats.submit("total_cows", total_cows);
    kongregate.stats.submit("total_food_collected", total_food_collected);
    kongregate.stats.submit("total_wood_collected", total_wood_collected);


}

function updateGameText(){ //and manage some resource math
    
    //VILLAGERS
    document.getElementById("resText_homes").innerHTML = total_homes;
    total_villagers = villagers.length;
    document.getElementById("resText_villagers").innerHTML = total_villagers;

    //FOOD
    document.getElementById("resText_food").innerHTML = total_food;

    food_upkeep = villager_food_cost * total_villagers;

    document.getElementById("resText_foodUpkeep").innerHTML = food_upkeep;

    //WOOD
    document.getElementById("resText_wood").innerHTML = total_wood;

    //BUILDERS
    document.getElementById("resText_builders").innerHTML = total_builders;

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

const explainationText = document.getElementById("helpExplaination");
var explainationStep = 0;
function nextExplain(){

    switch(explainationStep){
        case 0:
            explainationText.innerText = "the aim of the game is to survive and expand your town";
        break;
        case 1:
            explainationText.innerText = "to survive: keep your cows fed by having them forage. Click on the + under the food panel to send any available cows to forage for food";
        break;
        case 2:
            explainationText.innerText = "food upkeep: take note of your required upkeep, each cow needs 5 food per day to survive";
        break;
        case 3:
            explainationText.innerText = "if you do not have enough food in stock at the end of the day, cows will die";
        break;
        case 4:
            explainationText.innerText = "under the name of each cow is a green energy bar, if this runs out, your cow will die. Click on the - next to the cow to send them home to rest";
        break;
        case 5:
            explainationText.innerText = "collect wood to build homes and walls";
        break;
        case 6:
            explainationText.innerText = "homes allow more cows to join the town. Each home can hold two cows. At the end of each day, providing there are enough homes, a new cow will join your town";
        break;
        case 7:
            explainationText.innerText = "walls defend against the ongoing attacks from the outside world";
        break;
        case 8:
            explainationText.innerText = "each wall built will increase your 'wall strength' by 5%. Your wall strength must be higher than the enemy strength before the enemy attacks, otherwise it's game over";
        break;
        case 9:
            explainationText.innerText = "now go play!";
        break;
        case 10:
            explainationText.innerText = "no really, I got nothing more for you";
        break;
        case 11:
            explainationText.innerText = "";
        break;
        case 12:
            explainationText.innerText = "";
        break;
        case 13:
            explainationText.innerText = "...";
        break;
        case 14:
            explainationText.innerText = "persistent one aren't you...";
            break;
        case 15:
            explainationText.innerText = "alright then..";
        break;
        case 16:
            explainationText.innerText = "you can use the keyboard keys 1, 2, 3 to change the game speed and spacebar to pause the game";
        break;
        case 17:
            explainationText.innerText = "more cows = more productivity";
        break;
        case 18:
            explainationText.innerText = "I really like cows :)";
        break;
        case 19:
            explainationText.innerText = "did you know that cows chew for up to 8 hours a day?";
        break;
        case 20:
            explainationText.innerText = "something fascinating, cows are very social creatures and don't like to be alone";
            break;
        case 21:
            explainationText.innerText = "cows can sleep while standing, isn't that cool!?";
        break;
        case 22:
            explainationText.innerText = "alright.. I'm getting tired of writing now..";
        break;
        case 23:
            explainationText.innerText = "okay go play the game, give it a go";
        break;
        case 24:
            explainationText.innerText = "you got this, I believe in you!";
        break;
    }

    explainationStep++;

}