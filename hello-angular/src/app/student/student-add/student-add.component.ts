import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/didactis.service';
import { Student } from 'src/app/DTOs/student';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})

export class StudentAddComponent implements OnInit {
  student: Student;
  id: number = 0;

  constructor(private service: DidactisService, private router: Router, private route: ActivatedRoute) {
    this.student = new Student();
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.service.getStudentById(this.id)
        .subscribe({
          next: s => {
            this.student = s;
          },
          error: err => console.log(err)
        })
    }
  }

  save(form: NgForm) {
    if (this.id == 0) {
      this.service.createStudent(this.student)
        .subscribe({
          next: s => {
            this.student = s;
            alert("Studente creato con id: " + this.student.id);
            this.router.navigate(["/students"])
          },
          error: err => console.log(err)
        });
    }
    else {
      this.service.updateStudent(this.student)
        .subscribe({
          next: s => {
            this.student = s;
            alert("Studente aggiornato con id: " + this.student.id);
            this.router.navigate(["/students"])
          },
          error: err => console.log(err)
        });
    }
  }
  onBack(): void {
    this.router.navigate(["/students"])
  }
}
