
const quizStore=[{question:"Who was the 2nd President of the United States?", answers:["Thomas Jefferson","Abraham Lincoln", "James Madison", "John Adams"], corrAnswer:"John Adams"},
{question:"Who was the only president to serve more than two terms?", answers:["Teddy Roosevelt","George Washington", "Thomas Jefferson", "Franklin D. Roosevelt"], corrAnswer:"Franklin D. Roosevelt"},
 {question:"Which of these presidents served 2 terms?", answers:["Ronald Reagan","George H. W. Bush", "James E. Carter", "Herbert Hoover"], corrAnswer:"Ronald Reagan"},
{question:" The only president ever to resign from office.", answers:["Andrew Johnson","Millard Fillmore", "Richard Nixon", "James Garfield"], corrAnswer:"Richard Nixon"},
{question:"Which president was earlier the Commander in Chief of the Continental Army?", answers:["George Washington","John Adams", "James Madison", "James Monroe"], corrAnswer:"George Washington"},
{question:" This president was earlier the Commanding General of the US Army, leading the Union Army       over the Confederacy in the Civil War.", answers:["Zachary Taylor","Franklin Pierce", "Dwight D. Eisenhower", "Ulysses S. Grant"], corrAnswer:"Ulysses S. Grant"},
{question:"Donald J. Trump will be the _____ President.", answers:["43rd","44th", "45th", "46th"], corrAnswer:"45th"},
{question:"This president who was sworn in after Abraham Lincoln was assasinated and was later impeached.", answers:["Ulysses S. Grant","Andrew Johnson", "Zachary Taylor", "Millard Fillmore"], corrAnswer:"Andrew Johnson"},
{question:"He was was a five-star general in the United States Army during World War II, and served as Supreme Commander of the Allied Forces in Europe after the war.", answers:["John F. Kennedy","Lyndon B. Johnson", "Dwight D. Eisenhower", "George H.W. Bush"], corrAnswer:"Dwight D. Eisenhower"},
{question:"Which of these presidents was NOT sworn in from the office of Vice-President?", answers:[" Andrew Johnson","Gerald R. Ford", "George H.W. Bush", "Lyndon B. Johnson"], corrAnswer:"George H.W. Bush"}];

//Index to count question numbers
let currentQuestionIndex=0;
//Variable to store Score of individual quiz takers
let score=0;

//Function to start quiz App
function startQuizApp(){
  $('#questions-wrapper').html(`<p>Ready to take U.S. Presidents Quiz? Click Start to get started.<p><button id="start" type="submit">Start</button>`);
   $('#start').on('click',  function(event){
     //prevent default behavior
     event.preventDefault();
      quizApp();

   });
 }

//responsible for generating question and answers
function generateQuestion(quesIndex){
  quesIndex = currentQuestionIndex;
  let questionToAsk = quizStore[quesIndex].question;
  let ansToDisplay1 = quizStore[quesIndex].answers[0];
  let ansToDisplay2 = quizStore[quesIndex].answers[1];
  let ansToDisplay3 = quizStore[quesIndex].answers[2];
  let ansToDisplay4 = quizStore[quesIndex].answers[3];

   console.log("score=" + score);
   console.log("current question index="+ currentQuestionIndex);
   console.log("generateQuestion ran");
    return `<form id="quizQuestionAndAnswers">
            <div class='row'>
            <div class="col-12">
            <div class='question-selection'>
              <label for="question"><h2>Question: (${currentQuestionIndex+1}/10) </h2></label>
              <p><h3>${questionToAsk}</h3></p>
            </div>
            </div>

           <div class="col-12">
           <div class="possibleAnswers">
            <input type="radio" id="ans1" name="answers" value="${ansToDisplay1}">
             <label for="possible-Answers1">${ansToDisplay1}</label><br/>
            </div>

            <div class="col-12">
             <input type="radio" id="ans2" name="answers" value="${ansToDisplay2}">
             <label for="possible-Answer2">${ansToDisplay2}</label><br/>
            </div>


            <div class="col-12">
             <input type="radio" id="ans3" name="answers" value="${ansToDisplay3}">
             <label for="possible-Answer3">${ansToDisplay3}</label><br/>
            </div>

            <div class="col-12">
             <input type="radio" id="ans4" name="answers" value="${ansToDisplay4}">
             <label for="possible-Answer4">${ansToDisplay4}</label><br/>
            </div>
           </div>

           <div class='row'>
           <div class="col-12">
            <button id="submitAnswer" type="submit">Submit</button>
            <label for="scoreDisplay"><h5>Score: (${score}/10) </h5></label>
           </div>
           </div>

       </div>
       </div>

          </form>`;

}


