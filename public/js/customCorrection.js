

// DECLARATION OF STATES
let selectActiveSubject = ''
let activeSelectedQuestionSet = ''
let allGeneralQuestions = []
let userData = ''
let subjectCombination = ''
let userProfile = ''
let examsDetails = ''
let userAnswersList = []
let user_id = userIdGen
let token = tokenGen
let exam_id = examIdGen

 const getActiveExam = (exam_id) => {
   axios
     .get(`http://127.0.0.1:8000/api/exams-answers-history/${exam_id}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
     .then((response) => {
      
      console.log(response.data)
       examsDetails = response.data.exams_details;
       allGeneralQuestions = response.data.exams_details.questions_set_id.questions;
       userAnswersList = response.data.exams_details.answers;

      updateAnswersCheck(userAnswersList)
      
      const subjectCo = examsDetails

      let subjectCol = [
         subjectCo.subject_one,
         subjectCo.subject_two,
         subjectCo.subject_three,
         subjectCo.subject_four
      ]

     selectActiveSubject = subjectCol.find((item) => item !== '')


     fixSubjectCombinationButtons(examsDetails, selectActiveSubject)

     populateSelectedActiveSubject(selectActiveSubject, userAnswersList)

       hideSpinner()

     })
     .catch((error) => {
       hideSpinner()
       console.error('Failed to fetch user data', error);
     })
 };


// Initial call to display immediately
// ****


// Initial call to display the countdown immediately


//  WITHOUT DATABASE INTERACTION

 // .... // .... //

//  FUNCTIONS THAT POPULATE THE DOM BODY
//  FUNCTIONS THAT POPULATE THE DOM BODY
const fixSubjectCombinationButtons = (subjectCombination, active) => {

   let subjectMix = [
      subjectCombination.subject_one,
      subjectCombination.subject_two,
      subjectCombination.subject_three,
      subjectCombination.subject_four
   ]
   
   const activeBg = 'bg-gray-800 text-gray-50 hover:bg-gray-900';
   const inactiveBg = 'bg-gray-100 text-gray-800 hover:bg-gray-200';

   subjectSelectBody.innerHTML = ''
   let outShow = subjectMix.map((item, index) => {
      if (item !== '') {
         return `
            <button subjectValue="${item}" class="p-1 small-font font-semibold flex cursor-pointer rounded-full items-center ${active === item ? activeBg : inactiveBg} select-active-subject">
               ${item}
               <span class="p-1"></span>
            </button>
         `;
      }
      return '';
   }).join('');
   
   subjectSelectBody.innerHTML = outShow;
   console.log(examsDetails.score)
   const scoreBox = document.querySelector('.score-box')

   scoreBox.innerHTML = Math.ceil(examsDetails.score * 2.2222222222) + '/' 
   
   

   // subjectSelectBody.innerHTML = outShow
}

const populateSelectedActiveSubject = (subjectValue, userAnswersList) => {

   selectActiveSubject = subjectValue

   
   const subQuestion = allGeneralQuestions.filter(item => subjectValue === item.subject);
   
   const questionsList = subQuestion[0].questions;

   questionIndexBody.innerHTML = ''

   // POPULATING THE QUESTIONS INDEX
   questionsList.forEach((item, index) => {
      let bgColor = 'bg-gray-500 hover:bg-gray-900'; // Default background color

      // Check if there is a selected answer for the current question
      const userAnswer = userAnswersList.find(answer => +answer.question_id === item.question_id);
 
      if (userAnswer && userAnswer.selected_answer !== '') {
         bgColor = 'bg-green-600 hover:bg-green-500';
           // Set to green background color
      }else {
         bgColor = 'bg-gray-500 hover:bg-gray-900'
      }

      const singleIndex = `
          <span index_value='${index + 1}' id="" href='#num${index + 1}' class="cursor-pointer border rounded ${bgColor} flex items-center justify-center question-index-number">
              ${index + 1}
          </span>
      `;
      questionIndexBody.innerHTML += singleIndex;
  });

   questionsBody.innerHTML = '';

   let subQuestionDiv = ''
   let options = ''
   questionsList.forEach((item, index) => {
      const optionsHtml = item.options.map(option => `
          <li class="w-full bg-gray flex items-center p-0.5 mt-0.5 hover:bg-gray-50">
              <span class="pr-1 flex items-center">
                  <input
                     disabled
                     id='option-check'
                     type="checkbox"
                     value="${option}"
                     class="w-3 h-3 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
              </span>
              <p>${option}</p>
          </li>
      `).join('');

      const correctAnswer = `<li class="w-full border-t-2 bg-gray flex items-center p-0.5 mt-0.5 hover:bg-gray-100">
         <span class="pr-1 flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 text-green-500">
            <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
         </svg>

         </span>
         <p>${item.answer_value}</p>
      </li>`

      const subQuestionDiv = `
          <div id='num${index}' class="questions-single bg-gray-50 rounded p-2 mt-1">
              <div class="question-header">
                  <p class="text-gray-500">
                      Question <span>${index + 1}</span>
                  </p>
                  <p class="text-gray-900 font-semibold">${item.question_value}</p>
              </div>
              <div class="options-body m2-3">
                  <ul question_id='${item.question_id}'>
                      ${optionsHtml}
                      ${correctAnswer}  
                  </ul>
              </div>
          </div>
      `;

      questionsBody.innerHTML += subQuestionDiv;
      MathJax.typesetPromise();
  });

  updateAnswersCheck(userAnswersList)
      
}

const updateAnswersCheck = (answersList) => {
   // console.log(answersList)
   answersList.forEach(answer => {
       const questionId = answer.question_id;
       const selectedAnswer = answer.selected_answer;
       const correctAnswer = answer.correct_answer;

       // Find all checkboxes for the current question_id
       const checkboxes = document.querySelectorAll(`ul[question_id="${questionId}"] input[type="checkbox"]`);

       checkboxes.forEach(checkbox => {
           const parentLi = checkbox.parentElement.parentElement; // Get the li element

           if (checkbox.value === selectedAnswer) {
               checkbox.checked = true;

               if(selectedAnswer !== correctAnswer){
                  parentLi.style.backgroundColor = '#fecaca';
               }else {
                  parentLi.style.backgroundColor = '#d1fae5'; // Apply background color  
               }


           } else {
               checkbox.checked = false;
               parentLi.style.backgroundColor = ''; // Reset background color
           }
       });
   });
}



const showSuccessAlert = (text) => {
   const show = `
      <div role="alert" class="alert alert-success flex flex-col">
         <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-14 w-14 text-white" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         <span class="text-white">${text}</span>
         <button id="close-alert" class="block btn">ok</button>
      </div>  	
   `
   showAlertBody.innerHTML = show
   showAlert.style.display = 'flex'

   setTimeout(() => {
      showAlert.style.display - 'none'
   }, 2000);
}  


// .... // .... //


//  CALLING OF FUNCTIONS
//  CALLING OF FUNCTIONS
// *

getActiveExam(exam_id)

// .... // .... //

//  CALLING OF FUNCTIONS BY EVEN-LISTENER
//  CALLING OF FUNCTIONS BY EVENT-LISTENER

// .... // .... //


// EVENT DELEGATION FUNCTIONS
// EVENT DELEGATION FUNCTIONS
document.addEventListener('click', (e) => {
   // console.log(e.target.classList)

   if(e.target.classList.contains('select-active-subject')){
      const subjectValue = e.target.getAttribute('subjectValue')

      // passes the subjectcombination and value
      fixSubjectCombinationButtons(examsDetails, subjectValue)

      // Pass the subjectvalue to it
      populateSelectedActiveSubject(subjectValue, userAnswersList)
   }else if(e.target.classList.contains('question-index-number')){
      e.preventDefault()
      const val_hash = e.target.getAttribute('index_value')
      // console.log(val_hash)
      document.getElementById(`num${val_hash-1}`).scrollIntoView({ behavior: 'smooth' }); 

   }else if(e.target.id === 'close-alert'){
      showAlert.style.display = 'none'
   }


})

// .... // .... //


//  EVENT LISTENERS AND FUNCTOINS JOINT
//  EVENT LISTENERS AND FUNCTOINS JOINT


// .... // .... //


//  EVENT LISTENERS
//  EVENT LISTENERS


// .... // .... //



// List OF FUNCTIONS AND DEFINATION