import { QuizService } from './../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  quiz = {
    title: '',
    description: ' ',
    maxMarks: ' ',
    numberOfQuestion: ' ',
    active: true,
    category: {},
  };

  categories: any;
  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.categories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        Swal.fire('error!!', 'lỗi load dữ liệu server', 'error');
      }
    );
  }

  addQuiz() {
    console.log(this.quiz);
    this.quizService.addQuiz(this.quiz).subscribe((quiz) => {
      Swal.fire('Sussess!!', 'tạo mới quiz thành công', 'success');
      this.quiz = {
        title: '',
        description: ' ',
        maxMarks: ' ',
        numberOfQuestion: ' ',
        active: true,
        category: {},
      };
    });
  }
}
