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

}

