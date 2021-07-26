import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  quizId: any;
  quiz:any
  constructor(private activatedRoute: ActivatedRoute, private quizService:QuizService, private router:Router) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params.quizId;
    this.getQuiz();
  }

  getQuiz(){
    this.quizService.getQuizById(this.quizId).subscribe((quiz)=>{
        this.quiz = quiz;
    },(err)=>{})
  }

  startQuiz(){
    Swal.fire({
      title: 'Bắt đầu bài kiểm tra nhé ',
      showCancelButton: true,
      confirmButtonText: `Start`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start/'+this.quizId]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
