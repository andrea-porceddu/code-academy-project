import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseDetailsListComponent } from './courses/course-details-list/course-details-list.component';
import { StudentDetailsListComponent } from './student/student-details-list/student-details-list.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditionAddComponent } from './edition/edition-add/edition-add.component';
import { StudentAddComponent } from './student/student-add/student-add.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherAddComponent } from './teacher/teacher-add/teacher-add.component';
import { TeacherDetailsListComponent } from './teacher/teacher-details-list/teacher-details-list.component';
import { SearchPersonComponent } from './search/search-person/search-person.component';
import { EditionDetailsComponent } from './edition/edition-details/edition-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentDetailsListComponent,
    CourseAddComponent,
    CourseListComponent,
    CourseDetailsListComponent,
    EditionAddComponent,
    TeacherAddComponent,
    TeacherListComponent,
    TeacherDetailsListComponent,
    SearchPersonComponent,
    EditionDetailsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
