//here everything will be saved (and maybe later sent to the servers)

let upgradesComplete = false;
let scientistLimit = 1;
let chanceForDoubleWood = 0; 
let chanceForDoubleFood = 0; 

var total_wood_collected = 0;
var total_wood_used = 0;
var total_food_collected = 0;
var total_food_eaten = 0;
var total_cows = 0;
var total_days = 0;
var total_attacks_survived = 0;
var total_homes_built = 0;
var total_walls_built = 0;
var total_walls_destroyed = 0;

var total_mouse_clicks = 0;
var total_games_played = 0;

var highest_cow_count = 0;
var highest_food_count = 0;
var highest_wood_count = 0;

var total_upgrades = 0;

let statsToSave = {
    _upgradesComplete: upgradesComplete,
    _chanceForDoubleWood: chanceForDoubleWood,
    _chanceForDoubleFood: chanceForDoubleFood,
    _wallStrengthIncreaseAmount: wallStrengthIncreaseAmount,
    _villagerEnergyGain: villager_energy_gain,
    _villagerEnergyDecay: villager_energy_decay,
    _villagerFatiguePunishment: villager_fatigue_punishment,
    _homeCapacity: villagers_per_home,
    _scientistLimit: scientistLimit,
    _nextAttackCooldownBonus: nextAttackCountdownBonus,
    _totalWoodCollected: total_wood_collected,
    _totalWoodUsed: total_wood_used,
    _totalFoodCollected: total_food_collected,
    _totalFoodEaten: total_food_eaten,
    _totalCows: total_cows,
    _totalDays: total_days,
    _totalAttacksSurvived: total_attacks_survived,
    _totalHomesBuilt: total_homes_built,
    _totalWallsBuilt: total_walls_built,
    _totalWallsDestroyed: total_walls_destroyed,
    _totalMouseClicks: total_mouse_clicks,
    _totalGames: total_games_played,
    _totalUpgrades: total_upgrades,
    _highestCowCount: highest_cow_count,
    _highestFoodCount: highest_food_count,
    _highestWoodCount: highest_wood_count
}


const saveData = () => {
    statsToSave._upgradesComplete = upgradesComplete;
    statsToSave._chanceForDoubleWood = chanceForDoubleWood;
    statsToSave._chanceForDoubleFood = chanceForDoubleFood;
    statsToSave._wallStrengthIncreaseAmount = wallStrengthIncreaseAmount,
    statsToSave._villagerEnergyGain = villager_energy_gain,
    statsToSave._villagerEnergyDecay = villager_energy_decay,
    statsToSave._villagerFatiguePunishment = villager_fatigue_punishment,
    statsToSave._homeCapacity = villagers_per_home,
    statsToSave._scientistLimit = scientistLimit,
    statsToSave._nextAttackCooldownBonus = nextAttackCountdownBonus,
    statsToSave._totalWoodCollected = total_wood_collected;
    statsToSave._totalWoodUsed = total_wood_used;
    statsToSave._totalFoodCollected = total_food_collected;
    statsToSave._totalFoodEaten = total_food_eaten;
    statsToSave._totalCows = total_cows;
    statsToSave._totalDays = total_days;
    statsToSave._totalAttacksSurvived = total_attacks_survived;
    statsToSave._totalHomesBuilt = total_homes_built;
    statsToSave._totalWallsBuilt = total_walls_built;
    statsToSave._totalWallsDestroyed = total_walls_destroyed;
    statsToSave._totalMouseClicks = total_mouse_clicks;
    statsToSave._totalGames = total_games_played;
    statsToSave._totalUpgrades = total_upgrades;
    statsToSave._highestCowCount = highest_cow_count;
    statsToSave._highestFoodCount = highest_food_count;
    statsToSave._highestWoodCount = highest_wood_count;
}

const updateStatsText = () =>{
    document.getElementById("totalGamesPlayed").innerText = statsToSave._totalGames;
    document.getElementById("totalDaysSurvived").innerText = statsToSave._totalDays;
    document.getElementById("totalAttacksSurvived").innerText = statsToSave._totalAttacksSurvived;
    document.getElementById("totalCows").innerText = statsToSave._totalCows;
    document.getElementById("highestCows").innerText = statsToSave._highestCowCount;
    document.getElementById("totalFoodCollected").innerText = statsToSave._totalFoodCollected;
    document.getElementById("highestFoodCount").innerText = statsToSave._highestFoodCount;
    document.getElementById("totalWoodCollected").innerText = statsToSave._totalWoodCollected;
    document.getElementById("highestWoodCount").innerText = statsToSave._highestWoodCount;
    document.getElementById("totalHomesBuilt").innerText = statsToSave._totalHomesBuilt;
    document.getElementById("totalWallsBuilt").innerText = statsToSave._totalWallsBuilt;
}


const loadCookie = () => {
    let cookieString = document.cookie;

    if(cookieString === ""){
        console.log("emptyCookie");
        return;
    }
    console.log(cookieString);
    var n = cookieString.lastIndexOf("=");

    cookieString = cookieString.substr(n + 1); //cut off the "saveData=" part of the cookie and parse the rest
    statsToSave = JSON.parse(cookieString);

    updateStatsText();
}


const saveCookie = () => {
    console.log("saving");
    saveData();

    document.cookie = "saveData=" + JSON.stringify(statsToSave) + "; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/";
}
loadCookie();

setInterval(saveCookie, 1000);


const sendStatsToKong = () =>{
    kongregate.stats.submit("total_cows", total_cows);
    kongregate.stats.submit("total_food_collected", total_food_collected);
    kongregate.stats.submit("total_wood_collected", total_wood_collected);
    kongregate.stats.submit("survived", total_days);
}

