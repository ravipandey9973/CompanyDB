import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrl: './show-dep.component.css'
})
export class ShowDepComponent  implements OnInit{
  userList:any[]=[];
  dep:any;
  EditAdd:boolean=false;
  ModalTitle:string="";

  constructor (private department:ServicesService){}
  ngOnInit(): void {
    this.getdata();
  }
  getdata()
  {
   this.department.getdepartment().subscribe((data)=>{
    this.userList=data;
   })
  }
deletedata (id:any)
{
  this.department.deletedepartment(id.DepartmentId).subscribe((data)=>{
  this.getdata();
    Swal.fire({
      title: "Good job!",
      text: "Deleted Sucessfully !!",
      icon: "success"
    });
  })
 
}
addClick()
{
 this.dep={
  DepartmentId:0,
  DepartmentName:""
 }
  this.ModalTitle="Add Department";
  this.EditAdd=true;

}
editClick(item:any)
{
 this.dep=item;
  this.ModalTitle="Update Department";
  this.EditAdd=true;
}
clickClose()
{
  this.EditAdd=false;
  this.getdata();
}


}

