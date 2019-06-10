import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  getArticles(category_name ?: string){
    if  (category_name == 'Web'){
      return this.http.get('http://localhost:3000/api/article?category_id=1');
    }else if (category_name == 'News')
    {
      return this.http.get('http://localhost:3000/api/article?category_id=2');
    }else if (category_name == 'Sports')
    {
      return this.http.get('http://localhost:3000/api/article?category_id=3');
    }else if (category_name == 'Finance')
    {
      return this.http.get('http://localhost:3000/api/article?category_id=4');
    }else if (category_name == 'Politics')
    {
      return this.http.get('http://localhost:3000/api/article?category_id=5');
    }else if (category_name == 'Tech')
    {
      return this.http.get('http://localhost:3000/api/article?category_id=6');
    }else if (category_name == 'TV')
    {
      return this.http.get('http://localhost:3000/api/article?category_id=7');
    }else if (category_name == 'Movies')
    {
      return this.http.get('http://localhost:3000/api/article?category_id=8');
    }else {
      return this.http.get('http://localhost:3000/api/article');
    }
    
  }

  getArticle(id : number){
    return this.http.get('http://localhost:3000/api/article/' + id);
  }

  getCategory(){
    return this.http.get('http://localhost:3000/api/category');
  }

  deleteArticle(id : string){
    return this.http.delete('http://localhost:3000/api/article/'+ id);
  }

  postArticle(article : Object){
    return this.http.post('http://localhost:3000/api/article', article );
  }

  putArticle(id : number, article : Object){
    return this.http.put('http://localhost:3000/api/article/'+ id, article);
  }
  
}
