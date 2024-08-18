const tokenGen = document.getElementById('tokenGen').value.trim()
const userIdGen = document.getElementById('userIdGen').value.trim()
const examIdGen = document.getElementById('examIdGen').value.trim()

const subjectSelectBody = document.querySelector('.subject-select-container')
const questionsBody = document.querySelector('.questions-body')
const questionIndexBody = document.querySelector('.question-index-body')
const submitExamsBtn = document.getElementById('submit-exams')
const timingBox = document.getElementById('timing-box')
const confirmSubmitionBtn = document.getElementById('confirm-submition-btn')
const cancelSubmitionBtn = document.getElementById('cancel-submition-btn')
const confirmSubmitOverlay = document.querySelector('.confirm-submit-overlay')
const showAlert = document.querySelector('.show-alert')
const showAlertBody = document.querySelector('.show-alert-body')
const countDown = document.getElementById('count-down')






// confirmSubmitionBtn.addEventListener
cancelSubmitionBtn.addEventListener('click', (e) => {
   confirmSubmitOverlay.style.display = 'none'
})

