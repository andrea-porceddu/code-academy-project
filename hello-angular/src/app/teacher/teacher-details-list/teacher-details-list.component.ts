import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/app/DTOs/teacher';
import { DidactisService } from 'src/app/didactis.service';

@Component({
    selector: 'app-teacher-details-list',
    templateUrl: './teacher-details-list.component.html',
    styleUrls: ['./teacher-details-list.component.css']
  })
  export class TeacherDetailsListComponent implements OnInit {

    teacher:Teacher | undefined;

    constructor(private teacherService: DidactisService, private router:Router, private route:ActivatedRoute){

    }
    
    ngOnInit(): void { 
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id!=null)
      {
        this.teacherService.getTeacherById(id)
        .subscribe({
          next: s => {this.teacher = s},
          error: error => console.log(error)
        });
      }
    }

    onBack(): void{
      this.router.navigate(["/teachers"])
    }
  }