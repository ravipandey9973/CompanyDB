import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  readonly apiurl = "http://localhost:53048/api";
  readonly photourl = "http://localhost:53048/api/Photo";
  constructor(private http:HttpClient) { }


  getdepartment():Observable <any[]>
  {
   return this.http.get<any>(this.apiurl+'/Department');
  }
  adddeparment(val:any)
  {
    return this.http.post(this.apiurl+'/Department',val);
  }
  updatedepartment(val:any)
  {
    return this.http.put(this.apiurl+'/Department',val);
  }
  deletedepartment(val:any)
  {
    return this.http.delete(this.apiurl+'/Department/'+val);
  }

  getcompany():Observable <any[]>
  {
    return this.http.get<any>(this.apiurl+'/Companyy');
  }
  addcompany(val:any)
  {
    return this.http.post(this.apiurl+'/Companyy',val);
  }
  updatecompany(val:any)
  {
    return this.http.put(this.apiurl+'/Companyy',val);
  }
  deletecompany(val:any)
  {
    return this.http.delete(this.apiurl+'/Companyy/'+val);
  }
  getalldepartment():Observable <any[]>
  {
    return this.http.get<any>(this.apiurl+'/Companyy/GetAllDepartmentNames');
  }
  uplaodfile(val:any)
  {
    return this.http.post(this.apiurl+'/Companyy/SaveFile',val);
  }

}
