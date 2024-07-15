
const username = document.getElementById('username');
const savescorebtn = document.getElementById('savescorebtn');
const finalscore = document.getElementById('finalscore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGHSCORES = 5;

finalscore.innerText = mostRecentScore;
username.addEventListener('keyup', () => {
    savescorebtn.disabled = !username.value;
});

savehighscore = (e) => {
    e.preventDefault();
    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("app.html");
    //console.log(highscores);
};
