import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/DTOs/student';
import { DidactisService } from 'src/app/didactis.service';

@Component({
    selector: 'app-student-details-list',
    templateUrl: './student-details-list.component.html',
    styleUrls: ['./student-details-list.component.css']
  })
  export class StudentDetailsListComponent implements OnInit {

    student:Student | undefined;

    constructor(private studentService: DidactisService, private router:Router, private route:ActivatedRoute){

    }
    
    ngOnInit(): void { 
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id!=null)
      {
        this.studentService.getStudentById(id)
        .subscribe({
          next: s => {this.student = s},
          error: error => console.log(error)
        });
      }
    }

    onBack(): void{
      this.router.navigate(["/students"])
    }
  }