 const question=document.getElementById("question");
 const choices=Array.from(document.getElementsByClassName("choice-text"));
 const progresstext=document.getElementById("progresstext");
 const scoretext = document.getElementById("score");
 const progressbarfull=document.getElementById("progressbarfull");
const loader=document.getElementById("loader");
const game=document.getElementById("game");


 //console.log(choices);

 let currquestion={};
 let acceptingans=false;
 let score=0;
 let questioncounter=0;
 let availablequestions=[];

 let questions = [];
 fetch ("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
 .then((res) =>res.json())
 .then((loadedques) =>{
  //console.log(loadedques.results);
  questions=loadedques.results.map((lquestion) =>{
    const formattedques={
      question:lquestion.question,
    };
    const anschoices =[...lquestion.incorrect_answers];
    formattedques.answer=Math.floor(Math.random()*4)+1;
    anschoices.splice(formattedques.answer -1,0,lquestion.correct_answer);
    anschoices.forEach((choice,index)=>{
      formattedques["choice"+(index+1)]=choice;
    });
    return formattedques;
  });
  
  startgame();
 })
 .catch((err)=>{
  console.error(err);
 });
 const CORRECT_BONUS=10;
 const MAX_QUESTIONS=4;

 startgame=()=>{
    questioncounter=0;
    score=0;
    availablequestions=[...questions];
    //console.log(availablequestions);
    getnextquestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
 };
 getnextquestion=()=>{
    if(availablequestions.length===0 || questioncounter>=MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign("end.html");
    }
    questioncounter++;
    //questioncountertext.innerText=`${questioncounter}/${MAX_QUESTIONS}`;
    progresstext.innerText=`Question ${questioncounter}/${MAX_QUESTIONS}`;
    //update bar
    progressbarfull.style.width=`${(questioncounter/MAX_QUESTIONS) * 100}%`;
    const questionindex=Math.floor(Math.random()* availablequestions.length);
    currquestion=availablequestions[questionindex];
    question.innerHTML= currquestion.question;

    choices.forEach((choice) =>{
        const number=choice.dataset["number"];
        choice.innerHTML=currquestion["choice"+number];
    });
    availablequestions.splice(questionindex,1);
    acceptingans=true;
 };

 choices.forEach((choice) =>{
    choice.addEventListener("click", (e) => {
        if (!acceptingans) {
            return;
        }
            
        acceptingans=false;
        const selectedchoice=e.target;
        const selectedans= selectedchoice.dataset["number"];
        //console.log(selectedans==currquestion.answer);
        const classtoapply= selectedans==currquestion.answer ? "correct" : "incorrect";
        if(classtoapply==="correct"){
            incrementscore(CORRECT_BONUS);
        }
        //console.log(classtoapply);
        selectedchoice.parentElement.classList.add(classtoapply);
        setTimeout(()=>{
            selectedchoice.parentElement.classList.remove(classtoapply);
            getnextquestion();

        },1000);

        
    });
 });
 incrementscore=(num)=>{
    score+=num;
    scoretext.innerText=score;
 };
