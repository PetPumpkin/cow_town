
const explainationText = document.getElementById("helpExplaination");
var explainationStep = 0;
function nextExplain(){

    switch(explainationStep){
        case 0:
            explainationText.innerText = "the aim of the game is to survive and expand your town";
        break;
        case 1:
            explainationText.innerText = "to survive: keep your cows fed by having them forage. Click on the + under the food panel to send any available cows to forage for food. Click the - to send them home";
        break;
        case 2:
            explainationText.innerText = "food upkeep: take note of your required upkeep, each cow needs 5 food per day to survive";
        break;
        case 3:
            explainationText.innerText = "if you do not have enough food in stock at the end of the day, cows will die";
        break;
        case 4:
            explainationText.innerText = "under the name of each cow is a green energy bar, if this runs out, your cow will return home and not be able to work until they have fully rested";
        break;
        case 5:
            explainationText.innerText = "collect wood to build homes and walls";
        break;
        case 6:
            explainationText.innerText = "homes allow more cows to join the town. At the end of each day, providing there is space in your homes, a new cow will join your town";
        break;
        case 7:
            explainationText.innerText = "walls defend against the ongoing attacks from the outside world";
        break;
        case 8:
            explainationText.innerText = "each wall built will increase your 'wall strength'. Your wall strength must be higher than the enemy strength before the enemy attacks, otherwise it's game over";
        break;
        case 9:
            explainationText.innerText = "you can also send your cows to be scientist, these will unlock upgrades - these upgrades are forever!";
        break;
        case 10:
            explainationText.innerText = "now, go! Play and have fun, be sure to let me know in the comments what you think";
        break;
        case 11:
            explainationText.innerText = "that's all i got for you...";
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
            explainationText.innerText = "when moving cows you can also hold the SHIFT button to move all or hold ALT to move half of available cows";
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
        case 25:
        explainationText.innerText = "";
        break;
        case 26:
        explainationText.innerText = "...";
        break;
        case 27:
        explainationText.innerText = "alright.. you got me... a new update needs new content...";
        break;
        case 28:
        explainationText.innerText = "a question for you. Why do all cows wear bells?"
        break;
        case 29:
        explainationText.innerText = "because their horns don't work...";
        break;
        case 30:
        explainationText.innerText = "haha, haha, yes, that was a good one";
        break;
        case 31:
        explainationText.innerText = "still here? Alright let's see what else the internet has to offer...";
        break;
        case 32:
        explainationText.innerText = "how do cows do maths?"
        break;
        case 33:
        explainationText.innerText = "with a COW-culator";
        break;
        case 34:
        explainationText.innerText = "haha, haha, great stuff"
        break;
        case 35:
        explainationText.innerText = "alright you.. I've spoiled you enough"
        break;
        case 36:
        explainationText.innerText = "now get out there and play the game, the cows are waiting for you!"
        break;
        case 37:
        explainationText.innerText = "that's really it.. I'm not writing anymore";
        case 38:
        explainationText.innerText = "";
        break;
        case 39:
        explainationText.innerText = "";
        break;
        case 40:
        explainationText.innerText = ".";
        break;
        case 41:
        explainationText.innerText = "..";
        break;
        case 42:
        explainationText.innerText = "...";
        break;
        case 43:
        explainationText.innerText = "cows";
        break;
        case 44:
        explainationText.innerText = "cows are";
        break;
        case 45:
        explainationText.innerText = "cows are beautiful!";
        break;
    }

    explainationStep++;

}