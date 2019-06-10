import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  articles : Object;

  public show:boolean = false;

  constructor(private data : DataService) { }

  ngOnInit() {
    this.data.getArticles().subscribe(data =>{
      this.articles = data;
    })
  }

  deleteArticle(articleId : string) {
    this.data.deleteArticle(articleId).subscribe(
      result => {
        this.data.getArticles().subscribe(data =>{
          this.articles = data;  
        })
      },
      err => {
        this.data.getArticles().subscribe(data =>{
          this.articles = data;
        })
      }
    );
  }

  toggle() {
    this.show = !this.show;
  }
}
