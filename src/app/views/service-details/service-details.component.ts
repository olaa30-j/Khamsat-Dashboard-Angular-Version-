import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IService, ServiceService } from '../../services/service/service.service';
import { CommonModule } from '@angular/common';

export interface SingleService{
  service:IService
}

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})

export class ServiceDetailsComponent implements OnInit {
  serviceId: string = '';
  service: SingleService | null = null;
  activeIndex: number = 0; 

  constructor(private activeRoute: ActivatedRoute, private serviceLogic:ServiceService) { }

  ngOnInit(): void {
    this.serviceId = this.activeRoute.snapshot.paramMap.get('id')!;
    this.serviceLogic.getServiceById(this.serviceId).subscribe({
      next:(res:SingleService)=>{        
        this.service = res
      },
      error: (err)=> {
        console.log("cannot fetch" + err);
      }
    })
  }

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }

  nextSlide(): void {
    if(this.service){
      if (this.activeIndex < this.service.service.images.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0; 
      }
    }
  }

  prevSlide(): void {
    if( this.service){
      if (this.activeIndex > 0) {
        this.activeIndex--;
      } else {
        this.activeIndex = this.service.service.images.length - 1;
      }  
    }
  }

  getRandomColor() {
    const colors = [
       '#2add87', '#fbb11c', '#1d4bd8', '#dd2bb9', '#9e10bb'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
