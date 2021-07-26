import { WelcomeComponent } from './../welcome/welcome.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  quizId:any;
  quizTitle:any;
  question = {
    quiz:{
      id:0
    },
    content:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:""
  }
  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private router:Router) { }

  ngOnInit(): void {
    this.quizId= this.activatedRoute.snapshot.params.quizId;
    this.quizTitle = this.activatedRoute.snapshot.params.quizTitle;
    this.question.quiz.id=this.quizId;
  }

  addQuestion(){

    this.questionService.addQuestion(this.question).subscribe((question)=>{
      Swal.fire( { icon: 'info',
      title: 'Thêm thành công',
      confirmButtonText: 'Tiếp tục',
      showCancelButton: true,
      cancelButtonText: 'Quay lại quản lý quiz',})
      .then((result)=>{
        if(result.isDismissed){
          this.router.navigate(["/admin/quizzes"]);
        }
      });
          this.question.content="";
          this.question.option1="";
          this.question.option2="";
          this.question.option3="";
          this.question.option4="";
          this.question.answer="";
    },
    (error)=>{
      Swal.fire("error!!","có lỗi gì đó rùi","error");
    })
  }

}
