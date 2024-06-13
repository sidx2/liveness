import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { LivenessService } from './liveness.service';
import * as AWS from 'aws-sdk';
import awsmobile from 'src/aws-exports';
import { FaceLivenessReactWrapperComponent } from '../FaceLivenessReactWrapperComponent';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'src/app/services/cookie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-liveness',
  templateUrl: './face-liveness.component.html',
  styleUrls: ['./face-liveness.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaceLivenessComponent implements OnInit {

  public counter = 21;

  start_liveness_session = false;
  liveness_session_complete = false;
  session_id = null;
  is_live = false;
  confidence = 0;
  cameraOn: boolean = true;
  loadingScreenText = 'Loading ...'
  subText = ""

  @ViewChild('faceliveness', { static: false }) faceliveness: FaceLivenessReactWrapperComponent;

  constructor(
    private faceLivenessService: LivenessService,
    private http: HttpClient,
    private cookieService: CookieService,
    private toastrService: ToastrService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.faceLivenessService.liveness_session.subscribe(([status, data]) => {
      console.log("status, data:", status, data);
      if (status == 'success') {
        this.initate_liveness_session(data);
      }
    })

    AWS.config.region = awsmobile['aws_project_region'];
    const cognito_endpoint = `cognito-idp.${awsmobile['aws_project_region']}.amazonaws.com/${awsmobile['aws_user_pools_id']}`
    // Initialize the Amazon Cognito credentials provider
    const session = this.faceLivenessService.get_current_session().then(data => {
      console.log("got current session: ", data);
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: awsmobile['aws_cognito_identity_pool_id'],
        Logins: {
          [cognito_endpoint]: data.getIdToken().getJwtToken()
        }
      });

    }).catch(err => {
      console.log(err)
    });
    this.get_liveness_session()
  }

  public handleErrors(err: any) {
    console.log("err '", err);
    this.liveness_session_complete = true;
    this.start_liveness_session = false;
    this.cameraOn = false;
    this.loadingScreenText = 'Error  during liveness detection'
    this.is_live = false;
    // Force remove the ReactDOM
    this.faceliveness.ngOnDestroy();
  }

  public handleLivenessAnalysisResults(data: any) {
    this.loadingScreenText = "Processing..."
    console.log("handleLivenessAnalysisResults data", data);
    if (data["isLive"]) {
      console.log("inside isLive: ", );
      this.http.post(`http://172.16.108.38/liveness/getImage`, { sessionId: data["sessionId"] }).subscribe((res:any) => {
        console.log("res in subscribe: ''", res);
        this.http.post("http://172.16.108.38/attendance/FaceAttendance", {photoData:res, token: this.cookieService.get("token")}).subscribe((data) => {
          console.log("res in subscribe.subscribe: ''", res);
          this.toastrService.success("Success", "Attendance marked successfully!");
          this.router.navigate(["/"])
        }, (err) => {
          this.toastrService.error("Could not mark attendence", "Failed to mark attedance");
          if (!confirm("Could not mark attendence! Try again?")) {

            this.router.navigate(["/"])
          }
        })
      })
    }

    if (data['confidence'] > 75) {
      this.is_live = true;
      this.loadingScreenText = `Liveness check passed, Confidence ${Math.round(Number(data['confidence']))}`
      this.subText = "Processing..."
    } else {
      this.is_live = false;
      this.loadingScreenText = `Liveness check failed, Confidence ${Math.round(Number(data['confidence']))}`
      this.subText = ""
      
    }
    this.liveness_session_complete = true;
    this.start_liveness_session = false;
    this.cameraOn = false;
    // Force remove the ReactDOM
    this.faceliveness.ngOnDestroy();

  }

  initate_liveness_session(data: any) {
    this.is_live = false;
    this.session_id = data.sessionId;
    this.confidence = 0;
    this.liveness_session_complete = false;
    setTimeout(() => {
      this.start_liveness_session = true;
      this.cameraOn = true;
    }, 3);
  }

  get_liveness_session() {
    this.start_liveness_session = false;
    // this.cameraOn = false;
    this.faceLivenessService.get_face_liveness_session();
  }

  start() {
    this.loadingScreenText = "Loading ..."
    this.get_liveness_session();
    this.cameraOn = true;
  }

  toggleCamera() {
    this.cameraOn = !this.cameraOn;
    this.liveness_session_complete = true;
    this.start_liveness_session = false;
    this.cameraOn = false;
    this.loadingScreenText = 'Hit Start to start the liveness session';
    this.subText = "";
    this.is_live = false;
    // Force remove the ReactDOM
    this.faceliveness.ngOnDestroy();
  }

}
