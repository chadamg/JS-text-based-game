//getting user input
var rl = require("readline");
var readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
//const prompt = require('prompt-sync')({ sigint: true });
//importing modules
var FCG = require("fantasy-content-generator");
var GameStep = require("./gamesteps.js");
var Dragon = require("./dragonclass.js");
var Weapon = require("./weaponclass.js");


//instances of weapon class
var weapon1 = new Weapon("" + FCG.MagicItems.generate().formattedData.title, 20);
var weapon2 = new Weapon("" + FCG.MagicItems.generate().formattedData.title, 70);
var place1 = FCG.Settlements.generate().establishments.formattedData.type;
var place2 = FCG.Settlements.generate().establishments.formattedData.type;
//instances of game steps class
var firstMessage = new GameStep("You are on a journey to " + FCG.Names.generate().name + ", after travelling for 3 weeks you've arrived at a village to stop for a nights sleep. The following morning you awake to someone knocking on your door, you open the door to find a stranger who passes you a scroll, would you like to read the message? (yes/no)");
var secondMessage = new GameStep("\"My name is " + FCG.Names.generate().name + " and I'm from " + FCG.Names.generate().name + ", we are under attack from dragons and have no one to help us. We need a brave hero to come and rescue us\" Would you like to accept this quest (yes/no) ");
var thirdMessage = new GameStep("That's very brave of you, to prepare for the quest you'll need a weapon, with the time you have you can only travel to one of these places to acquire one item to assist you in the battle against the mighty dragons. Would you like to go to the " + place1 + " for a " + weapon1.name + " or the " + place2 + " for a " + weapon2.name + "? (type '1' or '2') ");
var sixthMessage = new GameStep("That's correct! Are you ready to battle the dragon with your weapon (yes/no) ");
var seventhMessage = new GameStep("Would you like to battle a red, green or blue dragon?");
//instances of dragon class
var red = new Dragon(FCG.Names.generate().name + " the Dragon", 70);
var blue = new Dragon(FCG.Names.generate().name + " the Dragon", 60);
var green = new Dragon(FCG.Names.generate().name + " the Dragon", 75);
var steps: {[index: string]:any} = {
    start: {
        message: firstMessage.message,
        yes: "secondStep",
        no: function () {
            console.log("Bye then!");
            readline.close();
        }
    },
    end: {
        message: "do you want to play again?",
        yes: "start",
        no: function () {
            console.log("Bye then!");
            readline.close();
        }
    },
    secondStep: {
        message: secondMessage.message,
        yes: "thirdStep",
        no: function () {
            console.log("Bye then!");
            readline.close();
        }
    },
    thirdStep: {
        message: thirdMessage.message,
        one: "fourthStep",
        two: "fifthStep",
        no: function () {
            console.log("Bye then!");
            readline.close();
        }
    },
    fourthStep: {
        message: "You have travelled to the " + place1 + ". Please speak to the blacksmith to acquire the " + weapon1.name + " (yes) ",
        yes: "riddleOne"
    },
    riddleOne: {
        message: "Hello there stranger. Solve this riddle to acquire the weapon: I Am An Eye Set In A Blue Face. My Gaze Feeds The World. If I Go Blind So Does The World. Type '1' for: The Sun or Type '2' for the Moon",
        one: "sixthStep",
        two: "tryAgain"
    },
    fifthStep: {
        message: "You have travelled to the " + place2 + " of the land. Please speak to the blacksmith to acquire the " + weapon2.name + " (yes) ",
        yes: "riddleTwo"
    },
    riddleTwo: {
        message: "Hello there stranger. Solve this riddle to acquire the weapon: I cover cities and destroy mountains, I make men blind, yet help them see.. Type '1' for: Sand or Type '2' Water",
        one: "sixthStep",
        two: "tryAgain"
    },
    sixthStep: {
        message: sixthMessage.message,
        yes: "seventhStep",
        no: "areYouSure"
    },
    seventhStep: {
        message: seventhMessage.message,
        red: function () {
            red.fight(generateRandomNumber(40));
            newGame();
        },
        green: function () {
            green.fight(generateRandomNumber(40));
            newGame();
        },
        blue: function () {
            blue.fight(generateRandomNumber(40));
            newGame();
        }
    },
    areYouSure: {
        message: "Are you sure? (yes/no)",
        yes: function () {
            console.log("Oh, that's a shame, you've come so far! But goodbye!");
            readline.close();
        },
        no: "sixthStep"
    },
    tryAgain: {
        message: "Incorrect answer try again please: ",
        one: "sixthStep",
        two: "tryAgain"
    }
};
function newGame() {
    readline.question("would you like to play again? (yes/no) ", function (input: String) {
        if (input === "yes") {
            startGame();
        }
        else {
            console.log("okay bye");
            readline.close();
        }
    });
}
function startGame() {
    var currentStep = "start";
    function logStep() {
        var step = steps[currentStep];
        if (step) {
            readline.question((step.message || "") + " ", function (input: String) {
                handleAnswer(input);
            });
        }
    }
    function handleAnswer(answer: any) {
        var step;
        if (answer === "yes") {
            step = steps[currentStep].yes;
        }
        else if (answer === "red") {
            step = steps[currentStep].red;
        }
        else if (answer === "blue") {
            step = steps[currentStep].blue;
        }
        else if (answer === "green") {
            step = steps[currentStep].green;
        }
        else if (parseInt(answer) === 1) {
            step = steps[currentStep].one;
        }
        else if (parseInt(answer) === 2) {
            step = steps[currentStep].two;
        }
        else if (answer === "no") {
            step = steps[currentStep].no;
        }
        else {
            console.log("Invalid input! Please try again.");
            step = steps[currentStep];
        }
        if (typeof step === "function") {
            step();
            return;
        }
        if (typeof step === "string") {
            currentStep = step;
        }
        else {
            currentStep = currentStep;
        }
        logStep();
    }
    function isNumber(num: string) {
        var value = parseInt(num);
        return !isNaN(value);
    }
    console.clear();
    logStep();
}
function generateRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
}
startGame();
