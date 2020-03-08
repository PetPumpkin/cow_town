
const addToJob = (e, job) => {
    if(e.shiftKey){
        addManyWithDelay(findVillagersWithJob("home"), job);
    }else if(e.altKey){
        addManyWithDelay(findHalfVillagersWithJob("home"), job);
    }else{
        add(findStrongestVillager(findVillagersWithJob("home")), job);
    }
}

const removeFromJob = (e, job) => {
    if(e.shiftKey){
        removeManyWithDelay(findVillagersWithJob(job));
    }else if(e.altKey){
        removeManyWithDelay(findHalfVillagersWithJob(job));
    }else{
        remove(findWeakestVillager(findVillagersWithJob(job)));
    }
}

document.getElementById("add_foodForagers").addEventListener("click", function(e){
    addToJob(e, "food");
});


document.getElementById("remove_foodForagers").addEventListener("click", function(e){
    removeFromJob(e, "food");
});


document.getElementById("add_woodCollectors").addEventListener("click", function(e){
    addToJob(e, "wood");
});
document.getElementById("remove_woodCollectors").addEventListener("click", function(e){
    removeFromJob(e, "wood");
});

document.getElementById("add_builders").addEventListener("click", function(e){
    addToJob(e, "build");
});

document.getElementById("remove_builders").addEventListener("click", function(e){
    removeFromJob(e, "build");
}); 

document.getElementById("add_scientist").addEventListener("click", function(e){

    if(total_scientists >= scientistLimit){
        return;
    }
    addToJob(e, "scientist");
});
document.getElementById("remove_scientist").addEventListener("click", function(e){
    removeFromJob(e, "scientist");
}); 

document.getElementById("build_homes").addEventListener("click", function(){
    buildHomes();
})

document.getElementById("build_walls").addEventListener("click", function(){
    buildWalls();
})

function keypressHandler(e){

    var key = e.code || e.key || e.which;

    //console.log(e.code + " " + e.key + " " + e.which);

    e.preventDefault();

    if (key === '49' || key === 'Digit1' || key === "1") {
        gameSpeed(0);
    }else if(key === '50' || key === 'Digit2' || key === "2"){
        gameSpeed(1);
    }else if(key === '51' || key === 'Digit3' || key === "3"){
        gameSpeed(2);
    }else if(key === '32' || key === 'Space'){
        gameSpeed(99);
    }else if(key === "KeyQ" || key === "q" || key === "81"){
        addToJob(e, "food");
    }else if(key === "KeyW" || key === " w" || key === "87"){
        addToJob(e, "wood");
    }else if(key === "KeyE" || key === "e" || key === "69"){
        addToJob(e, "build");
    }else if(key === "KeyR" || key === "r" || key === "82"){
        addToJob(e, "scientist");
    }else if(key === "KeyA" || key === "a" || key === "65"){
        removeFromJob(e, "food");
    }else if(key === "KeyS" || key === "s" || key === "83"){
        removeFromJob(e, "wood");
    }else if(key === "KeyD" || key === "d" || key === "68"){
        removeFromJob(e, "build");
    }else if(key === "KeyF" || key === "f" || key === "70"){
        removeFromJob(e, "scientist");
    }else if(key === "KeyZ" || key === "z" || key === "90"){
        buildHomes();
    }else if(key === "KeyX" || key === "x" || key === "88"){
        buildWalls();
    }
}