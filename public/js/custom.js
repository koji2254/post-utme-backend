
// DECLARATION OF STATES
let token = tokenGen
let selectActiveSubject = ''
let activeSelectedQuestionSet = ''
let allGeneralQuestions = []
let userData = ''
let subjectCombination = ''
let userProfile = ''
let examsDetails = ''
let user_id = userIdGen
let userAnswersList = []
let subjectCollection = []

// DEFINING FUNCTIONS
// DEFINING FUNCTIONS
// DATABASE AND BACK POINT
// const authorizeUser = () => {
//    showSpinner()
//    axios.get('http://127.0.0.1:8000/api/user', {
//       headers: {
//          Authorization: `Bearer ${token}`,
//       },
//    })
//    .then((response) => {
//       if (!response.data.user_id) {
//          window.location.href = '/signin';
//       }

//       const user_id = response.data.user_id;
//       userData = response.data;
//       getActiveExam(user_id);
//    })
//    .catch((error) => {
//      hideSpinner()
//      console.error('Failed to fetch user data', error);
//    });
// }



 const getActiveExam = (user_id) => {
   axios
     .get(`http://127.0.0.1:8000/api/get-active-exams/${user_id}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
     .then((response) => {
       examsDetails = response.data.exams_details;
       allGeneralQuestions = response.data.exams_details.questions.questions;

       getSelectedAnswers(examsDetails.exams_id)
      
       hideSpinner()
     })
     .catch((error) => {
       hideSpinner()
       console.error('Failed to fetch user data', error);
     });
 };

 getActiveExam(user_id)

//  ****************************
const getSelectedAnswers = (exams_id) => {
   axios.get(`http://127.0.0.1:8000/api/get-user-active-answers/${exams_id}`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   })
   .then((response) => {
     
     userAnswersList = response.data.user_answers

     updateAnswersCheck(userAnswersList)
     
     const subjectColl = []
     const questions = examsDetails.questions.questions
     questions.map((item) => {
       return subjectColl.push(item.subject) 
     })

     subjectCollection = subjectColl

     selectActiveSubject = subjectColl.find((item) => item !== '')

     populateSelectedActiveSubject(selectActiveSubject, userAnswersList)

     const subQuestion = allGeneralQuestions.filter(item => selectActiveSubject === item.subject);
   
     const questionsList = subQuestion[0].questions;
     activeSelectedQuestionSet = questionsList
     populateSingleQuestion(0, userAnswersList, activeSelectedQuestionSet)

   //   fixSubjectCombinationButtons(examsDetails, selectActiveSubject)
     fixSubjectCombinationButtons(subjectColl, selectActiveSubject)
   //   console.log(userAnswersList)
     hideSpinner()
   })
   .catch((error) => {
     hideSpinner()
     console.error('Failed to fetch user data', error);
   });

}

// ***** //
 const makeAnswerPost = (value, question_id) => {

   const answerData = {
      user_id: user_id,
      exams_id: examsDetails.exams_id,
      question_id,
      selected_answer: value,
      subject: selectActiveSubject,
   }

   // showSpinner()
   axios.post('/api/post-exam-answer', answerData, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   }).then((response) => {

      userAnswersList = response.data.user_answers
      console.log(userAnswersList)
      populateSelectedActiveSubject(selectActiveSubject ,userAnswersList)
      hideSpinner()

   }).catch((error) => {

      hideSpinner()
      console.error(error)
   })

 }


 const submitExamsWhole = () => {

   const confirmSubmit = window.confirm('Are you sure you want to submit these exam')

   countDown.textContent = '0:0:0'
   // if(confirmSubmit){
      const examsInfo = {
         exams_id: examsDetails.exams_id,
         user_id: user_id,
      }

      console.log(examsInfo)
      showSpinner()
      const url = 'http://127.0.0.1:8000/api/end-exams'
      console.log(url)
      axios.post(url, examsInfo, {
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type' : 'application/json'
         },
      }).then((response) => {

         console.log(response.data)
         hideSpinner()
         confirmSubmitOverlay.style.display = 'none'
         showSuccessAlert('Exams Submited')

         window.location.href = 'http://localhost:5173/performace-history'
      }).then((error) => {
   
         console.log(error)
         
      }).finally(() => {
         hideSpinner()
      })
 }
// . . . . . 

// ****

// Initial call to display immediately
// ****


// Initial call to display the countdown immediately


//  WITHOUT DATABASE INTERACTION

const removeZero = str => str.replace(/^0+/, '');

const convertZero = (number) => number < 0 ? 0 : number;

const interval = setInterval(() => {
   const startedAt = new Date(examsDetails.created_at).getTime()
   // const startedAt = new Date(userData.created_at).getTime()
   
   const now = new Date().getTime()

   let alocatedTime = +examsDetails.allocated_time * 60 * 1000;
   
   const endTime = startedAt + alocatedTime;

   const remainingTime = endTime - now;
   
   // console.log(`startedAt: ${startedAt}, endtime: ${endTime}, now: ${now}`)

   countDown.textContent = remainingTime
   // console.log(remainingTime)

   const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
   const mins = Math.floor((remainingTime / (1000 * 60)) % 60);
   const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

   // console.log(hours, mins, seconds)
   countDown.textContent = `${isNaN(hours) ? 0 : hours}:${isNaN(mins) ? 0 : mins}:${isNaN(seconds) ? 0 : seconds}`;

   if (remainingTime < 0) {
      clearInterval(interval);

      countDown.style.color = '#17a2b8'
      countDown.textContent = 'TIME-UP!'
   
      
      const examsInfo = {
         exams_id: examsDetails.exams_id,
         user_id: userData.user_id,
      }
      axios.post('api/end-exams', examsInfo, {
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type' : 'application/json'
         },
      }).then((response) => {

         console.log(response.data)
         hideSpinner()
         confirmSubmitOverlay.style.display = 'none'
         showSuccessAlert('Exams Submited')

         window.location.href = 'http://localhost:5173/performace-history'
      }).then((error) => {
   
         console.log(error)
         hideSpinner()
      })
   }

}, 1000);
 // .... // .... //

//  FUNCTIONS THAT POPULATE THE DOM BODY
//  FUNCTIONS THAT POPULATE THE DOM BODY
// const fixSubjectCombinationButtons = (subjectCombination, active) => {
const fixSubjectCombinationButtons = (subjectMix, active) => {
   
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
   // subjectSelectBody.innerHTML = outShow
}

