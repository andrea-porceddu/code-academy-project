import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Edition } from 'src/app/DTOs/edition';
import { DidactisService } from 'src/app/didactis.service';
import { Location } from '@angular/common'

@Component({
    selector: 'app-edition-details',
    templateUrl: './edition-details.component.html',
    styleUrls: ['./edition-details.component.css']
  })
  export class EditionDetailsComponent implements OnInit {

    edition: Edition;

    constructor(private service: DidactisService, private router:Router, private route:ActivatedRoute, private location: Location){
      this.edition = new Edition();
    }

    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id != null)
      {
        this.service.getEditionById(id)
        .subscribe({
          next: e => {this.edition = e},
          error: error => console.log(error)
        });
      }
      let view = document.getElementById("view");
      view?.addEventListener
    }
    
    onBack(): void{
      this.location.back();
    } 
  }