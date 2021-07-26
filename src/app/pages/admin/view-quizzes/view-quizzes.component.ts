import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any = [];
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  getAllQuizzes() {
    this.quizService.quizzes().subscribe(
      (quizzes) => {
        this.quizzes = quizzes;
        console.log(quizzes);
      },
      (err) => {
        Swal.fire('error!', 'Errorloadingdata!', 'error');
      }
    );
  }

  // deleteQuiz(id: any) {
  //   this.quizService.deleteQuiz(id).subscribe(
  //     (data) => {
  //       this.quizzes = this.quizzes.filter((q:any) => q.id != id)
  //       Swal.fire('success!!', 'xoá quiz thành công', 'success');
  //     },
  //     (err) => {
  //       Swal.fire('error!!', 'có lỗi gì đó rùi', 'error');
  //     }
  //   );
  // }

  deleteQuiz(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'xác nhận xoá ',
      confirmButtonText: 'Xoá',
      showCancelButton: true,
      cancelButtonText: 'quay lại',
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(id).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((q: any) => q.id != id);
            Swal.fire('success!!', 'xoá quiz thành công', 'success');
          },
          (err) => {
            Swal.fire('error!!', 'có lỗi gì đó rùi', 'error');
          }
        );
      }

      //trường hợp mà huỷ thì vào đây cũng dc
      // if(result.isDismissed){
      //   alert("ahihi test cái")
      // }
    });
    // this.quizService.deleteQuiz(id).subscribe(
    //   (data) => {
    //     this.quizzes = this.quizzes.filter((q:any) => q.id != id)
    //     Swal.fire('success!!', 'xoá quiz thành công', 'success');
    //   },
    //   (err) => {
    //     Swal.fire('error!!', 'có lỗi gì đó rùi', 'error');
    //   }
    // );
  }
}
