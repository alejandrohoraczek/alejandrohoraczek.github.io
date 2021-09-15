
const answers = document.querySelectorAll('.answer');
const question = document.getElementsByClassName('question');
const faq = document.querySelector('.faqs');

 /*   console.log(answers, question, faq);

    for(let i = 0; i < question.length; i++) {
        question[i].addEventListener('click', () => {
            console.log(question[i]);
            console.log(answers[i]);
            const answer = question[i].nextElementSibling;

            for(i = 0; i < answers.length; i++) {
                answers[i].classList.remove('show');
                if (!answers[i].classList.contains('show')) {
                    answer.classList.add('show');
                } else if (answers[i].classList.contains('show')) {
                    answer.classList.remove('show');
                }
            }
 
       
    }
        )};*/

        for(let i = 0; i < question.length; i++) {
            // question[i].addEventListener('click', myprefunction);
            question[i].addEventListener('click', myfunction);
        }

function myprefunction() {
    let QAnswer = this.nextElementSibling;


    if(this.classList.value === 'shown'){
        console.log('true');
        QAnswer.style.display = 'block';
    } else {
        QAnswer.style.display = 'none';
        console.log('false');

    }
}

function myfunction() {

    let QAnswer = this.nextElementSibling;
    console.log(QAnswer);
    console.log(question);

    
    for(let i = 0; i < question.length; i++) {

        console.log(question[i].nextElementSibling.classList.value)
        question[i].nextElementSibling.className == 'answer-box close';
        // if (question[i].nextElementSibling.classList.value == 'answer-box close open'){
        //     question[i].nextElementSibling.classList.value ==  'answer-box close';

        // } else {
        //     question[i].nextElementSibling.classList.value == 'answer-box close open';

        // }

    }
console.log('ya cerre todos los divs')

QAnswer.classList.toggle('open');


    // if(this.classList[0] == 'answer-box'){
    //     this.classList.toggle('answer-box');
    // } else {
    // QAnswer.classList.add('answer-box');
    // }
    // QAnswer.style.display = 'block';
   



    // if(QAnswer.classList.contains('show')) {
    //     console.log('gag');
    //      QAnswer.classList.toggle('show');
    // }   

//     if(QAnswer.classList.contains('show')) {

//         QAnswer.classList.toggle('show');
   
// }
}

 /* question.forEach((que) => {
      que.addEventListener('click', (e) => {

            const element = e.target.nextElementSibling;
        console.log(e.target);

   

        if(element.classList.contains('show')) {
            element.classList.remove('show');
            console.log('f')
        } else {
            element.classList.add('show');
        }

        element.classList.toggle('show');
    

        if(element.classList.contains('show')){
            e.target.style.fontWeight = '700';
            e.target.style.color = 'hsl(14, 88%, 65%)';
            e.target.classList.add('rotate');
        } else {
            e.target.style.fontWeight = '400';
            e.target.style.color = 'hsl(238, 29%, 16%)';
            e.target.classList.remove('rotate');
        }



        });


    }); */



 //nextElementSibling

 // ACA NO ES MIO

 // Faq Section

//// add an event listener to each question wrapper
var questionWrapper = document.querySelectorAll(".question-wrapper");
for (var i = 0; i < questionWrapper.length; i++) {
    questionWrapper[i].addEventListener("click", questionClicked);
}

// this function is called when question wrapper is clicked
function questionClicked() {
    var clickedElement = this;
    multipleAnswers(clickedElement);
}

function multipleAnswers(clickedElement) {
    // iterate over each element in the document checking for an "active-question" class
    var allQuestions = document.querySelectorAll(".question-wrapper");
    for (var i = 0; i < allQuestions.length; i++) {
        if (
            allQuestions[i]
            .querySelector(".question")
            .classList.toString()
            .includes("active-question") &&
            allQuestions[i].querySelector(".question").classList !==
            clickedElement.querySelector(".question").classList
        ) {
            toggleQuestion(allQuestions[i]);
            arrowRotate(allQuestions[i]);
        }
    }
    toggleQuestion(clickedElement);
    arrowRotate(clickedElement);

    //////////
    // if the current iteration has the class "active-question"
    // then close that answer panel, by toggling the "active-question" class on the .question element && toggle
    // "displayed" && "hidden" on the .answer element.
    //
    // then toggle the same classes on the clicked question wrapper to open.
    //
    //
}

function displayAnswer(clickedElement) {
    toggleQuestion(clickedElement);
    arrowRotate(clickedElement);
}

function toggleQuestion(clickedElement) {
    clickedElement.querySelector(".question").classList.toggle("active-question");

    var answer = clickedElement.querySelector(".answer");

    // smooth animated accordion
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }

    // Change from white to grey
    if (answer.style.color !== "var(--dark-gray-blue)") {
        answer.style.color = "var(--dark-gray-blue)";
    } else {
        answer.style.color = "white";
    }
}

function arrowRotate(clickedElement) {
    var arrow = clickedElement.querySelector(".arrow");
    arrow.classList.toggle("rotate-180");
}