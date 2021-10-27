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
  public searchText: string = "";
  public selectedField: string = "";

  constructor(private service: DidactisService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let obsStudents: Observable<Student[]> = this.service.getStudents();
    obsStudents.subscribe({
      next: s => {
        this.students = s;
      },
      error: err => console.log(err)
    });
  }

  clickMethod(id: number) {
    if (window.confirm("Sicuro di voler eliminare lo studente con ID: " + id)) {
      console.log(this.remove(id));
    }
  }

  remove(id: number) {
    let obsStudent: Observable<Student> = this.service.deleteStudent(id);
    obsStudent.subscribe({
      next: s => {
        this.student = s;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }

  search() {
    let obsStudents: Observable<Student[]> = this.service.getStudents();
    obsStudents.subscribe({
      next: s => {
        this.students = s;

        var studentsToRemove : Student[] = []; 
        console.log(this.students.length);
        for (const index in this.students) {
          console.log(index);
          if (Object.prototype.hasOwnProperty.call(this.students, index)) {
            const student = this.students[index];
            if (!student[this.selectedField as keyof Student].toString().toLocaleLowerCase().includes(this.searchText)) {
              studentsToRemove.push(student);
            }
          }
        }

        for (const index in studentsToRemove) {
          if (Object.prototype.hasOwnProperty.call(studentsToRemove, index)) {
            const student = studentsToRemove[index];
            const index2 = this.students.indexOf(student);
              if (index2 > -1) {
                this.students.splice(index2, 1);
              }
          }
        }
      },
      error: err => console.log(err)
    });
  }

  detectEmpty() {
    if (this.searchText === "") {
      this.ngOnInit
    }
  }

}

