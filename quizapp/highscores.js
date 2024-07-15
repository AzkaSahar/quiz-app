const hslist=document.getElementById("hslist");
const highscores=JSON.parse(localStorage.getItem("highScores"))||[];
hslist.innerHTML= highscores
.map(score =>{
    return `<li class="high-score"> ${score.name}-${score.score}</li>`;
})
.join("");
//console.log(highscores);

