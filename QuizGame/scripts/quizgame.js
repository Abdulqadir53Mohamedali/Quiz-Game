const jediQuestions = [
    {
    question: "Who was Obi-Wan's master?",
    answers:[
        {text:"Mace Windu",correct:false},
        {text:"Yoda",correct:false},
        {text:"Count Dooku",correct:false},
        {text:"Qui-Gon Jinn",correct: true},
    ]
},
{
    question: "In which Star Wars episode does Obi-Wan Kenobi first appear?",
    answers:[
        {text:"Episode I - The Phantom Menace",correct:false},
        {text:"Episode IV - A New Hope",correct:true},
        {text:"Episode V - The Empire Strikes Back",correct:false},
        {text:" Episode II - Attack of the Clones",correct: false},
    ]
},
{
    question: "Obi-Wan and Anakin dueled on?",
    answers:[
        {text:"Hoth",correct:false},
        {text:"Endor",correct:false},
        {text:"Mustafar",correct:true},
        {text:"Tatooine",correct: false },
    ]
},
{
    question: "Obi-Wan's line about the Force in 'A New Hope' is?",
    answers:[
        {text:"May the Force be with you",correct:false},
        {text:"Force is strong in this one",correct:false},
        {text:"Force will be with you, always",correct:true},
        {text:"You can't escape the Force.",correct: false},
    ]
},
{
    question: "On Kamino, Obi-Wan confronted?",
    answers:[
        {text:"Cad Bane",correct:false},
        {text:"Boba Fett",correct:false},
        {text:"Jango Fett",correct:true},
        {text:"Greedo",correct: false},
    ]
},
{
    question: "Obi-Wan battled which Sith in The Phantom Menace?",
    answers:[
        {text:"Vader",correct:false},
        {text:"Sidious",correct:false},
        {text:"Tyranus",correct:false},
        {text:"Maul",correct: true},
    ]
},
{
    question: "Obi-Wan's Death Star duel in A New Hope was with?",
    answers:[
        {text:"Tarkin",correct:false},
        {text:"Sidious",correct:false},
        {text:"Palpatine",correct:false},
        {text:"Vader",correct: true},
    ]
},
{
    question: "Obi-Wan's R2-D2 message was for?",
    answers:[
        {text:"Leia",correct:true},
        {text:"Padme",correct:false},
        {text:"Luke",correct:false},
        {text:"Han",correct: false},
    ]
},
{
    question: "On Utapau, Obi-Wan rode a?",
    answers:[
        {text:"Tauntaun",correct:false},
        {text:"Boga",correct:false},
        {text:"Womp Rat",correct:false},
        {text:"Rancor",correct: true},
    ]
},
{
    question: "Obi-Wan told Luke ___ was dead",
    answers:[
        {text:"he himself",correct:false},
        {text:"Palpatine",correct:false},
        {text:"Anakin",correct:true},
        {text:"Yoda",correct: false},
    ]
},

];
// Reference to the main question element
const holocronElement = document.getElementById("question");

// Reference to the container holding all the answer buttons
const forceButtons = document.getElementById("answer-buttons");

// Reference to the 'next' button
const hyperspaceButton = document.getElementById("next-btn");

// Variables to keep track of the current question index and the user's score
let currentHolocronIndex = 0;
let jediScore = 0;

/**
 * Initiate the Jedi training by setting initial values and loading the first question.
 */
async function initiateJediTraining() {
    currentHolocronIndex = 0;
    jediScore = 0;
    hyperspaceButton.innerHTML = "Next";
    await projectHolocron();
}

/**
 * Display the current question and its associated answer options to the user.
 */
async function projectHolocron() {
    clearForce();
    const currentHolocron = jediQuestions[currentHolocronIndex];
    const holocronOrder = currentHolocronIndex + 1;
    holocronElement.innerHTML = `${holocronOrder}. ${currentHolocron.question}`;

    // Create and display buttons for each answer option
    for (const forceOption of currentHolocron.answers) {
        const button = document.createElement("button");
        button.innerHTML = forceOption.text;
        button.classList.add("btn");
        if (forceOption.correct) {
            button.dataset.correct = forceOption.correct;
        }
        button.addEventListener("click", channelForce);
        forceButtons.appendChild(button);
    }
}

/**
 * Clear previous question and answer buttons and hide the 'next' button.
 */
function clearForce() {
    hyperspaceButton.style.display = "none";
    while (forceButtons.firstChild) {
        forceButtons.removeChild(forceButtons.firstChild);
    }
}

function channelForce(e) {
    // Get the clicked button
    const chosenPath = e.target;
    
    // Determine if the chosen answer is correct
    const followsTheLight = chosenPath.dataset.correct === "true";

    // Add a CSS class to visually indicate whether the answer was correct or incorrect
    if (followsTheLight) {
        chosenPath.classList.add("correct");
        jediScore++;
    } else {
        chosenPath.classList.add("incorrect");
    }

    // Disable all answer buttons after one is clicked
    Array.from(forceButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    // Show the "Next" button
    hyperspaceButton.style.display = "block";
}

/**
 * Function to display the user's score and a special message if they got all answers correct.
 */
function consultYoda() {
    clearForce();
    let forceMessage = `You channeled the Force ${jediScore} out of ${jediQuestions.length} times correctly.`;
    
    if (jediScore === jediQuestions.length) {
        forceMessage += " Truly powerful in the Force, you have become!";
    }
    holocronElement.innerHTML = forceMessage;

    // Update and display the button to start the quiz again
    hyperspaceButton.innerHTML = "Start Jedi Training";
    hyperspaceButton.style.display = "block";
}

/**
 * Function to move to the next question or display the results if all questions have been answered.
 */
function navigateHyperspace() {
    currentHolocronIndex++;

    if (currentHolocronIndex < jediQuestions.length) {
        projectHolocron();
    } else {
        consultYoda();
    }
}

// Event listener to handle "Next" button clicks
hyperspaceButton.addEventListener("click", () => {
    if (currentHolocronIndex < jediQuestions.length) {
        navigateHyperspace();
    } else {
        initiateJediTraining();
    }
});

// Start the quiz
initiateJediTraining();