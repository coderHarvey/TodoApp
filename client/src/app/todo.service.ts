import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map' ;
import { Http,Headers,HttpModule } from '@angular/http';

@Injectable()
export class TodoService {

  constructor(public _http:Http ) { }
  
  public gettodos(){
   return this._http.get('http://localhost:4100/api/v1/todos/');
  }
  saveTodo(todo){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post('http://localhost:4100/api/v1/todo',JSON.stringify(todo),{headers:headers})
    .map(res=> res.json());
  }

  updateTodo(todo){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this._http.put('http://localhost:4100/api/v1/todo/'+todo._id+'/',JSON.stringify(todo),{headers:headers});
  } 


  deleteTodo(id){
   return this._http.delete('http://localhost:4100/api/v1/todo/'+id);
  }
}

