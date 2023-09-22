const questions = [
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
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0 ;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";

}


function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz()