
const token = localStorage.getItem('auth_cbt_token')

// DECLARATION OF STATES
let selectActiveSubject = 'ENGLISH LANGUAGE'
let activeSelectedQuestionSet = ''
let allGeneralQuestions = []
let userData = ''
let subjectCombination = ''
let userProfile = ''
let examsDetails = ''
let user_id
let userAnswersList = []

// DEFINING FUNCTIONS
// DEFINING FUNCTIONS
// DATABASE AND BACK POINT
const authorizeUser = () => {
   showSpinner()
   axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   })
   .then((response) => {
      if (!response.data.user_id) {
         window.location.href = '/signin';
      }

      const user_id = response.data.user_id;
      userData = response.data;
      getActiveExam(user_id);
   })
   .catch((error) => {
     hideSpinner()
     console.error('Failed to fetch user data', error);
   });
}

const getUserProfile = (user_id) => {
  axios
    .get(`http://127.0.0.1:8000/api/get-profile/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      userProfile = response.data.profile;
      hideSpinner()
    })
    .catch((error) => {
      hideSpinner()
      console.error('Failed to fetch user data', error);
    });
};

const getSubjectsCombination = (user_id) => {
   axios
     .get(`http://127.0.0.1:8000/api/get-subject-combination/${user_id}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
     .then((response) => {
       subjectCombination = response.data.combination;
       fixSubjectCombinationButtons(subjectCombination, 'ENGLISH LANGUAGE')
       hideSpinner()
     })
     .catch((error) => {
       hideSpinner()
       console.error('Failed to fetch user data', error);
     });
 };

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
      //  console.log(allGeneralQuestions)
       keepTiminigUpdate(examsDetails)

      // Populate Answers
      getSelectedAnswers(examsDetails.exams_id)

      // populateSelectedActiveSubject(selectActiveSubject)

      
       hideSpinner()
     })
     .catch((error) => {
       hideSpinner()
       console.error('Failed to fetch user data', error);
     });
 };

//  **
const getSelectedAnswers = (exams_id) => {
   axios.get(`http://127.0.0.1:8000/api/get-user-active-answers/${exams_id}`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   })
   .then((response) => {
     
     userAnswersList = response.data.user_answers

     updateAnswersCheck(userAnswersList)
     
     populateSelectedActiveSubject(selectActiveSubject, userAnswersList)
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
      user_id: userData.user_id,
      exams_id: examsDetails.exams_id,
      question_id,
      selected_answer: value,
      subject: selectActiveSubject,
   }

   showSpinner()
   axios.post('/api/post-exam-answer', answerData, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   }).then((response) => {

      userAnswersList = response.data.user_answers
      populateSelectedActiveSubject(selectActiveSubject ,userAnswersList)
      hideSpinner()

   }).catch((error) => {

      hideSpinner()
      console.error(error)
   })

 }


 const submitExamsWhole = () => {

   const confirmSubmit = window.confirm('Are you sure you want to submit these exam')

   if(confirmSubmit){
      const examsInfo = {
         exams_id: examsDetails.exams_id,
         user_id: userData.user_id,
      }

      console.log(examsInfo)
      showSpinner()
      axios.post('api/end-exams', examsInfo, {
         headers: {
            Authorization: `Bearer ${token}`
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
 }
// . . . . . 

// ****

// Initial call to display immediately
// ****


// Initial call to display the countdown immediately


//  WITHOUT DATABASE INTERACTION

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
      countDown.textContent = 'Time is Up!'
      showSpinner()

      const examsInfo = {
         exams_id: examsDetails.exams_id,
         user_id: userData.user_id,
      }
      axios.post('api/end-exams', examsInfo, {
         headers: {
            Authorization: `Bearer ${token}`
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

function keepTiminigUpdate() {

}

 // .... // .... //

//  FUNCTIONS THAT POPULATE THE DOM BODY
//  FUNCTIONS THAT POPULATE THE DOM BODY
const fixSubjectCombinationButtons = (subjectCombination, active) => {
   getSelectedAnswers(examsDetails.exams_id)
   const activeBg = 'bg-gray-800 text-gray-50 hover:bg-gray-900';
   const inactiveBg = 'bg-gray-100 text-gray-800 hover:bg-gray-200';

   const outShow = `
      <button subjectValue='${subjectCombination.subject_one}' class="flex small-font cursor-pointer font-semibold p-1 rounded-full items-center ${active === subjectCombination.subject_one ? activeBg : inactiveBg} select-active-subject ">
         ${subjectCombination.subject_one}
         <span class="p-0 md:p-1"></span>
      </button>
      <button subjectValue='${subjectCombination.subject_two}' class="font-semibold p-1 flex small-font cursor-pointer rounded-full items-center ${active === subjectCombination.subject_two ? activeBg : inactiveBg} select-active-subject">
         ${subjectCombination.subject_two}
         <span class="p-1"></span>
      </button>
      <button subjectValue='${subjectCombination.subject_three}' class="font-semibold p-1 small-font flex cursor-pointer rounded-full items-center ${active === subjectCombination.subject_three ? activeBg : inactiveBg} select-active-subject">
         ${subjectCombination.subject_three}
         <span class="p-1"></span>
      </button>
      <button subjectValue='${subjectCombination.subject_four}' class="p-1 small-font font-semibold flex cursor-pointer rounded-full items-center ${active === subjectCombination.subject_four ? activeBg : inactiveBg} select-active-subject">
         ${subjectCombination.subject_four}
         <span class="p-1"></span>
      </button>
   `;

   subjectSelectBody.innerHTML = outShow
}

const populateSelectedActiveSubject = (subjectValue, userAnswersList) => {
   // *
   updateAnswersCheck(userAnswersList)
   selectActiveSubject = subjectValue
   console.log(allGeneralQuestions)
   
   const subQuestion = allGeneralQuestions.filter(item => subjectValue === item.subject);
   
   const questionsList = subQuestion[0].questions;
   
   let singleIndex = ''

   questionIndexBody.innerHTML = ''

   questionsList.forEach((item, index) => {
      let bgColor = 'bg-gray-500 hover:bg-gray-900'; // Default background color

      // Check if there is a selected answer for the current question
      const userAnswer = userAnswersList.find(answer => +answer.question_id === item.question_id);

      if (userAnswer && userAnswer.selected_answer !== '') {
          bgColor = 'bg-green-600 hover:bg-green-500'; // Set to green background color
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

      questionsBody.innerHTML += subQuestionDiv;
  });

  updateAnswersCheck(userAnswersList)
      
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


// .... // .... //


//  CALLING OF FUNCTIONS
//  CALLING OF FUNCTIONS
// *
authorizeUser()


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
      fixSubjectCombinationButtons(subjectCombination, subjectValue)

      // Pass the subjectvalue to it
      populateSelectedActiveSubject(subjectValue, userAnswersList)
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

      // return console.log(question_id)
      makeAnswerPost(optionValue, question_id)
   }else if(e.target.id === 'close-alert'){
      showAlert.style.display = 'none'
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

window.addEventListener('beforeunload', function (e) {
   var confirmationMessage = 'If you leave this page, your exam will be canceled.';
   (e || window.event).returnValue = confirmationMessage; // For most browsers
   return confirmationMessage; // For some older browsers
});


// .... // .... //


//  EVENT LISTENERS
//  EVENT LISTENERS


// .... // .... //



// List OF FUNCTIONS AND DEFINATION