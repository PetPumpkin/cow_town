document.getElementById("add_foodForagers").addEventListener("click", function(e){
    if(e.shiftKey){
        addManyWithDelay(findVillagersWithJob("home"), "food");
    }else if(e.ctrlKey){
        addManyWithDelay(findHalfVillagersWithJob("home"), "food");
    }else{
        add(findStrongestVillager(findVillagersWithJob("home")), "food");
    }
});

document.getElementById("remove_foodForagers").addEventListener("click", function(e){
    if(e.shiftKey){
        removeManyWithDelay(findVillagersWithJob("food"));
    }else if(e.ctrlKey){
        removeManyWithDelay(findHalfVillagersWithJob("food"));
    }else{
        remove(findWeakestVillager(findVillagersWithJob("food")));
    }
});


document.getElementById("add_woodCollectors").addEventListener("click", function(e){
    if(e.shiftKey){
        addManyWithDelay(findVillagersWithJob("home"), "wood");
    }else if(e.ctrlKey){
        addManyWithDelay(findHalfVillagersWithJob("home"), "wood");
    }else{
        add(findStrongestVillager(findVillagersWithJob("home")), "wood");
    }
});
document.getElementById("remove_woodCollectors").addEventListener("click", function(e){
    if(e.shiftKey){
        removeManyWithDelay(findVillagersWithJob("wood"));
    }else if(e.ctrlKey){
        removeManyWithDelay(findHalfVillagersWithJob("wood"))
    }else{
        remove(findWeakestVillager(findVillagersWithJob("wood")));
    }
});

document.getElementById("add_builders").addEventListener("click", function(e){
    if(e.shiftKey){
        addManyWithDelay(findVillagersWithJob("home"), "build");
    }else if(e.ctrlKey){
        addManyWithDelay(findHalfVillagersWithJob("home"), "build");
    }else{
        add(findStrongestVillager(findVillagersWithJob("home")), "build");

    }
});

document.getElementById("remove_builders").addEventListener("click", function(e){
    if(e.shiftKey){
        removeManyWithDelay(findVillagersWithJob("build"));
    }else if(e.ctrlKey){
        removeManyWithDelay(findHalfVillagersWithJob("build"));
    }else{
        remove(findWeakestVillager(findVillagersWithJob("build")));
    }
}); 

document.getElementById("add_scientist").addEventListener("click", function(e){

    if(total_scientists >= scientistLimit){
        return;
    }
    if(e.shiftKey){
        addManyWithDelay(findVillagersWithJob("home"), "scientist");
    }else if(e.ctrlKey){
        addManyWithDelay(findHalfVillagersWithJob("home"), "scientist");
    }else{
        add(findStrongestVillager(findVillagersWithJob("home")), "scientist");

    }
});
document.getElementById("remove_scientist").addEventListener("click", function(e){
    if(e.shiftKey){
        removeManyWithDelay(findVillagersWithJob("scientist"));
    }else if(e.ctrlKey){
        removeManyWithDelay(findHalfVillagersWithJob("scientist"));
    }else{
        remove(findWeakestVillager(findVillagersWithJob("scientist")));
    }
}); 

document.getElementById("build_homes").addEventListener("click", function(){
    buildHomes();
})

document.getElementById("build_walls").addEventListener("click", function(){
    buildWalls();
})