const setMultipleDivDisplay = (divNames, setTo) => {
    divNames.forEach(div => {
        document.getElementById(div).style.display = setTo ? "block" : "none";
    });
}

const removeFromHome = (villager) =>{
    audio_buttonPressUp.play();

   document.getElementById("villager_" + villager.id).remove();
}

const addMany = (whoArray, toWhere) => {
    whoArray.forEach(who => {
        add(who, toWhere);
    });
}

const add = (who, toWhere) => {
    
    if(who === undefined){
        return;
    }

    who.currentJob = toWhere;

    if(toWhere !== "home"){
        removeFromHome(who);
    }


    let newWorkingCow = document.createElement("div");
    newWorkingCow.className = "newWorker";
    newWorkingCow.insertAdjacentHTML('afterbegin', 
        `<p id='villagerName' class='villager${who.id}'>${who.name}</p>
        <div class="villagerEnergyDisplay">
            <div id="tempId" class="villagerEnergyDisplayFiller">
            </div>
        </div>`
    );
    newWorkingCow.id = "villager_" + who.id;

    document.getElementById(toWhere + 'JobDiv').appendChild(newWorkingCow);

    let fillerDiv = document.getElementById("tempId");
    fillerDiv.id = "energy_" + who.id;

    updateCurrentJobNumbers();
}

const removeMany = (whoArray) => {
    whoArray.forEach(who => {
        remove(who);
    });
}

const remove = (who) => {

    if(who === undefined){
        return;
    }

    who.currentJob = "home";
    document.getElementById("villager_" + who.id).remove();
    add(who, "home");

    updateCurrentJobNumbers();
}

const findVillagersWithJob = (jobToFind) => {
    let villagersWithJob = [];
    
    villagers.forEach(villager => {
        if(villager.currentJob === jobToFind && !villager.isFatigued){
            villagersWithJob.push(villager);
        }
    });

    return villagersWithJob;
}

const findWeakestVillager = (villagerArray) => {
    let weakestEnergy = 100;
    let newVillager = undefined;

    villagerArray.forEach(villager => {
        if(villager.energy < weakestEnergy){
            weakestEnergy = villager.energy;
            newVillager = villager;
        }
    });

    return newVillager;
}

const findStrongestVillager = (villagerArray) =>{
    let strongestEnergy = 0;
    let newVillager = undefined;

    villagerArray.forEach(villager => {
        if(villager.energy > strongestEnergy){
            strongestEnergy = villager.energy;
            newVillager = villager;
        }
    });

    return newVillager;
}

const updateCurrentJobNumbers = () => {

    total_atHome = 0;
    total_foragers = 0;
    total_collectors = 0;
    total_builders = 0;
    total_scientists = 0;

    villagers.forEach(villager => {
        switch(villager.currentJob){
            case "home":
                total_atHome++;
            break;
            case "food":
                total_foragers++;
            break;
            case "wood":
                total_collectors++;
            break;
            case "build":
                total_builders++;
            break;
            case "scientist":
                total_scientists++;
            break;
        }
    });
}
