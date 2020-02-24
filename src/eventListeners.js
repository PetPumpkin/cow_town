document.getElementById("add_foodForagers").addEventListener("click", function(e){
    if(e.shiftKey){
        addMany(findVillagersWithJob("home"), "food");
    }else{
        add(findStrongestVillager(findVillagersWithJob("home")), "food");
    }
});

document.getElementById("remove_foodForagers").addEventListener("click", function(e){
    if(e.shiftKey){
        removeMany(findVillagersWithJob("food"));
    }else{
        remove(findWeakestVillager(findVillagersWithJob("food")));
    }
});


document.getElementById("add_woodCollectors").addEventListener("click", function(e){
    if(e.shiftKey){
        addMany(findVillagersWithJob("home"), "wood");
    }else{
        add(findStrongestVillager(findVillagersWithJob("home")), "wood");
    }
});
document.getElementById("remove_woodCollectors").addEventListener("click", function(e){
    if(e.shiftKey){
        removeMany(findVillagersWithJob("wood"));
    }else{
        remove(findWeakestVillager(findVillagersWithJob("wood")));
    }
});

document.getElementById("add_builders").addEventListener("click", function(e){
    if(e.shiftKey){
        addMany(findVillagersWithJob("home"), "build");
    }else{
        add(findStrongestVillager(findVillagersWithJob("home")), "build");

    }
});
document.getElementById("remove_builders").addEventListener("click", function(e){
    if(e.shiftKey){
        removeMany(findVillagersWithJob("build"));
    }else{
        remove(findWeakestVillager(findVillagersWithJob("build")));
    }
}); 

document.getElementById("add_scientist").addEventListener("click", function(e){

    if(total_scientists >= scientistLimit){
        return;
    }
    if(e.shiftKey){
        addMany(findVillagersWithJob("home"), "scientist");
    }else{
        add(findStrongestVillager(findVillagersWithJob("home")), "scientist");

    }
});
document.getElementById("remove_scientist").addEventListener("click", function(e){
    if(e.shiftKey){
        removeMany(findVillagersWithJob("scientist"));
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