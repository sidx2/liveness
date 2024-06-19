import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { CookieService } from 'src/app/services/cookie.service';

import { BehaviorSubject } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  getImage(sessionId: string) {
    return this.http.post(`http://172.16.108.38/liveness/getImage`, { sessionId });
  }

  verifyFace(base64image) {
    return this.http.post("/kioskapp/verifyFace", {image:base64image, token: this.cookieService.get("token")})
  }

  markAttendenceUsingQR(data: any) {
    console.log("data:", data);
    let json;

    try {
      json = JSON.parse(data);
    } catch (err) {
      console.log("invalid qr")
      return throwError("Invaid QR Code");
    }

    if (!json.emp_id) {
      console.log("json: ", json, typeof(json));
      console.log("emp_id not in json");
      return throwError("Invalid QR Code");
    }

    try {
      return this.http.post("/kioskapp/syncOfflineClockInAttendance", {
        "requests": [json],
        "token": this.cookieService.get("token")
      })
    } catch (err) {
      throwError(err);
    }
    return throwError("Something went wrong while marking attendance using QR");
  }

  public liveness_session: BehaviorSubject<[string, {}]> = new BehaviorSubject<[string, {}]>(['empty', {}]);

  async get_current_session() {
    return (await Auth.currentSession());
  }


  // Modify to get face liveness session
  async get_face_liveness_session() {
    // var rekognition = new AWS.Rekognition();
    console.log("hitting api...")
    let res: any = await fetch('http://172.16.108.38/liveness/api/');
    console.log("hit api...")
    res = await res.json();
    console.log("res: ", res);

    

    if(res != null){
      this.liveness_session.next(['success', { sessionId: res.sessionId }]);
    }
    // rekognition.createFaceLivenessSession({}, (err, data) => {
    //   if (err)
    //     console.log(err, err.stack);
    //   else {
    //     this.liveness_session.next(['success', { sessionId: res.sessionId }]);
    //   }
    // });
  }
}
