import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  cateId: any;
  quizzes: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    // this.cateId = this.activatedRoute.snapshot.params.cateId; nếu làm ntn thì sẽ bị lỗi khi nhấn các button các loại quiz trong sidebar thì cateId vẫn ko cập nhật lại được

    this.activatedRoute.params.subscribe((params) => {
      this.cateId = params.cateId;
      if (this.cateId == 0) {
        this.quizService.getActiveQuizzes().subscribe(
          (quizzes) => {
            this.quizzes = quizzes;
          },
          (error) => {}
        );
      } else {
        this.quizService.getActiveQuizzesOfCategory(this.cateId).subscribe((quizzes) => {
          this.quizzes = quizzes;
        }, (error) => {})

      }
    });
  }
}
