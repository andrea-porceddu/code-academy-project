import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DidactisService } from 'src/app/didactis.service';
import { Student } from 'src/app/DTOs/student';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {

  public students: Student[] = [];
  public student: Student = new Student();
  
  constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) { 
  }

  ngOnInit(): void {
    let obsStudents:Observable<Student[]> = this.service.getStudents();
    obsStudents.subscribe({
      next: s => {
        this.students = s;
      },
      error: err => console.log(err)
    });
  }

  clickMethod(id: number) {
    if(window.confirm("Sicuro di voler eliminare lo studente con ID: "+ id)) {
      console.log(this.remove(id));
    }
  }

  remove(id: number){
    let obsStudent:Observable<Student> = this.service.deleteStudent(id);
    obsStudent.subscribe({
      next: s => {
        this.student = s;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }

}

