function Villager(){

    this.name = nameList[Math.floor((Math.random() * nameList.length - 1) + 1)];
    this.energy = 100;

    this.id = ids;
    ids++;

    this.isWorking = false;
    this.isDead = false;
    this.isFatigued = false;

    this.currentJob = "home";
}

const addVillager = (howMany, displayPrompt) =>{
    
    for (let i = 0; i < howMany; i++) {
        villagers.push(new Villager());
        add(villagers[villagers.length - 1], "home");
        if(displayPrompt){
            updateText(villagers[villagers.length - 1].name + " joined the town");
        }
    }

    total_cows += howMany;
}

const killVillager = (villager) =>{
    audio_villagerDeath.play();

    updateText(villager.name + " died");
    
    villager.isDead = true;

    if(villager.currentJob !== "home"){
        remove(villager);
    }else{
        document.getElementById("villager_" + villager.id).remove();
    }

    villagers.splice(villagers.indexOf(villager), 1); 

    if(villagers.length == 0){
        endGame();
        return;
    }
}

const drainVillagersEnergy = () => {
    villagers.forEach(villager => {
        if(villager.currentJob !== "home"){
            if(villager.energy <= 0){
                villagerEnergyDrained(villager);
            }else{
                villager.energy -= villager_energy_decay;

                if(villager.energy <= 20){
                    document.getElementsByClassName("villager" + villager.id)[0].style.background = "#FF847C";
                    document.getElementById("energy_" + villager.id).style.background = "#E84A5F";
                }else{
                    document.getElementById("energy_" + villager.id).style.background = "#99B898";
                }
            }
        }else{
            if(villager.energy < 100){
                if(villager.isFatigued){
                    villager.energy += (villager_energy_gain / 3);
                }else{
                    villager.energy += villager_energy_gain;
                }
            }else{
                villager.isFatigued = false;
                document.getElementById("energy_" + villager.id).style.background = "#99B898";
            }
        }

        if(document.getElementById("energy_" + villager.id) != null){
            document.getElementById("energy_" + villager.id).style.width = villager.energy + "%";
        };
    });
}

const villagerEnergyDrained = (who) =>{
    remove(who);
    who.isFatigued = true;
    document.getElementById("energy_" + who.id).style.background = "#E84A5F";
}

/*
function chooseAvailableVillager(){
    let potentialVillagers = [];
    let newVillager = undefined;

    villagers.forEach(villager => {
        if(!villager.isWorking){
            potentialVillagers.push(villager);
        }
    });

    let currentHighest = 0;

    potentialVillagers.forEach(villager => {
        if(villager.energy > currentHighest){
            currentHighest = villager.energy;
            newVillager = villager;
        }
    });

    if(potentialVillagers.length > 0){
        
        return newVillager;
    }else{
        return undefined;
    }
}
*/
/*
chooseAvailableVillager = (strongest) =>{ //if strongest is true, find villager with most energy, otherwise find weakest
    let potentialVillagers = [];
    let newVillager = undefined;

    villagers.forEach(villager => {
        if(!villager.currentJob === "home"){
            potentialVillagers.push(villager);
        }
    });

    if(strongest){
        let currentHighest = 0;


        potentialVillagers.forEach(villager => {
            if(villager.energy > currentHighest){
                currentHighest = villager.energy;
                newVillager = villager;
            }
        });
    }else{
        let currentHighest = 100;

        potentialVillagers.forEach(villager => {
            if(villager.energy < currentHighest){
                currentHighest = villager.energy;
                newVillager = villager;
            }
        });
    }

    if(potentialVillagers.length > 0){
        
        return newVillager;
    }else{
        return undefined;
    }
}

function returnHome(villagerToGoHome){
    audio_buttonPressDown.play();
    
    villagerToGoHome.currentJob = "home";

    let newAtHome = document.createElement("div");
    newAtHome.className = "newAtHome";
    newAtHome.insertAdjacentHTML('afterbegin', villagerToGoHome.name + '<div class="villagerHomeEnergyDisplay"><div id="tempId" class="villagerHomeEnergyDisplayFiller"></div></div>');
    newAtHome.id = "villager_" + villagerToGoHome.id;

    document.getElementById('atHomeDiv').appendChild(newAtHome);

    let fillerDiv = document.getElementById("tempId");
    fillerDiv.id = "energy_" + villagerToGoHome.id;
}
*/



