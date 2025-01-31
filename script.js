const questions = [
  {
    "question": "What is the capital of France?",
    "options": ["Madrid", "Paris", "Berlin", "Rome"],
    "answer": "Paris"
  },
  {
    "question": "Who wrote 'To Kill a Mockingbird'?",
    "options": ["Mark Twain", "Ernest Hemingway", "Harper Lee", "J.K. Rowling"],
    "answer": "Harper Lee"
  },
  {
    "question": "What is the largest planet in our solar system?",
    "options": ["Mars", "Saturn", "Jupiter", "Earth"],
    "answer": "Jupiter"
  },
  {
    "question": "In which year did the Titanic sink?",
    "options": ["1920", "1912", "1905", "1898"],
    "answer": "1912"
  },
  {
    "question": "What is the chemical symbol for Gold?",
    "options": ["Ag", "Pb", "Au", "Pt"],
    "answer": "Au"
  },
  {
    "question": "Who painted the Mona Lisa?",
    "options": ["Leonardo da Vinci", "Vincent van Gogh", "Michelangelo", "Pablo Picasso"],
    "answer": "Leonardo da Vinci"
  },
  {
    "question": "What is the smallest country in the world?",
    "options": ["Monaco", "San Marino", "Liechtenstein", "Vatican City"],
    "answer": "Vatican City"
  },
  {
    "question": "Which organ is responsible for pumping blood throughout the human body?",
    "options": ["Liver", "Heart", "Kidneys", "Lungs"],
    "answer": "Heart"
  },
  {
    "question": "What is the square root of 64?",
    "options": ["7", "9", "8", "6"],
    "answer": "8"
  },
  {
    "question": "Who discovered penicillin?",
    "options": ["Isaac Newton", "Louis Pasteur", "Alexander Fleming", "Marie Curie"],
    "answer": "Alexander Fleming"
  },
  {
    "question": "What is the capital of Japan?",
    "options": ["Osaka", "Tokyo", "Nagoya", "Kyoto"],
    "answer": "Tokyo"
  },
  {
    "question": "In which year did World War II end?",
    "options": ["1939", "1941", "1947", "1945"],
    "answer": "1945"
  },
  {
    "question": "What is the main ingredient in guacamole?",
    "options": ["Cucumber", "Avocado", "Tomato", "Onion"],
    "answer": "Avocado"
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "options": ["Venus", "Mercury", "Mars", "Saturn"],
    "answer": "Mars"
  },
  {
    "question": "What is the hardest natural substance on Earth?",
    "options": ["Gold", "Iron", "Diamond", "Granite"],
    "answer": "Diamond"
  },
  {
    "question": "Who is known as the 'Father of Computers'?",
    "options": ["Steve Jobs", "Bill Gates", "Alan Turing", "Charles Babbage"],
    "answer": "Charles Babbage"
  },
  {
    "question": "What is the largest ocean on Earth?",
    "options": ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"],
    "answer": "Pacific Ocean"
  },
  {
    "question": "Who wrote 'Pride and Prejudice'?",
    "options": ["Charlotte Brontë", "Jane Austen", "George Eliot", "Emily Dickinson"],
    "answer": "Jane Austen"
  },
  {
    "question": "What is the chemical formula for water?",
    "options": ["CO2", "H2", "H2O", "O2"],
    "answer": "H2O"
  },
  {
    "question": "Which element has the atomic number 1?",
    "options": ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    "answer": "Hydrogen"
  }
];

let correct = 0;
let incorrect = 0;
let questionNo = 0;
let points = 0; 
let answer = "";
let selected = "";
let currentAudio = null; 

const optionElements = document.querySelectorAll(".option");
const result = document.querySelector('.result');
const submit = document.getElementById("SubmitBtn");
const answerBox = document.querySelector('.answerBox');
const heading = document.getElementById('heading');
const questionElement = document.getElementById("question");
let quizNumber =  document.getElementsByClassName ('quizNumber')[0];
let say = document.getElementsByClassName('say')[0];

