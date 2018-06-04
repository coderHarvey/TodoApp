import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import 'rxjs/add/operator/map' ;
import {Todo} from './todo';
import {HttpModule, Http ,Headers} from '@angular/http'


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos :Todo[];

  constructor(private _todoservice:TodoService) { }

  ngOnInit() {
    this.todos= [];
    this._todoservice.gettodos()
    .map(res => res.json())
    .subscribe(todos => this.todos=todos)
  }
  addTodo($event, todoText){
    if($event.which === 1){
      var result;
      var newTodo={
        text: todoText.value,
        isCompleted:false,
      };
      result=this._todoservice.saveTodo(newTodo);
      result.subscribe(x=> {
        this.todos.push(newTodo)
        todoText.value='';
      })
    }
  }

  updateStatus(todo){
    var _todo={
      _id: todo._id,
      text:todo.text,
      isCompleted: !todo.isCompleted
    };
    this._todoservice.updateTodo(_todo)
    .map(res => res.json())
    .subscribe(data => {
      todo.isCompleted= !todo.isCompleted;
    });
    
  }

  deleteTodo(todo){
    var todos=this.todos;

    this._todoservice.deleteTodo(todo._id)
      .map(res=>res.json())
      .subscribe(data => {
        if(data.n==1){
          for(var i=0; i<todos.length;i++){
            if(todos[i].text == todo.text)
            {todos.splice(i,1);}
          }
        }
      })
    }
  }