//Proper Event Listers This Time



//LETS MAKE A BETTER ADD / REMOVAL SYSTEM


/*
function addVillagerRemoveButton(villagerId, jobNum){
    let newButton = document.getElementById("removeVillagerButton");
    newButton.id = "remove_" + villagerId.id;
    
    document.getElementById("remove_" + villagerId.id).addEventListener("click", function(){
        
        function findVillager(villager){
            return villager.id === villagerId.id;
        }

        villagers.find(findVillager).isWorking = false;


        document.getElementById("villager_" + villagerId.id).remove();

        switch(jobNum){
            case 0:
                total_foragers--;
                break;
            case 1:
                total_collectors--;
                break;
            case 2:
                total_builders--;
                break;
        }

        if(!villagerId.isDead){
            returnHome(villagerId);
        }
    });
}


function addFoodForager(){

    let chosenVillager = chooseAvailableVillager();
    
    if(chosenVillager === undefined){
        return;
    }

    chosenVillager.isWorking = true;
    total_foragers++;

    removeFromHome(chosenVillager);

    let newForager = document.createElement("div");
    newForager.className = "newForager";
    newForager.insertAdjacentHTML('afterbegin', `<p id='villagerName'>${chosenVillager.name}</p>` + '<button id="removeVillagerButton" class="removeVillagerButton">-</button><div class="villagerEnergyDisplay"><div id="tempId" class="villagerEnergyDisplayFiller"></div></div>');
    newForager.id = "villager_" + chosenVillager.id;

    document.getElementById('foodForagersDiv').appendChild(newForager);

    let fillerDiv = document.getElementById("tempId");
    fillerDiv.id = "energy_" + chosenVillager.id;

    addVillagerRemoveButton(chosenVillager, 0);
}

function addWoodCollector(){
    let chosenVillager = chooseAvailableVillager();
    
    if(chosenVillager === undefined){
        return;
    }

    chosenVillager.isWorking = true;
    total_collectors++;

    removeFromHome(chosenVillager);

    let newCollector = document.createElement("div");
    newCollector.className = "newCollector";
    newCollector.insertAdjacentHTML('afterbegin', `<p id='villagerName'>${chosenVillager.name}</p>` + '<button id="removeVillagerButton" class="removeVillagerButton">-</button><div class="villagerEnergyDisplay"><div id="tempId" class="villagerEnergyDisplayFiller"></div></div>');
    newCollector.id = "villager_" + chosenVillager.id;

    document.getElementById('woodCollectorsDiv').appendChild(newCollector);

    let fillerDiv = document.getElementById("tempId");
    fillerDiv.id = "energy_" + chosenVillager.id;

    addVillagerRemoveButton(chosenVillager, 1);
}

function addBuilder(){
    let chosenVillager = chooseAvailableVillager();
    
    if(chosenVillager === undefined){
        return;
    }

    chosenVillager.isWorking = true;
    total_builders++;

    removeFromHome(chosenVillager);

    let newBuilder = document.createElement("div");
    newBuilder.className = "newBuilder";
    newBuilder.insertAdjacentHTML('afterbegin', `<p id='villagerName'>${chosenVillager.name}</p>` + '<button id="removeVillagerButton" class="removeVillagerButton">-</button><div class="villagerEnergyDisplay"><div id="tempId" class="villagerEnergyDisplayFiller"></div></div>');
    newBuilder.id = "villager_" + chosenVillager.id;

    document.getElementById('buildersDiv').appendChild(newBuilder);

    let fillerDiv = document.getElementById("tempId");
    fillerDiv.id = "energy_" + chosenVillager.id;

    addVillagerRemoveButton(chosenVillager, 2);
}
*/

