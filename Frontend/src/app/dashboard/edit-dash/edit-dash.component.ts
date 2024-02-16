import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-dash',
  templateUrl: './edit-dash.component.html',
  styleUrl: './edit-dash.component.css'
})
export class EditDashComponent implements OnInit{
@Input() dash:any;
CompanyId:string="";
CompanyName:string="";
Department:string="";
Establish:string="";
Address:string="";
PhotoFileName:string="";
PhotoFilePath:string="";
DeparmentList:any[]=[];


constructor(private dashboard:ServicesService) {}

ngOnInit(): void {
 this.loaddepartment();
}
loaddepartment ()
{
  this.dashboard.getalldepartment().subscribe((data)=>{ 
this.DeparmentList=data;

 this.CompanyId=this.dash.CompanyId;
 this.CompanyName=this.dash.CompanyName;
 this.Department=this.dash.Department;
 this.Establish=this.dash.Establish;
 this.Address=this.dash.Address;
 this.PhotoFileName=this.dash.PhotoFileName;
 this.PhotoFilePath=this.dashboard.photourl+this.PhotoFileName;
})
}

adddata()
{
  const validationResult = this.validateCompanyName();
    if (validationResult !== null) {
      Swal.fire({
        title: "Error!",
        text: validationResult,
        icon: "error"
      });
      return;
    }
  var val = {CompanyId:this.CompanyId,CompanyName:this.CompanyName,Department:this.Department,
  Establish:this.Establish,Address:this.Address,PhotoFileName:this.PhotoFileName};
  this.dashboard.addcompany(val).subscribe((data)=>{
    Swal.fire({
      title: "Good job!",
      text: "Company Sucessfully Added!",
      icon: "success"
    });
  })
}
  Updatedata()
  {
    var val ={CompanyId:this.CompanyId,CompanyName:this.CompanyName,Department:this.Department,Establish:this.Establish
    ,Address:this.Address,PhotoFileName:this.PhotoFileName};
    this.dashboard.updatecompany(val).subscribe((data)=>{
      
      Swal.fire({
        title: "Good job!",
        text: "Upadted Successfully !!",
        icon: "success"
      });
    })
  }
  uploadPhoto(event:any)
  {
    var file= event.target.files[0];
    const formdata:FormData=new FormData();
    formdata.append('UplodedFile',file,file.name);

    this.dashboard.uplaodfile(formdata).subscribe((data)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.dashboard.photourl+this.PhotoFileName;
    })

  }
  validateCompanyName() {
    if (this.CompanyName === null || this.CompanyName.trim() === '') {
      return "Company Name can't be null or empty";
    }
    // You can add more complex validation logic here
    return null; // Validation passed
  }
  loginform = new FormGroup({
    CompanyName:new FormControl('',[Validators.required]),
    Department:new FormControl(''),
    Establish:new FormControl(''),
    Address:new FormControl('')
  })
  get comp()
  {
    return this.loginform.get('CompanyName');
  }
  
  
}
 