// Hide result initially
result.style.display = 'none';
say.style.display = 'none';
// Function to load a question
function loadQuestion() {
    if (questionNo < 3) {
        let currentQuestion = questions[questionNo];
        // Set question and answer
        questionElement.innerHTML = currentQuestion.question;
        answer = currentQuestion.answer;
        quizNumber.innerHTML = `Quiz ${questionNo + 1}`;

        console.log(answer);

        // Set options
        optionElements.forEach((option, index) => {
            option.innerHTML = currentQuestion.options[index];
            option.classList.remove("selected"); // Reset selection
        });

        selected = ""; // Reset selected answer
        questionNo++; // Move to the next question
        
    } else {
        endQuiz();
    }
}

// Function to handle option selection
optionElements.forEach(option => {
   
    option.addEventListener('click', (e) => {
        say.style.display = 'none';
        optionElements.forEach(opt => {
        opt.classList.remove("selected")
        opt.style.pointerEvents = 'auto'});
        e.target.classList.add("selected");
        e.target.style.pointerEvents = 'none';
        selected = e.target.innerHTML;
    });
});

// Function to check the answer
function checkAnswer() {
    if (selected === answer) {
        points++;
        correct++;
    } else {;
        points--;
        incorrect++;
    }
}

// Function to handle submit button click
function handleSubmit() {
  let submitAudio = new Audio('audio/submit.mp3');
  submitAudio.volume = 0.5;
  submitAudio.play();
    if (!selected) {
        say.style.display = 'block';
        say.innerHTML = "Please select an answer before submitting";
        return;
    }
    checkAnswer();
    loadQuestion();
}

// Function to end the quiz
function endQuiz() {
    heading.innerHTML = "Quizly";
    questionElement.innerHTML = "Your Points";
    answerBox.style.display = "none";
    result.style.display = 'flex';
    submit.innerHTML = 'Restart';
    say.style.display = 'block';

    document.getElementById("points").innerHTML = points;
    document.getElementById("correct").innerHTML = correct;
    document.getElementById("incorrect").innerHTML = incorrect;
    quizNumber.innerHTML = "Result";
    
    // Remove the submit button event listener to prevent multiple bindings
      submit.removeEventListener('click', handleSubmit);
      submit.addEventListener('click', resetQuiz);
      resultSay();
}
function resultSay(){
  
  if(currentAudio){
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (points >= 20) {
    currentAudio = new Audio('audio/damn.mp3');
    currentAudio.volume = 0.3;
    currentAudio.play();
    say.innerHTML = "Hell Yeah My Dawgggg, You Smart Af";
  } else if (points >= 10) {
    currentAudio = new Audio('audio/well.mp3');
    currentAudio.volume = 0.3;
    currentAudio.play();
    say.innerHTML = "Well Well !!! Nice Try Nigga";
  } else {
    currentAudio = new Audio('audio/hell.mp3');
    currentAudio.volume = 0.3;
    currentAudio.play();
    say.innerHTML = "Hell Nah Bro! You Dumb";
  
}};


// Function to reset the quiz
function resetQuiz() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
}
    let submitAudio = new Audio('audio/submit.mp3');
    submitAudio.volume = 0.5;
    submitAudio.play();
    points = 0;
    correct = 0;
    incorrect = 0;
    questionNo = 0;
    submit.innerHTML = "Submit";
    result.style.display = 'none';
    answerBox.style.display = 'grid';
    say.style.display = 'none';
    selected = ""; // Reset selected option

    // Remove previous event listener before adding a new one
    submit.removeEventListener('click', resetQuiz);
    submit.addEventListener('click', handleSubmit);

    loadQuestion();
}

// Attach the submit event listener initially
submit.addEventListener('click', handleSubmit);

// Start the quiz
loadQuestion();
