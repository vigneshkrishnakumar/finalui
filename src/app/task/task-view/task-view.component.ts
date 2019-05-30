import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { ViewChild, ElementRef} from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;
  tasks : Array<any> = [];
  id : number
  task : any = {}
  status: string = "";
  projects : Array<any> = [];
  project : any = {}
  property : ""
  endDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private projectService : ProjectService, private taskService : TaskService) { }

  ngOnInit() {
    //this.tasks = [{"parentTask":"Parent task 1","newTask":{"taskName":"Task 1","startDate":"2019-03-18","endDate":"2019-04-18","priority":11}}];
  }

  isEnded(date) {
    if(date <= this.endDate) {
      return true;
    } else {
      return false;
    }
  }

  getProjects() {
    this.projectService.fetchProjects()
    .then((res) => {
      console.log(res);
      this.projects = res;
    })
  }

  selectedProject(projectId) {
    this.projectService.getProject(projectId)
    .then((res) => {
      console.log(res);
      this.project = res;
    })
    this.closeModal.nativeElement.click();
  }

  sortBy(prop) {
    this.property = prop; 
  }

  endTask(id) {
    for(let val in this.project.tasks) {
      if(this.project.tasks[val].taskId == id) {
        this.project.tasks[val].endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.project.tasks[val].status = "Completed";
        this.taskService.updateTask(JSON.stringify(this.project.tasks[val]), id)
        .then(res => {
            console.log(res);
            if (res.taskId > 0) {
              this.status = 'Task Ended successfully!!';
            }
        }, err => {
            console.log('server err');
            console.log(err);
        })
        .catch(err => {
            console.log('client err');
            console.log(err);
        })
      }
    }
  }
}
