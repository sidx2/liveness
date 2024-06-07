import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KioskSettingsService {

  constructor(
    private http: HttpClient
  ) { }

  addUesr(userData: any) {
    console.log("userData in service: ", userData);
    return this.http.post("http://172.16.108.38/kiosk/CreateLogin", userData)
  }
  
  fetchUsers() {
    return this.http.get("http://172.16.108.38/Kiosk/getLogins");
  }
  
  deleteUser(_id: any) {
    
    return this.http.post(`http://172.16.108.38/kiosk/deleteLogin`, { id: _id });
  }
  
  updateUser(user) {
    return this.http.post(`http://172.16.108.38/Kiosk/updateLogin`, user);

  }

  addAssignment(assignment) {
    console.log("assignment: ", assignment)
    return this.http.post(`http://172.16.108.38/storeManager/CreateUserAssignment`, assignment);

  }

  fetchAssignment() {
    console.log("fetching assignments....")
    return this.http.get(`http://172.16.108.38/storeManager/getUserAssignments`);
  }
  
  updateAssignment(assignment) {
    return this.http.post(`http://172.16.108.38/storeManager/updateUserAssignment`, assignment);
  }

  deleteAssignment(_id) {
    console.log("_id: ", _id);
    return this.http.post(`http://172.16.108.38/storeManager/deleteUserAssignment`, {id: _id});
  }
}
