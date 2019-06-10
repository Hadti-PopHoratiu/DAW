import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  buttonName : string;
  articles : Object;
  category : Object;

  constructor(private data : DataService) { }

  ngOnInit() {
    this.data.getCategory().subscribe(data =>{
      this.category = data;
    })
  }

  getButtonName(buttonName){
    this.buttonName = buttonName;
  }

  firstClick(){
    this.data.getArticles(this.buttonName).subscribe(data =>{
      this.articles = data;
    })
  }

}


