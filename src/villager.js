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
    if(total_villagers >= highest_cow_count){
        highest_cow_count = total_villagers;
    }
}

const killVillager = (villager, displayText) =>{

    audio_villagerDeath.play();

    if(displayText){
        updateText(villager.name + " died");
    }
    
    villager.isDead = true;
    villager.currentJob = "dead";

    document.getElementById("villager_" + villager.id).remove();
    villagers.splice(villagers.indexOf(villager), 1);

    updateCurrentJobNumbers();

    if(villagers.length == 0){
        endGame();
        return;
    }
}

const drainVillagersEnergy = () => {

    if(villagers.length === 0){
        return;
    }

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
                    villager.energy += (villager_energy_gain / villager_fatigue_punishment);
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

const findAliveVillagers = () =>{
    let totalAlive = 0;
    villagers.forEach(villager => {
        if(!villager.isDead){
            totalAlive++;
        }
    });

    return totalAlive;
}