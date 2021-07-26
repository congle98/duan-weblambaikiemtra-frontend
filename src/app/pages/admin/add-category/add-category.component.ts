import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category = {
    title:"",
    description:"",
  }

  constructor(private categoryService: CategoryService,
     private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  addCategory(){
    if(this.category.title ==null || this.category.title ==""){
      this.snack.open("Không được để trống title","X",{
        duration: 2000
      })
      return;
    }
    this.categoryService.addCategory(this.category).subscribe((category) =>{
      this.category.description="";
      this.category.title="";
      Swal.fire("Success!!","tạo mới category thành công","success");
    },
    (err)=>{
      this.snack.open("Có lỗi ","X",{
        duration: 2000
      })
    });
  }

}
