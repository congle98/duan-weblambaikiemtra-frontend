import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any = [
   
  ];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((categories)=>{
      this.categories = categories;
    },
    (err)=>{
      Swal.fire("error!!","serve error loading data","error");
    }
    
    )
  }

}
