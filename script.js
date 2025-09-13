const questions = [
        {
            question: "In computer science, what does the acronym 'API' stand for?",
            answers: [
                {text: "Advanced Programming Interface", correct:false},
                {text: "Application Programming Interface", correct:true},
                {text: "Automated Processing Instruction", correct:false},
                {text: "Algorithmic Program Instance", correct:false},
            ]
        },

        {
            question: "Who is the author of the famous play 'Romeo and Juliet'?",
            answers: [
                {text: "Charles Dickens", correct:false},
                {text: "Jane Austen", correct:false},
                {text: "William Shakespeare", correct:true},
                {text: "Fyodor Dostoevsky", correct:false},
            ]
        },

        {
            question: "Which planet is known as the 'Red Planet'?",
            answers: [
                {text: "Venus", correct:false},
                {text: "Saturn", correct:false},
                {text: "Jupiter", correct:false},
                {text: "Mars", correct:true},
            ]
        },

        {
            question: "Which is the largest ocean in the world?",
            answers: [
                {text: "Pacific Ocean", correct:true},
                {text: "Atlantic Ocean", correct:false},
                {text: "Indian Ocean", correct:false},
                {text: "Southern Ocean", correct:false},
            ]
        }

    ];
    
    let questionIndex;
    let score;
    const mainDiv = document.querySelector(".main");
    const questionSection = document.getElementById("questionArea");
    const wholeAnswers = document.querySelector(".answer-button");
    const nextButton = document.querySelector(".next");

    let startButton;

    begin();

    function begin(){

        nextButton.style.display = "none";
        startButton = document.createElement("button");
        startButton.classList.add("start");
        mainDiv.appendChild(startButton);
        startButton.innerHTML="Start";

        startButton.addEventListener("click", event => {

            startButton.style.display = "none";
            nextButton.style.display = "block";
        
            startQuiz();
        });

    }

    function startQuiz()
    {
        questionIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion(){

        resetState(); /* that will reset the previous question and answer*/
        nextButton.innerHTML = "Next";

        const currentQuestion = questions[questionIndex];
        const questionNo = questionIndex + 1;
        questionSection.innerHTML = questionNo + "- "+ currentQuestion.question;

        let trueOption; /* foreach'in içinde tanımlasaydık başka yerden ulaşamazdık*/

        currentQuestion.answers.forEach(ans => {
            let newBtn = document.createElement("button");
            newBtn.innerHTML = ans.text;
            newBtn.classList.add("btn");
            wholeAnswers.appendChild(newBtn);

            if(ans.correct){
            trueOption = newBtn;
            }
                
            newBtn.addEventListener("click", event => {
                if(ans.correct)
                {
                    newBtn.style.backgroundColor = "green";
                    score++;
                }

                else
                {
                    newBtn.style.backgroundColor = "red"; // You may want to mark incorrect answers with a different color
                    trueOption.style.backgroundColor = "green";
                }
                    
                Array.from(wholeAnswers.children).forEach(button => {

                    button.disabled = true;
                });   

                /*Array.from fonksiyonu, bir dizi benzeri nesneyi gerçek bir JavaScript dizisine dönüştürür.
                    Böylece bu diziyi kullanarak forEach fonksiyonunu kullanabiliriz.*/
                
            });
        });
    }

    
    function resetState(){
    
        while(wholeAnswers.firstChild)
        {
            wholeAnswers.removeChild(wholeAnswers.firstChild);
        }

    }

    nextButton.addEventListener("click", evetn => {
        
        if(questionIndex <= questions.length - 1){
            check();
        } 

        else{
            questionSection.textContent = " ";
            begin();
        }

    });

    function check()
    {
        questionIndex++;
        if(questionIndex <= questions.length - 1){
            showQuestion();
        } 

        else{
            results();
        }
    }

    function results(){
        resetState();
        questionSection.innerHTML = "You scored " + score + " out of " + questions.length +"!";
        nextButton.innerHTML = "Play Again";
    }

