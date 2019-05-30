import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { TaskAddComponent } from './task/task-add/task-add.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskViewComponent } from './task/task-view/task-view.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { TaskService } from './services/task.service';
import { ParentTaskService } from './services/parenttask.service';
import { ProjectService } from './services/project.service';
import { UserService } from './services/user.service';
import { TaskPipe } from './pipes/task.pipe';
import { ProjectPipe } from './pipes/project.pipe';
import { UserPipe } from './pipes/user.pipe';
import { UserSortPipe } from './pipes/usersort.pipe';
import { ProjectSortPipe } from './pipes/projectsort.pipe';
import { TaskSortPipe } from './pipes/tasksort.pipe';

const routes : Routes = [
  { path: '', redirectTo: '/viewTask', pathMatch: 'full' },
  { path: 'viewTask', component: TaskViewComponent},
  { path: 'addTask', component: TaskAddComponent},
  { path: 'addTask/:id', component: TaskAddComponent},
  { path: 'addProject', component: ProjectAddComponent},
  { path: 'addProject/:id', component: ProjectAddComponent},
  { path: 'addUser', component: UserAddComponent},
  { path: 'addUser/:id', component: UserAddComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    ProjectViewComponent,
    TaskAddComponent,
    TaskEditComponent,
    TaskViewComponent,
    UserAddComponent,
    UserEditComponent,
    UserViewComponent,
    ProjectPipe,
    UserPipe,
    TaskPipe,
    UserSortPipe,
    ProjectSortPipe,
    TaskSortPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    ProjectPipe,
    UserPipe,
    TaskPipe,
    UserSortPipe,
    ProjectSortPipe,
    TaskSortPipe,
    TaskService, 
    ParentTaskService, 
    ProjectService, 
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
