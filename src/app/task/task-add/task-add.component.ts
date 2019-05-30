import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { ParentTaskService } from 'src/app/services/parenttask.service';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  @ViewChild('closeProjectModal') closeProjectModal: ElementRef;
  @ViewChild('closeUserModal') closeUserModal: ElementRef;
  @ViewChild('closeParentModal') closeParentModal: ElementRef;
  myForm : FormGroup
  status : string = ""
  error : string = ""
  task : {}
  enableParent : boolean = false;
  projects : Array<any> = [];
  project : any = {}
  users : Array<any> = [];
  user : any = {}
  parents : Array<any> = [];
  parent : any = {}
  isReadOnly : boolean = true;
  id : number
  btnType : string = ""
  constructor(private parentService : ParentTaskService, private taskService : TaskService, 
    private projectService : ProjectService, private userService : UserService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'taskGroup': new FormGroup({
          'project': new FormControl('', Validators.required),
          'taskName': new FormControl('', [Validators.required], []),
          'priority': new FormControl('', Validators.required),
          'parentTask': new FormControl('', Validators.required),
          'startDate': new FormControl('', Validators.required),
          'endDate': new FormControl('', Validators.required),
          'user': new FormControl('', Validators.required),
          'parentCheck': new FormControl('', Validators.required)
      })
  })
  console.log(this.enableParent);
  this.myForm.controls['taskGroup']['controls'].startDate.setValue(this.currentDate());
  this.myForm.controls['taskGroup']['controls'].endDate.setValue(this.endDate());
  this.myForm.statusChanges.subscribe((enableParent:any) => console.log(enableParent));
  const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(+id > 0){
        this.id = +id;
        this.getTask(this.id);
        this.btnType = "Update";
    } else {
        this.btnType = "Add";
    }
  }

  getTask(taskId) {
    this.taskService.getTask(taskId)
    .then((res) => {
      console.log(res);
      this.task = res;
      this.myForm.controls['taskGroup']['controls'].taskName.setValue(this.task["taskName"]);
      this.myForm.controls['taskGroup']['controls'].priority.setValue(this.task["priority"]);
      this.myForm.controls['taskGroup']['controls'].startDate.setValue(this.task["startDate"]);
      this.myForm.controls['taskGroup']['controls'].endDate.setValue(this.task["endDate"]);
      this.getUser(this.task["userId"]);
      this.getProject(this.task["projectId"]);
      this.getParentTask(this.task["parentId"]);
    })
  }

  currentDate() {
    const currentDate = new Date();
    console.log(currentDate.getDate() + 1);
    return currentDate.toISOString().substring(0,10);
  }
  endDate() {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    console.log(currentDate.getDate());
    return currentDate.toISOString().substring(0,10);
  }

  handleChange(value: boolean) {
    console.log('value '+value);
    if(value) {
        this.myForm.controls['taskGroup']['controls'].project.disable();
        this.myForm.controls['taskGroup']['controls'].taskName.disable();
        this.myForm.controls['taskGroup']['controls'].priority.disable();
        this.myForm.controls['taskGroup']['controls'].startDate.disable();
        this.myForm.controls['taskGroup']['controls'].endDate.disable();
        this.isReadOnly = false;
    } else {
        this.myForm.controls['taskGroup']['controls'].project.enable();
        this.myForm.controls['taskGroup']['controls'].taskName.enable();
        this.myForm.controls['taskGroup']['controls'].priority.enable();
        this.myForm.controls['taskGroup']['controls'].startDate.enable();
        this.myForm.controls['taskGroup']['controls'].endDate.enable();
        this.isReadOnly = true;
    }
  }
  resetForm() {
    this.myForm.reset();
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
    this.closeProjectModal.nativeElement.click();
  }

  getProject(projectId) {
    this.projectService.getProject(projectId)
    .then((res) => {
      console.log(res);
      this.project = res;
    })
  }

  getUsers() {
    this.userService.fetchUsers()
    .then((res) => {
      console.log(res);
      this.users = res;
    })
  }
  
  selectedUser(userId) {
    this.userService.getUser(userId)
    .then((res) => {
      console.log(res);
      this.user = res;
    })
    this.closeUserModal.nativeElement.click();
  }

  getUser(userId) {
    this.userService.getUser(userId)
    .then((res) => {
      console.log(res);
      this.user = res;
    })
  }

  getParentTasks() {
    this.parentService.fetchParentTasks()
    .then((res) => {
      console.log(res);
      this.parents = res;
    })
  }
  
  selectedParentTask(parentId) {
    this.parentService.getParentTask(parentId)
    .then((res) => {
      console.log(res);
      this.parent = res;
    })
    this.closeParentModal.nativeElement.click();
  }

  getParentTask(parentId) {
    this.parentService.getParentTask(parentId)
    .then((res) => {
      console.log(res);
      this.parent = res;
    })
  }

  onSubmit() {
    let dateCheck = this.validateDate(this.myForm.value.taskGroup.startDate, this.myForm.value.taskGroup.endDate);
    if(!dateCheck) {
      if(this.isReadOnly) {
        this.task = {"taskName":this.myForm.value.taskGroup.taskName,
        "startDate":this.myForm.value.taskGroup.startDate,
        "endDate":this.myForm.value.taskGroup.endDate,
        "priority":this.myForm.value.taskGroup.priority, 
        "status":"In Progress",
        "parentId":this.parent.parentId,
        "projectId":this.project.projectId,
        "userId":this.user.userId}
        if(this.id > 0) {
          this.taskService.updateTask(JSON.stringify(this.task), this.id)
            .then(res => {
                console.log(res);
                if (res.taskId > 0) {
                  this.status = "Task Updated Successfully!"
                  this.myForm.reset();
                }
            }, err => {
                console.log('server err');
                console.log(err);
            })
            .catch(err => {
                console.log('client err');
                console.log(err);
            })
        } else {
            this.taskService.addTask(JSON.stringify(this.task))
            .then(res => {
                console.log(res);
                if (res.taskId > 0) {
                  this.status = "Task Added Successfully!"
                  this.myForm.reset();
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
      } else {
        this.task = {"parentTask":this.myForm.value.taskGroup.parentTask}
        this.parentService.addTask(JSON.stringify(this.task))
          .then(res => {
              console.log(res);
              if (res.parentId > 0) {
                this.status = "Parent Task Added Successfully!"
                this.myForm.reset();
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
    } else {
      this.error = "Task End Date should be greater than Start Date!"
    }
  }
  validateDate(startDate, endDate) {
    var fDate = new Date(startDate);
    var lDate = new Date(endDate);
    if(lDate <= fDate) {
        return true;
    } else {
        return false;
    }
  }
}