const populateSelectedActiveSubject = (subjectValue, userAnswersList) => {
   // *
   updateAnswersCheck(userAnswersList)
   selectActiveSubject = subjectValue
   const subQuestion = allGeneralQuestions.filter(item => subjectValue === item.subject);
   
   const questionsList = subQuestion[0].questions;
   
   let singleIndex = ''

   questionIndexBody.innerHTML = ''

   questionsList.forEach((item, index) => {
      let bgColor = 'bg-gray-100 hover:bg-gray-200 text-gray-600'; // Default background color

      // Check if there is a selected answer for the current question
      const userAnswer = userAnswersList.find(answer => +answer.question_id === item.question_id);

      if (userAnswer && userAnswer.selected_answer !== '') {
          bgColor = 'bg-green-500 hover:bg-green-400'; // Set to green background color
      }else {
         bgColor = 'bg-gray-100 hover:bg-gray-200 text-gray-600'
      }
      const singleIndex = `
          <span id='select-index' index_value='${index}' id="" class="cursor-pointer border rounded ${bgColor} flex items-center justify-center">
              ${index + 1}
          </span>
      `;
      // const singleIndex = `
      //     <span index_value='${index + 1}' id="" href='#num${index + 1}' class="cursor-pointer border rounded ${bgColor} flex items-center justify-center question-index-number">
      //         ${index + 1}
      //     </span>
      // `;
      questionIndexBody.innerHTML += singleIndex;
  });

   //@* * * * * * *  * * * * * * @   
   // questionsBody.innerHTML = '';

   let subQuestionDiv = ''
   let options = ''
   questionsList.forEach((item, index) => {
      const optionsHtml = item.options.map(option => `
          <li class="w-full bg-gray flex items-center p-1 mt-1 hover:bg-green-100">
              <span class="pr-1 flex items-center">
                  <input
                     id='option-check'
                     type="checkbox"
                     value="${option}"
                     class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
              </span>
              <p>${option}</p>
          </li>
      `).join('');

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
                  </ul>
              </div>
          </div>
      `;

      // questionsBody.innerHTML += subQuestionDiv;
  });

  updateAnswersCheck(userAnswersList)
  MathJax.typesetPromise();
      
}

const updateAnswersCheck = (answersList) => {
   // console.log(answersList)
   answersList.forEach(answer => {
       const questionId = answer.question_id;
       const selectedAnswer = answer.selected_answer;

       // Find all checkboxes for the current question_id
       const checkboxes = document.querySelectorAll(`ul[question_id="${questionId}"] input[type="checkbox"]`);

       checkboxes.forEach(checkbox => {
           const parentLi = checkbox.parentElement.parentElement; // Get the li element

           if (checkbox.value === selectedAnswer) {
               checkbox.checked = true;
               parentLi.style.backgroundColor = '#d1fae5'; // Apply background color
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
   }, 1500);
}  


// ****************************************
// @POPULATE SINGLE QUESTION USING ITS INDEX
const populateSingleQuestion = (indexVal, userAnswersList, activeSelectedQuestionSet) => {
   // 
   let indexRawVal = indexVal
   const question = activeSelectedQuestionSet[indexVal]
   const question_id = question.question_id

   // // @Check if answer has being selected
   const answer = userAnswersList.find((item) => +item.question_id === question_id);
   const questionsLength = activeSelectedQuestionSet.length
   
   const optionsHtml = question.options.map(option => {
      // Assuming `answer` is the object containing the selected answer
      const isSelected = answer && answer.selected_answer === option;
   
      return `
         <li question_id='${question.question_id}' class="w-full bg-gray flex items-center p-1 mt-1 hover:bg-green-100">
            <span class="pr-1 flex items-center">
               <input
                  id='option-check'
                  type="checkbox"
                  value="${option}"
                  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  ${isSelected ? 'checked' : ''}
               />
            </span>
            <p>${option}</p>
         </li>
      `;
   }).join('');

  
   let navigationBtns = ''
      if(indexRawVal === 0){
         navigationBtns = `<button id='next-questions' index='${indexRawVal}' question_id='${question.question_id}' class='bg-gray-900 text-white hover:bg-gray-800 p-2 px-3 rounded-full font-sans text-xs font-semibold'>Next</button>`
      }else if(indexRawVal + 1 === questionsLength){

        navigationBtns = ` <button id='previous-questions' index='${indexRawVal}' question_id='${question.question_id}' class='bg-gray-900 text-white hover:bg-gray-800 p-2 px-3 rounded-full font-sans text-xs font-semibold'>Previous</button>`  
      }else {
         navigationBtns = `<button id='previous-questions' index='${indexRawVal}' question_id='${question.question_id}' class='bg-gray-900 text-white hover:bg-gray-800 p-2 px-3 rounded-full font-sans text-xs font-semibold'>Previous</button>
         <button id='next-questions' index='${indexRawVal}' question_id='${question.question_id}' class='bg-gray-900 text-white hover:bg-gray-800 p-2 px-3 rounded-full font-sans text-xs font-semibold'>Next</button>` 
      }

   const subQuestionDiv = `
      <div id='num${indexRawVal}' class="questions-single bg-gray-50 rounded p-2 mt-1">
         <div class="question-header">
            <p class="text-gray-500">
                  Question <span>${indexRawVal + 1}</span>
            </p>
            <p class="text-gray-900 font-semibold">${question.question_value}</p>
         </div>
         <div class="options-body m2-3">
            <ul question_id='${question.question_id}'>
                  ${optionsHtml}
            </ul>
         </div>
      </div>
      <div class='flex w-full items-center text-center justify-around mt-2 bg-gray-50 p-3 gap-3'>
         ${navigationBtns}
      </div>
   `;

   questionsBody.innerHTML = subQuestionDiv;
   MathJax.typesetPromise();
}


// .... // .... //


//  CALLING OF FUNCTIONS
//  CALLING OF FUNCTIONS
// *
// authorizeUser()


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
      fixSubjectCombinationButtons(subjectCollection, subjectValue)
      // populateSingleQuestion

      // Pass the subjectvalue to it
      populateSelectedActiveSubject(subjectValue, userAnswersList)

      const subQuestion = allGeneralQuestions.filter(item => subjectValue === item.subject);
   
      const questionsList = subQuestion[0].questions;
      activeSelectedQuestionSet = questionsList
      populateSingleQuestion(0, userAnswersList, activeSelectedQuestionSet)
   
   }else if(e.target.classList.contains('question-index-number')){
      e.preventDefault()
      const val_hash = e.target.getAttribute('index_value')
      // console.log(val_hash)
      document.getElementById(`num${val_hash-1}`).scrollIntoView({ behavior: 'smooth' }); 

   }else if(e.target.id === 'option-check') {
      const question_id = e.target.parentElement.parentElement.parentElement.getAttribute('question_id')
      const optionValue = e.target.value
      const ulElement = e.target.closest('ul');

      const checkboxes = ulElement.querySelectorAll('input[type="checkbox"]')
      checkboxes.forEach(checkbox => {
         const parentLi = checkbox.parentElement.parentElement;
            if (checkbox.value !== optionValue) {
                checkbox.checked = false;
                parentLi.classList.remove('checked-bg'); // Remove bg class from unchecked checkboxes
            } else {
                parentLi.classList.add('checked-bg'); // Add bg class to the checked checkbox
            }
      })

      // Ensure the clicked checkbox is checked
      e.target.checked = true;

      // console.log(optionValue, question_id)
      makeAnswerPost(optionValue, question_id)
   }else if(e.target.id === 'close-alert'){
      showAlert.style.display = 'none'
   
   }else if(e.target.id === 'previous-questions'){
      let initialIndex = e.target.getAttribute('index')

      const index = parseInt(--initialIndex) < 0 ? 0 : parseInt(initialIndex--)
      
      console.log(index)
      populateSingleQuestion(index, userAnswersList, activeSelectedQuestionSet)
   
   }else if(e.target.id === 'next-questions'){
      let initialIndex = e.target.getAttribute('index')
      const index = parseInt(++initialIndex)
      console.log(index)
      populateSingleQuestion(index, userAnswersList, activeSelectedQuestionSet)
   
   }else if(e.target.id === 'select-index'){
      let indexValue = e.target.getAttribute('index_value')

      // console.log(indexValue)
      populateSingleQuestion(+indexValue, userAnswersList, activeSelectedQuestionSet)
   }


})

// .... // .... //


//  EVENT LISTENERS AND FUNCTOINS JOINT
//  EVENT LISTENERS AND FUNCTOINS JOINT
submitExamsBtn.addEventListener('click', (e) => {
    
   confirmSubmitOverlay.style.display = 'flex'
   // submitExamsWhole()
})

confirmSubmitionBtn.addEventListener('click', submitExamsWhole)

// Function to show a confirmation dialog and call submitExamWhole if user confirms
// function warnBeforeLeaving(event) {
//    const message = "Are you sure you want to leave? Leaving will cancel your exam.";
//    if (!confirm(message)) {
//        // If user cancels, prevent navigation
//        event.preventDefault();
//        event.returnValue = '';
//    } else {
//        // If user confirms, call the submitExamWhole function
//        submitExamWhole();
//    }
// }

// // Function to simulate exam submission
// function submitExamWhole() {
//    alert("Exam submitted.");
//    // Add your exam submission logic here
// }

// // Add the event listener when the page loads
// window.addEventListener('beforeunload', warnBeforeLeaving);
// window.addEventListener('popstate', warnBeforeLeaving);
// window.addEventListener('hashchange', warnBeforeLeaving);

// // Optional: Remove the event listener when the exam is completed
// function examCompleted() {
//    window.removeEventListener('beforeunload', warnBeforeLeaving);
//    window.removeEventListener('popstate', warnBeforeLeaving);
//    window.removeEventListener('hashchange', warnBeforeLeaving);
//    alert("Exam completed. You can now safely leave the page.");
// }


//  EVENT LISTENERS
//  EVENT LISTENERS


// .... // .... //



// List OF FUNCTIONS AND DEFINATION












