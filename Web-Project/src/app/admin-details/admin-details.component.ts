import { ArticolModel } from './../articol-model';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {

  id:number;
  private sub: any;
  articlePut : Object;
  article : ArticolModel;
  categoryPost : Object;
  returnAdmin : string;

  articleForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    category_id: new FormControl(''),
    image: new FormControl(''),
    description: new FormControl('')
  });

  categories = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(private route : ActivatedRoute, private data : DataService, private router : Router) { 

  }

  ngOnInit() {
    this.returnAdmin = '/admin';

    this.sub = this.route.params.subscribe(params =>{
      this.id = params['id'];
      this.data.getCategory().subscribe(data =>{
        this.categoryPost = data;
        this.data.getArticle(this.id).subscribe(data =>{
          this.articlePut = data;
          this.articleForm.setValue({
            title: this.articlePut[0].title,
            author : this.articlePut[0].author,
            category_id : this.articlePut[0].category_id,
            image : this.articlePut[0].image,
            description : this.articlePut[0].description
          });
        })
      })
    }) 
  }

  onSubmit() {
    this.article = this.articleForm.value;
    this.article.category_id = Number(this.article.category_id);
    this.article.insert_date = formatDate(new Date(), 'yyyy/MM/dd', 'en');

    this.data.putArticle(this.id, this.article).subscribe(
      result => {this.router.navigate([this.returnAdmin])},
      err => {this.router.navigate([this.returnAdmin])}
    );
  }


}
