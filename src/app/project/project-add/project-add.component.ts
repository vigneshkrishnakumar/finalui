import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  @ViewChild('closeUserModal') closeUserModal: ElementRef;
  status : string = ""
  error : string = ""
  myForm : FormGroup
  projects : Array<any> = [];
  project : any = {}
  users : Array<any> = [];
  user : any = {}
  taskCount = 0 
  enableDate : boolean = false;
  id : number
  btnType : string = ""
  property : ""
  constructor(private projectService : ProjectService, private userService : UserService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      'projectGroup': new FormGroup({
          'project': new FormControl('', [Validators.required], []),
          'priority': new FormControl('', Validators.required),
          'user': new FormControl('', Validators.required),
          'startDate': new FormControl('', Validators.required),
          'endDate': new FormControl('', Validators.required)
      })
  })
  this.myForm.controls['projectGroup']['controls'].startDate.setValue(this.currentDate());
  this.myForm.controls['projectGroup']['controls'].endDate.setValue(this.endDate());
  this.fetchProjects();
  const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(+id > 0){
        this.id = +id;
        this.getProject(this.id);
        this.btnType = "Update";
    } else {
        this.btnType = "Add";
    }
  }
  
  getProject(projectId) {
    this.projectService.getProject(projectId)
    .then((res) => {
      console.log(res);
      this.project = res;
      this.myForm.controls['projectGroup']['controls'].project.setValue(this.project["project"]);
      this.myForm.controls['projectGroup']['controls'].priority.setValue(this.project["priority"]);
      this.myForm.controls['projectGroup']['controls'].user.setValue(this.project["managerName"]);
      this.myForm.controls['projectGroup']['controls'].startDate.setValue(this.project["startDate"]);
      this.myForm.controls['projectGroup']['controls'].endDate.setValue(this.project["endDate"]);
      this.getUser(this.project["managerId"]);
    })
  }

  fetchProjects() {
    this.projectService.fetchProjects()
    .then((res) => {
      console.log(res);
      this.projects = res;
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

  onSubmit() {
    let dateCheck = this.validateDate(this.myForm.value.projectGroup.startDate, this.myForm.value.projectGroup.endDate);
    if(!dateCheck) {
      this.project = {"project":this.myForm.value.projectGroup.project,
        "startDate":this.myForm.value.projectGroup.startDate,
        "endDate":this.myForm.value.projectGroup.endDate,
        "priority":this.myForm.value.projectGroup.priority, 
        "managerId":this.user.userId}
        if(this.id > 0) {
          this.projectService.updateProject(JSON.stringify(this.project), this.id)
              .then(res => {
                  console.log(res);
                  if (res.projectId > 0) {
                    this.status = "Project Updated Successfully!"
                    this.myForm.reset();
                    this.fetchProjects();
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
            this.projectService.addProject(JSON.stringify(this.project))
            .then(res => {
                console.log(res);
                if (res.projectId > 0) {
                  this.status = "Project Added Successfully!"
                  this.myForm.reset();
                  this.fetchProjects();
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
        this.error = "Project End Date should be greater than Start Date!"
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

  deleteProject(projectId) {
    this.projectService.deleteProject(projectId)
    .then((res) => {
      console.log(res);
      if(res == 200) {
       this.status = "Project Suspended Successfully!";
      }
      this.fetchProjects();
    })
  }

  sortBy(prop) {
    this.property = prop; 
  }

  resetForm() {
    this.myForm.reset();
  }
}
