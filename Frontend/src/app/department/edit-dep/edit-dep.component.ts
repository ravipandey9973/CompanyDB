import { Component, Input, OnInit, input } from '@angular/core';
import { ServicesService } from '../../services.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrl: './edit-dep.component.css'
})
export class EditDepComponent implements OnInit {
  @Input() dep:any;
  DepartmentId:string="";
  DepartmentName:string="";
  constructor (private department:ServicesService) {}
  ngOnInit(): void {
   this.DepartmentId=this.dep.DepartmentId;
   this.DepartmentName=this.dep.DepartmentName;
  }
  adddata()
{
  var val ={DepartmentId:this.DepartmentId,DepartmentName:this.DepartmentName}
  this.department.adddeparment(val).subscribe((data:any)=>{
    
    Swal.fire({
      title: "Good job!",
      text: "Added Sucessfully !!",
      icon: "success"
    });
  })
}
updatedata()
{
  var val={DepartmentId:this.DepartmentId,DepartmentName:this.DepartmentName};
  this.department.updatedepartment(val).subscribe((data)=>{
    console.log("Update response:", data); 
    Swal.fire({
      title: "Good job!",
      text: "Update Sucessfully !!",
      icon: "success"
    });
  }
  )
}

}
