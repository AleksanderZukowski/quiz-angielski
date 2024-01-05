let game_on = false;
let currentQuestion = 0;
let points = 0;

let questions = [];
let n = 10;
for (let i = 0; i < n; i++) {
  let number = Math.floor(Math.random() * all_questions.length);
  if (all_questions[number].answers[0][7] != "ß") {
    questions.push(all_questions[number]);
  } else {
    console.log("jest");
    let n2 = Math.floor(Math.random() * 6);
    if (n2==0) {
      questions.push(all_questions[number]);
    } else {
      questions.push(all_questions[Math.floor(Math.random() * all_questions.length)]);
    }
  }
  
  all_questions.splice(number,1);
}


function download() {
  let textToSave = "Pytanie;Poprawna Odpowiedź;Twoja Odpowiedź";
  for (let i = 0; i < questions.length; i++) {

    textToSave += `\n${questions[i].question};${questions[i].correct};${all_answers[i]}`;
  }
  textToSave += `\nWynik:;${points}`;
  const hiddenElement = document.createElement('a');

  hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'wyniki.csv';
  hiddenElement.click();
}

let all_answers = [];
let all_correct = [];

function showQuestion() {
  if (currentQuestion>questions.length-1) {
    end();
  }
  $("#answers").html("");
  $("#question").text(questions[currentQuestion].question);
  let answers = [];
  //Clone array questions[currentQuestion].answers > answers
  for (i = 0; i < questions[currentQuestion].answers.length; i++) {
    answers.push(questions[currentQuestion].answers[i]);
  }
  let leng = answers.length;
  for (i = 0; i < leng; i++) {
    let random = Math.floor(Math.random() * answers.length);
    let answer = answers[random];
    answers.splice(random,1);
    console.log(random);
    console.log(answers);
    $("#answers").append(`<button class="answer" value="${answer}">${answer}</button>`);
  }
  $("#answers button").click(function(){
    //alert("click");
    let selected = $(this).attr("value");
    all_answers.push($(this).attr("value"));
    //alert(selected);
    if(selected == questions[currentQuestion].correct) {
      //alert("correct");
      points++;
      all_correct.push($(this).attr("Poprawna"));
    } else {
      all_correct.push($(this).attr("Błędna"));
    }
    currentQuestion++;
    showQuestion();
  });
}

$(document).ready(()=>{
  $("#battlefield").hide();
  $("#start_button").click(()=>{
    game_on = true;
    $("#battlefield").show();
    $("#starting").hide();
    showQuestion();
  })
});

function end() {
  $("#battlefield").html(`
  <span id="wyniki">${points}/10</span><br>
  <button id="download">Pobierz wyniki</button>
  `);
  $("#download").click(()=>{
    download();
  });
};

