import { Component, OnInit } from '@angular/core';
import { UselessTask } from '../models/UselessTask';
import {HttpClient} from "@angular/common/http";
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {

  title = 'labo.signalr.ng';
  tasks: UselessTask[] = [];
  taskname: string = "";

  ngOnInit(): void {
    this.updateTasks();
  }
  constructor(public http: HttpClient){}

  async complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur (Contrôleur d'API)
    let result = await lastValueFrom(this.http.get<any>('http://localhost:5042/api/UselessTasks/Complete/'+id));
    console.log(result)
  }

  async addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur (Contrôleur d'API)
    let result = await lastValueFrom(this.http.post<any>('http://localhost:5042/api/UselessTasks/Add?taskText='+this.taskname,null));
    console.log(result)
  }

  async updateTasks() {
    // TODO: Faire une première implémentation simple avec un appel au serveur pour obtenir la liste des tâches
    // TODO: UNE FOIS QUE VOUS AVEZ TESTER AVEC DEUX CLIENTS: Utiliser le polling pour mettre la liste de tasks à jour chaque seconde
    this.tasks = await lastValueFrom(this.http.get<any>('http://localhost:5042/api/UselessTasks/GetAll'));
    setTimeout(()=> {this.updateTasks()},500)
  }
}
