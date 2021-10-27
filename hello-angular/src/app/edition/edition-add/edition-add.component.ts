import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/didactis.service';
import { Course } from 'src/app/DTOs/course';
import { Edition } from 'src/app/DTOs/edition';
import { Teacher } from 'src/app/DTOs/teacher';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edition-add',
  templateUrl: './edition-add.component.html',
  styleUrls: ['./edition-add.component.css']
})
export class EditionAddComponent implements OnInit {
  
  edition: Edition = new Edition();
  course: Course = new Course();
  teachers: Teacher[] = [];
  courses: Course[] = [];
  id: number = 0;

  constructor(private fb: FormBuilder, private service: DidactisService, private router: Router, private route: ActivatedRoute, private location: Location) {
    
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.service.getTeachers()
      .subscribe({
        next: t => { this.teachers = t; },
        error: error => console.log(error)
      });

    this.service.getCourses()
      .subscribe({
        next: t => {
          this.courses = t;
        },
        error: error => console.log(error)
      });

    if (this.id != 0) {
      this.service.getEditionById(this.id)
        .subscribe({
          next: e => {
            this.edition = e;
            this.course = this.courses.filter(course => course.id == e.courseId)[0];
          },
          error: err => console.log(err)
        })
    }
  }

  save(form: NgForm) {
    this.edition.instructorId = Number(form.value.instructorId);
    if (this.id == 0) {
      this.service.createEdition(this.edition)
        .subscribe({
          next: e => {
            alert("Edizione creata con id: " + e.id);
            this.location.back();
          },
          error: error => console.log(error)
        });
    } else {
      this.service.updateEdition(this.edition)
      .subscribe({
        next: e => {
          this.edition = e;
          alert("Edizione aggiornata con id: " + this.edition.id);
          this.location.back();
        },
        error: err => console.log(err)
      });
    }
  }

  onBack(): void {
    this.location.back();
  }
}
