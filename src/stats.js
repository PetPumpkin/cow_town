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
var total_homes = 0;
var total_walls = 0;
var total_walls_destroyed = 0;

var total_mouse_clicks = 0;
var total_games = 0;

var highest_cow_count = 0;
var highest_food_count = 0;
var highest_wood_count = 0;

var total_upgrades = 0;




const saveData = () => {
    //document.cookie
}

/*
(function(){
   var myObject = JSON.parse('{"id":1,"gender":"male"}');
   var e = 'Thu Nov 26 2017 15:44:38'; document.cookie = 'myObj='+ JSON.stringify(myObject) +';expires=' + e;
})()
*/


const sendStatsToKong = () =>{
    kongregate.stats.submit("total_cows", total_cows);
    kongregate.stats.submit("total_food_collected", total_food_collected);
    kongregate.stats.submit("total_wood_collected", total_wood_collected);
    kongregate.stats.submit("survived", total_days);
}
