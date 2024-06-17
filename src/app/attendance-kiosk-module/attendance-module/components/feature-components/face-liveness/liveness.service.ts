import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from 'aws-amplify';
import * as AWS from 'aws-sdk';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivenessServicee {
  constructor(
    private http: HttpClient,
  ) {

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
