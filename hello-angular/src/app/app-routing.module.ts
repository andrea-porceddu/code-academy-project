import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseDetailsListComponent } from './courses/course-details-list/course-details-list.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { EditionAddComponent } from './edition/edition-add/edition-add.component';
import { EditionDetailsComponent } from './edition/edition-details/edition-details.component';
import { HomeComponent } from './home/home.component';
import { StudentAddComponent } from './student/student-add/student-add.component';
import { StudentDetailsListComponent } from './student/student-details-list/student-details-list.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { TeacherAddComponent } from './teacher/teacher-add/teacher-add.component';
import { TeacherDetailsListComponent } from './teacher/teacher-details-list/teacher-details-list.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent , data: { animationState: 'One' }},
  
  { path: 'students', component: StudentListComponent, data: { animationState: 'Two' } },

  { path: 'courses', component: CourseListComponent, data: { animationState: 'Three' } },

  { path: 'teachers', component: TeacherListComponent, data: { animationState: 'Four' } },

  { path: 'addcourse/:id', component: CourseAddComponent, data: { animationState: 'Add' } },

  { path: 'addstudent/:id', component: StudentAddComponent, data: { animationState: 'Add' } },

  { path: 'addteacher/:id', component: TeacherAddComponent, data: { animationState: 'Add' } },
  
  { path: 'coursedetails/:id', component: CourseDetailsListComponent, data: { animationState: 'ThreeDetails' }},

  { path: 'studentdetails/:id', component: StudentDetailsListComponent, data: { animationState: 'TwoDetails' }},
  
  { path: 'teacherdetails/:id', component: TeacherDetailsListComponent, data: { animationState: 'FourDetails' }},

  { path: 'addedition/:id', component: EditionAddComponent, data: { animationState: 'ThreeDetailsAddEdition' }},

  { path: 'editiondetails/:id', component: EditionDetailsComponent, data: { animationState: 'ThreeDetailsEdition' }},

  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
