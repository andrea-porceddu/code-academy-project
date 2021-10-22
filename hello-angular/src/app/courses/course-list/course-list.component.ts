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
}
