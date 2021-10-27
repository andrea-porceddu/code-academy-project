import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DidactisService } from 'src/app/didactis.service';
import { Teacher } from 'src/app/DTOs/teacher';


@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})

export class TeacherListComponent implements OnInit {

  public teachers: Teacher[] = [];
  public teacher: Teacher = new Teacher();
  public searchText: string = "";
  public selectedField: string = "";
  
  constructor(private service:DidactisService, private router:Router, private route:ActivatedRoute) { 
  }

  ngOnInit(): void {
    let obsteachers:Observable<Teacher[]> = this.service.getTeachers();
    obsteachers.subscribe({
      next: t => {
        this.teachers = t;
      },
      error: err => console.log(err)
    });
  }

  clickMethod(id: number) {
    if(window.confirm("Sicuro di voler eliminare il docente con ID: "+ id)) {
      console.log(this.remove(id));
    }
  }

  remove(id: number){
    let obsTeacher:Observable<Teacher> = this.service.deleteTeacher(id);
    obsTeacher.subscribe({
      next: t => {
        this.teacher = t;
        this.ngOnInit();
      },
      error: err => console.log(err)
    });
  }

  search() {
    let obsTeacher: Observable<Teacher[]> = this.service.getTeachers();
    obsTeacher.subscribe({
      next: t => {
        this.teachers = t;

        var teachersToRemove : Teacher[] = []; 
        console.log(this.teachers.length);
        for (const index in this.teachers) {
          console.log(index);
          if (Object.prototype.hasOwnProperty.call(this.teachers, index)) {
            const teacher = this.teachers[index];
            if (!teacher[this.selectedField as keyof Teacher].toString().toLocaleLowerCase().includes(this.searchText)) {
              teachersToRemove.push(teacher);
            }
          }
        }

        for (const index in teachersToRemove) {
          if (Object.prototype.hasOwnProperty.call(teachersToRemove, index)) {
            const student = teachersToRemove[index];
            const index2 = this.teachers.indexOf(student);
              if (index2 > -1) {
                this.teachers.splice(index2, 1);
              }
          }
        }
      },
      error: err => console.log(err)
    });
  }

}

