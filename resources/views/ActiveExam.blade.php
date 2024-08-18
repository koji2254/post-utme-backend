<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
   <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"/>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.9.2/tailwind.min.css" />
   <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.2/dist/full.min.css" rel="stylesheet" type="text/css" />
   <script src="https://cdn.tailwindcss.com"></script>
   {{-- <script src="https://cdn.tailwindcss.com"></script> --}}
   
   <meta name="csrf-token" content="{{ csrf_token() }}">
   <link rel="stylesheet" href="{{ asset('css/main.css') }}">
   <title>ABU POSTUTME</title>
</head>
<body>
   {{--  --}}
   <div class="loadingSpinnerContainer">
      <div class="loadingSpinner"></div>
   </div>
   {{--  --}}
   {{-- good overlay --}}
   <div class="showSuccessOverlay"> </div>
   {{--  --}}
   {{-- Bad overlay --}}
   <div class="showErrorOverlay">  </div>
   {{--  --}}

   <div class="flex w-full bg-gray-200 p-0">
      <div class="w-full flex justify-between items-center py-1 px-3">
        <div class="logo-icon flex items-center gap-1">
            {{-- <img sr class="w-10" alt="ABU" /> --}}
            <span class="sm:flex text-green-700 font-semibold">Ahmadu Bello University</span>
        </div>    
      </div>
   </div>
   
   {{--  --}}
   {{--  --}}
   <div class="cta-dash-container w-full dark mt-2 p-2 border-b-2">
      <div class="cta-dash-body w-full flex justify-between items-center">
         <div class="subject-select-container text-xs full-flex gap-2">
            {{-- <div class="flex hover:bg-gray-900 cursor-pointer bg-gray-800 text-gray-50 rounded-full items-center">
               <span class=" border-r-2 p-1 uppercase ">English</span>
               <span class="p-1">23</span>
            </div>
            <div class="flex hover:bg-gray-200 cursor-pointer rounded-full bg-gray-100 items-center">
               <span class=" border-r-2 p-1 uppercase ">Mathematics</span>
               <span class="p-1">23</span>
            </div> --}}
         </div>

         <div class="full-flex gap-2">
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>                
            </span>
            {{-- <div id="timing-box" class="font-semibold"> --}}
               <div id="count-down" class="countdown font-mono text-sm md:text-lg flex">
                  
               </div>   
            {{-- </div> --}}
            <button id="submit-exams" class="bg-red-600 hover:bg-red-700 text-gray-50 border-none p-2 px-3 rounded font-semibold text-sm">
               Submit
             </button>
         </div>
      </div>
    </div>

    {{--  --}}
    {{--  --}}
    <section class="w-11/12 gap-1 md:w-11/12 p-0 m-auto mt-1 md:p-5 m-auto flex flex-col-reverse md:flex md:flex-row items-start">
      <div class="border m-auto w-full p-1">
         <div class="question-container ">
            <div class="questions-body w-full pr-2">
               {{-- Single Question --}}
              
               {{--  --}}
            </div>
         </div>
      </div>
      {{-- Questions Index --}}
      <div class="questions-index-container ">
         <div class="question-index-body text-sm w-72 grid grid-cols-10 md:w-40 md:grid-cols-4 gap-0.5  text-gray-100 p-1 rouded">
            {{-- <span id="scroll-to-num4" href='#num4' class="cursor-pointer border rounded hover:bg-gray-500 hover:text-gray-50 flex items-center justify-center question-index-number">
               4
            </span> --}}
         </div>
      </div>
    </section>
    {{--  --}}

    {{--  --}}
    <div class="confirm-submit-overlay">
      <div class="confirm-submit-body">
         <!-- Open the modal using ID.showModal() method -->
         <div class="p-5">
            <h1 class="font-mono text-sm font-bold">NOTE & CONFIRM</h1>
            <p class="mt-2">Are you you want to submit these Exam</p>
            <div class="flex items-center gap-2 mt-2">
               <button id="confirm-submition-btn" class="btn btn-outline btn-success">Submit</button>
               <button id="cancel-submition-btn" class="btn">cancel</button>
            </div>
         </div>
      </div>
    </div>
    {{--  --}}

   <div class="show-alert">
      <div class="show-alert-body">
         {{-- <div role="alert" class="alert alert-success flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-14 w-14 text-white" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span class="text-white">Your exams has been submited</span>
            <button id="close-alert" class="block btn">ok</button>
         </div>   --}}
      </div>  
   </div>
 


   <script src="{{ asset('js/examItems.js') }}"></script>
   <script src="{{ asset('js/helper.js') }}"></script>
   <script src="{{ asset('js/exam.js') }}"></script>
</body>
</html>