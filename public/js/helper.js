const loadingSpinnerContainer = document.querySelector('.loadingSpinnerContainer')

const showSuccessOverlay = document.querySelector('.showSuccessOverlay')
const showSuccessBody = document.querySelector('.showSuccessBody')

const showErrorOverlay = document.querySelector('.showErrorOverlay')
const showErrorBody = document.querySelector('.showErrorBody')

function showSpinner(){
   loadingSpinnerContainer.style.display = 'flex'
}

function hideSpinner() {
   loadingSpinnerContainer.style.display = 'none'
}

function showErrorDisplay(text){
   showErrorOverlay.style.display = 'flex'
   const outShow = `
      <div class="showErrorBody">
         <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 text-red-500">
               <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            
         </div>
         <p class='text-center w-full'>${text}</p>
         <button id="" class="mt-2 border border-gray-200 p-1 rounded hover:bg-gray-100 close-error-overlay">close</button>
      </div>`;

    showErrorOverlay.innerHTML = outShow;
    
    setTimeout(() => {
      showErrorOverlay.style.display = 'none'
    }, 2000);
}

function showSuccessDisplay(text){
   showSuccessOverlay.style.display = 'flex'
   const outShow = `
   <div class="showSuccessBody">
      <div>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 w-12 text-green-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
         </svg>
      </div>
      <p>${text}</p>
      <button id="" class="mt-2 border border-gray-200 p-1 rounded hover:bg-gray-100 close-good-overlay">close</button>
   </div>`;

   showSuccessOverlay.innerHTML = outShow;
    
    setTimeout(() => {
      showSuccessOverlay.style.display = 'none'
    }, 2000);
}





