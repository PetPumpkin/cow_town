const setMultipleDivDisplay = (divNames, setTo) => {
    divNames.forEach(div => {
        document.getElementById(div).style.display = setTo ? "block" : "none";
    });
}

const sortCowsAtJob = (job) =>{
    
    let cowsAtJob = findVillagersWithJob(job);

    if(job === "home"){
        cowsAtJob.sort((a, b) => parseFloat(a.energy) - parseFloat(b.energy));

    }else{
        cowsAtJob.sort((a, b) => parseFloat(b.energy) - parseFloat(a.energy));
    }


    let cowDivs = [];

    cowsAtJob.forEach(cow => {
        cowDivs.push(document.getElementById("villager_" + cow.id));
    });

    for (let i = 0; i < cowDivs.length; i++) {
        document.getElementById(job + "JobHook").after(cowDivs[i]);
    }
}

const removeFromHome = (villager) =>{
    document.getElementById("villager_" + villager.id).remove();
}

const addMany = (whoArray, toWhere) => {
    whoArray.forEach(who => {
        add(who, toWhere);
    });
}

const addManyWithDelay = (whoArray, toWhere) => {
        setTimeout(function () {
            if(whoArray.length === 0){
                return;
            }
            add(whoArray[0], toWhere);
            whoArray.shift();
            addManyWithDelay(whoArray, toWhere);
        }, 100);
}

const removeManyWithDelay = (whoArray) => {
    setTimeout(function () {
        if(whoArray.length === 0){
            return;
        }
        remove(whoArray[0]);
        whoArray.shift();
        
        removeManyWithDelay(whoArray);
    }, 100);
}

const add = (who, toWhere) => {
    
    if(gamePaused){
        return;
    }
    
    if(who === undefined){
        return;
    }

    if(who.isDead){
        return;
    }

    if(toWhere === "scientist" && total_scientists === scientistLimit){
        return;
    }

    who.currentJob = toWhere;

    if(toWhere !== "home"){
        audio_buttonPressUp.play();
        removeFromHome(who);
    }

    let newWorkingCow = document.createElement("div");
    newWorkingCow.className = "newWorker";
    newWorkingCow.insertAdjacentHTML("afterbegin", 
    `<p id='villagerName' class='villager${who.id}'>${who.name}</p>
    <div class="villagerEnergyDisplay">
        <div id="tempId" class="villagerEnergyDisplayFiller">
        </div>
    </div>`);
    newWorkingCow.id = "villager_" + who.id;

    document.getElementById(toWhere + 'JobDiv').appendChild(newWorkingCow);

    let fillerDiv = document.getElementById("tempId");
    fillerDiv.id = "energy_" + who.id;

    updateCurrentJobNumbers();

    sortCowsAtJob(toWhere);
}


const removeMany = (whoArray) => {
    whoArray.forEach(who => {
        remove(who);
    });
}

const remove = (who) => {

    if(gamePaused){
        return;
    }
    
    if(who === undefined){
        return;
    }

    if(who.isDead){
        return;
    }

    who.currentJob = "home";

    audio_buttonPressDown.play();
    
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

const findHalfVillagersWithJob = (jobToFind) => {
    let villagersWithJob = findVillagersWithJob(jobToFind);

    for (let i = 0; i < villagersWithJob.length; i++) {
        if(i % 2 === 0){
            villagersWithJob.splice(i, 1);
        }        
    }

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
