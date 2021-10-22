import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DidactisService } from 'src/app/didactis.service';
import { Teacher } from 'src/app/DTOs/teacher';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})

export class TeacherAddComponent implements OnInit {
  teacher: Teacher;
  id: number = 0;

  constructor(private service: DidactisService, private router: Router, private route: ActivatedRoute) {
    this.teacher = new Teacher();
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.service.getTeacherById(this.id)
        .subscribe({
          next: s => {
            this.teacher = s;
          },
          error: err => console.log(err)
        })
    }
  }

  save(form: NgForm) {
    if (this.id == 0) {
      this.service.createTeacher(this.teacher)
        .subscribe({
          next: s => {
            this.teacher = s;
            alert("Docente creato con id: " + this.teacher.id);
            this.router.navigate(["/teachers"])
          },
          error: err => console.log(err)
        });
    }
    else {
      this.service.updateTeacher(this.teacher)
        .subscribe({
          next: s => {
            this.teacher = s;
            alert("Docente aggiornato con id: " + this.teacher.id);
            this.router.navigate(["/teachers"])
          },
          error: err => console.log(err)
        });
    }
  }
  onBack(): void {
    this.router.navigate(["/teachers"])
  }
}
