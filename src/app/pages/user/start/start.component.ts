import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  quizId: any;
  questions:any;
  question:any;
  qindex=0;
  isSubmit= false;
  // //tổng điểm
  // marksGot = 0;

  // //số câu đúng
  // correctAnswers=0;

  // //số câu chọn
  // attempted = 0;

  testInfo={
    attempted:0,
    correctAnswers:0,
    marksGot:0,
    user:{
      username:""
    },
    quiz:{
      title:""
    }
  };

  timer:any;
  constructor(
    private locationSt: LocationStrategy,
    private activeRouter: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    // this.preventBackButton();
    this.quizId = this.activeRouter.snapshot.params.quizId;
    this.getQuestions();
  }

  //không cho phép được quay lại trang cũ kể cả load lại trang cũng sẽ mất nut back
  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  getQuestions() {
    this.questionService.getQuestionsOfQuizForTest(this.quizId).subscribe(
      (questions) => {
        this.questions = questions;
        this.question = this.questions[0];

        this.timer = this.questions.length*60;
       
        this.questions.forEach((question:any) =>{
          question["givenAnswer"]="";
        }) 
        this.startTimer();
      },
      (error) => {}
    );
  }

  
completeQuiz(){
  Swal.fire({
    title: 'Xác nhận nộp bài',
    showCancelButton: true,
    confirmButtonText: `Đồng ý`,
    icon: 'info',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.confirmTest();
    } else if (result.isDenied) {
      
    }
  })
}
nextQuestion(){
  this.qindex +=1;
  this.question = this.questions[this.qindex];
}
backQuestion(){
  this.qindex -=1;
  this.question = this.questions[this.qindex];
}
setQuestion(index:any){
  this.qindex = index;
  this.question = this.questions[this.qindex];
}

// confirmTest(){
// this.isSubmit = true;
// console.log(this.questions);
// this.questionService.evalQuiz(this.questions).subscribe((data:any)=>{
//   this.correctAnswers = data.correctAnswers;
//   this.marksGot= parseFloat(Number(data.marksGot).toFixed(2));
//   this.attempted= data.attempted
// },(error)=>{
  
// })

//   // this.isSubmit = true;
//   //     let markSingle = this.questions[0].quiz.maxMarks/this.questions.length;
//   //     this.questions.forEach((question:any) => {
//   //       if(question.givenAnswer==question.answer){
//   //         this.correctAnswers++;
//   //         this.marksGot += markSingle;
//   //       }
//   //       if(question.givenAnswer!=""){
//   //         this.attempted++;
//   //       }
//   //     })
// }

confirmTest(){
  this.isSubmit = true;
  console.log(this.questions);
  this.testService.evalQuiz(this.questions).subscribe((data:any)=>{
    // this.correctAnswers = data.correctAnswers;
    // this.marksGot= parseFloat(Number(data.marksGot).toFixed(2));
    // this.attempted= data.attempted
    this.testInfo.correctAnswers = data.correctAnswers;
    this.testInfo.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
    this.testInfo.attempted = data.attempted;
    this.testInfo.user.username = data.user.username;
    this.testInfo.quiz.title = data.quiz.title;

    console.log(data);
  },(error)=>{
    
  })
}

  startTimer(){

    let time = window.setInterval(()=>{
      if(this.timer<=0){
        this.confirmTest();
        clearInterval(time);
      }else{
        this.timer--;
        this.getFormattedTime();
      }
    },1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60)
    let ss = this.timer%60;
    // let ss = this.timer-mm*60 ntn cũng dc nè mà hơi loằng ngoằng;
    return `${mm} phút : ${ss} giây`;
  }
  printPage(){
    window.print();
  }

  showAnswer(){
    
  }
}
