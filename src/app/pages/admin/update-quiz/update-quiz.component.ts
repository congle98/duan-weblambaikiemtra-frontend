import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  quiz: any;
  categories: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private router:Router
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    this.getQuiz(id);
    this.getCategories();
  }

  getQuiz(id: any) {
    this.quizService.getQuizById(id).subscribe(
      (quiz) => {
        this.quiz = quiz;
        console.log(this.quiz);
      },
      (error) => {
        Swal.fire('error!!', 'có lỗi gì đó rồi', 'error');
      }
    );
  }
  getCategories() {
    this.categoryService.categories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        Swal.fire('error!!', 'có lỗi gì đó rồi', 'error');
      }
    );
  }

  updateQuiz() {
    this.quizService.updateQuiz(this.quiz).subscribe((data) => {
      Swal.fire('susscess!!', 'update quiz thành công', 'success').then((result)=>{
        this.router.navigate(["/admin/quizzes"]);
      });
    },
     (err) => {  Swal.fire('error!!', 'có lỗi gì đó rồi', 'error');}
    )
  }
}
