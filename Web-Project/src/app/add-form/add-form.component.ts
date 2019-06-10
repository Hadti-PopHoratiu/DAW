import { ArticolModel } from './../articol-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from './../data.service';
import { AdminComponent } from "./../admin/admin.component";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  article: ArticolModel;
  categoryPost: Object;

  articleForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    category_id: new FormControl(null),
    image: new FormControl(''),
    description: new FormControl('')
  });

  categories = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(private data: DataService, private adminComp: AdminComponent) { }
  ngOnInit() {
    this.data.getCategory().subscribe(data => {
      this.categoryPost = data;
    })
  }
  onSubmit() {

    this.article = this.articleForm.value;
    this.article.category_id = Number(this.article.category_id);
    this.article.insert_date = formatDate(new Date(), 'yyyy/MM/dd', 'en');

    this.data.postArticle(this.article).subscribe(
      result => {
        this.data.getArticles().subscribe(data => {
          this.adminComp.articles = data;
        })
      },
      err => {
        this.data.getArticles().subscribe(data => {
          this.adminComp.articles = data;
        });
      });
  }
};
