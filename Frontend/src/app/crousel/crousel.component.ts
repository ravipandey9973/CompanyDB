import { Component } from '@angular/core';

@Component({
  selector: 'app-crousel',
  templateUrl: './crousel.component.html',
  styleUrl: './crousel.component.css'
})
export class CrouselComponent {
  slides=[
    {img:"assets/n1.jpg"},
    {img:"assets/n2.jpg"},
    {img:"assets/n3.jpg"},
    {img:"assets/n4.jpg"},
    {img:"assets/n5.jpg"}, 
  
   ];
   slideConfig ={
     "slidesToShow":4,
     "slidesToScroll":4,
     "autoplay":true,
     "autoplaySpeed":500,
     "pauseOnHover":true,
     "infinite":true,
     "responsive": [
       {
         "breakpoint":992,
         "setting":{
           "arrows":true,
           "infinite":true,
           "slidesToShow":3,
           "slideToScroll":3
         }
       },
       {
         "breakpoint":756,
         "setting":{
           "arrows":true,
           "infinite":true,
           "slideToShow":1,
           "slideToScroll":true
         }
       }
     ]
   
   };
}
