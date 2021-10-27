import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { DidactisService } from 'src/app/didactis.service';
import { Area } from 'src/app/DTOs/area';
import { Course } from 'src/app/DTOs/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {

  public courses: Course[] = [];
  public course: Course = new Course();
  public searchText: string = "";
  public selectedField: string = "";

  constructor(private service: DidactisService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let obsCourses: Observable<Course[]> = this.service.getCourses();
    obsCourses.subscribe({
      next: cs => {
        this.courses = cs;
        for (const c in this.courses) {
          if (Object.prototype.hasOwnProperty.call(this.courses, c)) {
            let obsArea: Observable<Area> = this.service.getAreaById(this.courses[c].id);
            obsArea.subscribe({
              next: a => this.courses[c].areaName = a.name,
              error: err => console.log(err)
            });
          }
        }
      },
      error: err => console.log(err)
    });
  }

  clickMethod(id: number) {
    if (window.confirm("Sicuro di voler eliminare il corso con ID: " + id)) {
      console.log(this.remove(id));
    }
  }

  remove(id: number) {
    let obsCourse: Observable<Course> = this.service.deleteCourse(id);
    obsCourse.subscribe({
      next: c => {
        this.course = c;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }

  search() {
    let obsCourses: Observable<Course[]> = this.service.getCourses();
    obsCourses.subscribe({
      next: c => {
        this.courses = c;

        var coursesToRemove : Course[] = []; 
        console.log(this.courses.length);
        for (const index in this.courses) {
          console.log(index);
          if (Object.prototype.hasOwnProperty.call(this.courses, index)) {
            const course = this.courses[index];
            if (!course[this.selectedField as keyof Course].toString().toLocaleLowerCase().includes(this.searchText)) {
              coursesToRemove.push(course);
            }
          }
        }

        for (const index in coursesToRemove) {
          if (Object.prototype.hasOwnProperty.call(coursesToRemove, index)) {
            const student = coursesToRemove[index];
            const index2 = this.courses.indexOf(student);
              if (index2 > -1) {
                this.courses.splice(index2, 1);
              }
          }
        }
      },
      error: err => console.log(err)
    });
  }

}
