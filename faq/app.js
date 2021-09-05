
const answers = document.querySelectorAll('.answer');
const question = document.querySelectorAll('.question');
const faq = document.querySelector('.faqs');

    // console.log(answers, question, faq);

 question.forEach((que) => {
      que.addEventListener('click', (e) => {

            const element = e.target.nextElementSibling;
        console.log(e.target);



        element.classList.toggle('show');


        if(element.classList.contains('show')){
            e.target.style.fontWeight = '700';
            e.target.style.color = 'hsl(14, 88%, 65%)';
        } else {
            e.target.style.fontWeight = '400';
            e.target.style.color = 'hsl(238, 29%, 16%)';
        }
        });


    }); 



 //nextElementSibling