//Generate question in html format
function createQuestionHtml(){
  console.log("createQuestionHtml ran");
  const questionGenerated = generateQuestion(currentQuestionIndex);
  $('#questions-wrapper').html(questionGenerated);

}


// Feedback Page to let the user know if they answered right/wrong /need an answer
function giveFeedback(){

  $('#quizQuestionAndAnswers').on('click', '#submitAnswer', function(event){
     let ansSelected=$('input[name="answers"]:checked').val();
     event.preventDefault();


    console.log("giveFeedback Ran");
    let correctAnswer= quizStore[currentQuestionIndex].corrAnswer;
    console.log("ansSelected ="+ ansSelected);
    console.log("correctAnswer=" +correctAnswer);
    $('#quizQuestionAndAnswers').remove();

    // If user selected correct answer
    if(ansSelected === correctAnswer )
    {
      console.log(ansSelected);
      console.log("Great job! You got the correct answer.");
      $('#questions-wrapper').html(`<h2>Correct Answer </h2><img src="https://static8.depositphotos.com/1007989/858/i/950/depositphotos_8587097-stock-photo-okay-smiley.jpg" alt="Yay! Right Answer" width=25% height=25%></img><button id="continue1" name="continue" type="submit">Continue</button>`);
      score +=1;
      console.log("score = " + score+"/10");

    }
    //If user didnt select an answer but just clicked submit
    else if(ansSelected === undefined ){
      console.log("Sorry choose an answer");


    $('#questions-wrapper').html(`<h2>Sorry, choose an Answer.</h2><img src="http://www.pictish-brewing.co.uk/wp-content/uploads/2016/01/thinking1.jpg" alt="Choose an answer" width=25% height=25%></img><button id ="continue2" name="goback" type="submit">GoBack</button>`);

    }
    //User selected wrong answer
    else{
      console.log("Sorry the right answer is: "+correctAnswer);

    $('#questions-wrapper').html(`<h2>Sorry, wrong Answer.</h2><h3> Correct Answer: ${correctAnswer} </h3><img src="https://i.pinimg.com/736x/ee/17/e1/ee17e16c7a166cd5c1b221c07ff84ebf--symbols-emoticons-smiley-faces.jpg" alt="Sorry wrong answer" width=25% height=25%></img><button id="continue1" name="continue" type="submit">Continue</button>`);

    }
  });
}

//Handle next question display
function setupContinueButton(){
 //If the user selected right/wrong answer and pressed continue button
  $('#questions-wrapper').on('click', '#continue1', function(event){

    event.preventDefault();

    currentQuestionIndex +=1;
    console.log("currentQuestionIndex in Continue");

     if (currentQuestionIndex<quizStore.length)
     {
      $('#quizQuestionAndAnswers').remove();
      createQuestionHtml();
      giveFeedback();
     }
     else{
      console.log('detected end of quiz')
      endQuizForm();
     }

   });

     //If the user didnot select  answer and press goback button
     $('#questions-wrapper').on('click', '#continue2', function(event){

        event.preventDefault();

      console.log("currentQuestionIndex in go back");
      $('#quizQuestionAndAnswers').remove();
      createQuestionHtml();
      giveFeedback();
  });

  }

  //final page of quiz App
  function endQuizForm(){
     console.log("endQuizForm ran");
    $('#questions-wrapper').html(`<h4>Great Job! Your score is ${score}/10. </h4><p>Please click Start over to try the quiz again.</p><button id="again" type="submit">Start Over</button>`);

    //restart Quiz
    $('#again').on('click', function(event){
      event.preventDefault();
      $('#quizQuestionAndAnswers').remove();
      currentQuestionIndex=0;
      score=0;
      restartQuiz();
    })

  }

 //function that handles jquery part
  function quizApp(){
    createQuestionHtml();
    giveFeedback();
    setupContinueButton();
  }

  //function to restart quiz
  function restartQuiz(){
    createQuestionHtml();
    giveFeedback();
  }

$(startQuizApp());
