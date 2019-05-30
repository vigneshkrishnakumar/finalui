import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  myForm : FormGroup
  status : string = ""
  users : Array<any> = [];
  user : {}
  id : number
  btnType : string = ""
  property = '';
  constructor(private userService : UserService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.fetchUsers();
    this.myForm = new FormGroup({
      'userGroup': new FormGroup({
          'firstName': new FormControl('', [Validators.required], []),
          'lastName': new FormControl('', Validators.required),
          'empId': new FormControl('', Validators.required)
      })
  })
  const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(+id > 0){
        this.id = +id;
        this.getUser(this.id);
        this.btnType = "Update";
    } else {
        this.btnType = "Add";
    }
  }

  fetchUsers() {
    this.userService.fetchUsers()
    .then((res) => {
      console.log(res);
      this.users = res;
    })
  }

  getUser(userId) {
    this.userService.getUser(userId)
    .then((res) => {
      console.log(res);
      this.user = res;
      this.myForm.controls['userGroup']['controls'].firstName.setValue(this.user["firstName"]);
      this.myForm.controls['userGroup']['controls'].lastName.setValue(this.user["lastName"]);
      this.myForm.controls['userGroup']['controls'].empId.setValue(this.user["empId"]);
    })
  }

  onSubmit() {
    this.user = {"firstName":this.myForm.value.userGroup.firstName,
    "lastName":this.myForm.value.userGroup.lastName,
    "empId":this.myForm.value.userGroup.empId}
    if(this.id > 0) {
      this.userService.updateUser(JSON.stringify(this.user), this.id)
          .then(res => {
              console.log(res);
              if (res.userId > 0) {
                this.status = "User Updated Successfully!"
                this.myForm.reset();
                this.fetchUsers();
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
        this.userService.addUser(JSON.stringify(this.user))
        .then(res => {
            console.log(res);
            if (res.userId > 0) {
              this.status = "User Added Successfully!"
              this.myForm.reset();
              this.fetchUsers();
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

  deleteUser(userId) {
    this.userService.deleteUser(userId)
    .then((res) => {
      console.log(res);
      if(res == 200) {
       this.status = "User Deleted Successfully!";
      }
      this.fetchUsers();
    })
  }
  sortBy(prop) {
    this.property = prop; 
  }
  resetForm() {
    this.myForm.reset();
  }
}
