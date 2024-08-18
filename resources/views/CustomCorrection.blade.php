<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
   <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"/>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.9.2/tailwind.min.css" />
   <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.2/dist/full.min.css" rel="stylesheet" type="text/css" />
   <script src="https://cdn.tailwindcss.com"></script>
   <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
   <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
   <meta name="csrf-token" content="{{ csrf_token() }}">
   <link rel="stylesheet" href="{{ asset('css/main.css') }}">
   <title>CBT Corections</title>
</head>
<body>
   <div>
      <input type="text" hidden value="{{ $token }}" id="tokenGen" readonly>
      <input type="text" hidden value="{{ $examId }}" id="examIdGen" readonly>
      <input type="text" hidden value="{{ $userId }}" id="userIdGen" readonly>
   </div>
   
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
          
            {{-- <div id="timing-box" class="font-semibold"> --}}
               <div id="count-down" class="countdown font-mono text-sm md:text-lg flex">
                 
               </div>   
               <div id="cancel-submition-btn" class="hidden"></div>
            {{-- </div> --}}
            <h3 class="text-xs flex items-center">score: <sapn class="font-bold score-box"></sapn></h3>
            <a href="http://localhost:5173/performace-history" id="submit-exams" class="bg-white hover:bg-gray-50 text-red-600 border border-red-600 p-1 px-4 rounded font-semibold text-sm">
               Exit
             </a>
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
   <script src="{{ asset('js/customCorrection.js') }}"></script>
</body>
</html>