import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DidactisService } from 'src/app/didactis.service';
import { Course } from 'src/app/DTOs/course';
import { Edition } from 'src/app/DTOs/edition';
import { Level } from 'src/app/DTOs/level';

@Component({
  selector: 'app-course-details-list',
  templateUrl: './course-details-list.component.html',
  styleUrls: ['./course-details-list.component.css']
})
export class CourseDetailsListComponent implements OnInit {

  course: Course | undefined;
  editions: Edition[] = [];

  constructor(private service: DidactisService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != null) {
      this.service.getCourseById(id)
        .subscribe({
          next: c => { this.course = c },
          error: error => console.log(error)
        });
      this.service.getEditionsByCourseId(id)
        .subscribe({
          next: ces => this.editions = ces,
          error: error => console.log(error)
        });
    }
    let view = document.getElementById("view");
    view?.addEventListener
  }

  clickMethod(id: number) {
    if (window.confirm("Sicuro di voler eliminare il corso con ID: " + id)) {
      console.log(this.remove(id));
    }
  }

  remove(id: number) {
    let obsEdition: Observable<Edition> = this.service.deleteEdition(id);
    obsEdition.subscribe({
      next: e => {
        this.editions[id] = e;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }

  onBack(): void {
    this.router.navigate(["/courses"])
  }
}