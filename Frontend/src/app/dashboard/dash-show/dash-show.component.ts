import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { Subscriber } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dash-show',
  templateUrl: './dash-show.component.html',
  styleUrl: './dash-show.component.css'
})
export class DashShowComponent  implements OnInit{
  userList:any[]=[];
  EditAdd:boolean=false;
  dash:any;
  ModalTitle:string=""

  constructor(private dashboard:ServicesService) {}
  ngOnInit(): void {
   this.getdata(); 
  }
  getdata()
  {
    this.dashboard.getcompany().subscribe((data)=>{
          this.userList=data;
    })
  }
  deletedata (id:any)
  {
    this.dashboard.deletecompany(id.CompanyId).subscribe((data)=>
    {
      this.getdata();
      Swal.fire({
        title: "Good job!",
        text: "Deleted Sucessfully !",
        icon: "success"
      });
    })
  }
  addClick()
  {
  this.dash={
  CompanyId:0,
  ComapnyName:"",
  Department:"",
  Establish:"",
  Address:"",
  PhotoFileName:""
}
this.ModalTitle="Add Company";
this.EditAdd=true;
  }

editClick(item:any)
{
this.dash=item;
this.ModalTitle="Update Company";
this.EditAdd=true;
}
closeClick()
{
  this.EditAdd=false;
  this.getdata();
}
}
