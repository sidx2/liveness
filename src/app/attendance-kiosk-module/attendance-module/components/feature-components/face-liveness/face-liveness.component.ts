import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as AWS from 'aws-sdk';
import awsmobile from 'src/aws-exports';
import { FaceLivenessReactWrapperComponent } from '../FaceLivenessReactWrapperComponent';
import { Router } from '@angular/router';
import { AttendanceService } from '../../../services/attendance.service';
import { Subject, distinctUntilChanged, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-face-liveness',
  templateUrl: './face-liveness.component.html',
  styleUrls: ['./face-liveness.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaceLivenessComponent implements OnInit, OnDestroy {

  public counter = 21;

  start_liveness_session = false;
  liveness_session_complete = false;
  session_id = null;
  is_live = false;
  confidence = 0;
  cameraOn: boolean = true;
  loadingScreenText = 'Loading ...'
  subText = ""

  destroy$ = new Subject<void>();

  prevId: string = "";

  isModalOpen = false
  modalHeaderText = "Are you sure you want to continue"
  modalMessage = "Action cannot be undone"
  modalProceedText = "Continue"
  modalCancalText = "Take me back"

  @ViewChild('faceliveness', { static: false }) faceliveness: FaceLivenessReactWrapperComponent;

  constructor(
    // private faceLivenessService: LivenessService,
    private router: Router,
    private attendanceService: AttendanceService,
  ) {

  }

  ngOnInit(): void {
    this.attendanceService.liveness_session.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      tap((data: any) => {console.log("tapped: ", data);})
      // take(1),
    ).subscribe(([status, data]: [any, any]) => {
      console.log("prevId:" , this.prevId);
      console.log("status, data:", status, data);
      if (status == 'success') {
        console.log("")
        if (this.prevId !== data.sessionId) {
          this.prevId = data.sessionId;
          this.initate_liveness_session(data);
        }
        
      }
    })

    AWS.config.region = awsmobile['aws_project_region'];
    const cognito_endpoint = `cognito-idp.${awsmobile['aws_project_region']}.amazonaws.com/${awsmobile['aws_user_pools_id']}`
    // Initialize the Amazon Cognito credentials provider
    const session = this.attendanceService.get_current_session().then(data => {
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
    this.subText = err;
    this.is_live = false;
    // Force remove the ReactDOM
    this.faceliveness.ngOnDestroy();
  }

  public handleLivenessAnalysisResults = (data: any) => {
    this.loadingScreenText = "Processing...";
    console.log("handleLivenessAnalysisResults data", data);
    if (data["isLive"]) {
      console.log("inside isLive: ",);
      this.attendanceService.getImage(data.sessionId).pipe(
        take(1),
        takeUntil(this.destroy$),
      ).subscribe((res: any) => {
        console.log("res in subscribe: ''", res);
        // this.http.post("http://172.16.108.38/attendance/FaceAttendance", {photoData:res, token: this.cookieService.get("token")}).subscribe((data) => {
        this.attendanceService.verifyFace(res).pipe(
          take(1),
          takeUntil(this.destroy$),
        ).subscribe((data: any) => {
          console.log("res in subscribe.subscribe: ''", data);
          if (data.verification_result) {

            const user_name = data.users_list[Object.keys(data?.users_list)[0]];
            const msg = `Attendance was marked successfully for ${user_name}!`;
            // this.toastrService.success(msg);
            (window as any).toast.show(msg, "info");
            // this.router.navigate(["/"]);
            history.back();
          } else {
            this.loadingScreenText = 'Hit Start to start the liveness session';
            this.subText = "";
            // console.log("err:", err);
            // const user_name = data.users_list[Object?.keys(data?.users_list || {})[0]] || "the user";
            const msg = `Cannot not mark attendence for the user!`;
            // this.toastrService.error(msg);
            (window as any).toast.show(msg, "error");
            // this.isModalOpen = true;
          }

          this.destroy$.next();
        }, (err) => {
          console.log("err:", err);
          const user_name = data.users_list[Object.keys(data?.users_list || {})[0]] || "the user";
          this.modalHeaderText = "Could not mark attendance for the user"
          
          const msg = `Could not mark attendence for ${user_name}!`;
          // this.toastrService.error(msg);
          (window as any).toast.show(msg, "error");
          this.isModalOpen = true;
          this.destroy$.next();
        })
      }, (error) => {
        // this.toastrService.error(error);
        this.destroy$.next();
        (window as any).toast.show(error, "error");
      })
    }

    // this.destroy$.next();
    if (data['confidence'] > 70) {
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
    this.attendanceService.get_face_liveness_session();
  }

  start() {
    this.loadingScreenText = "Loading ..."
    this.subText = "";
    this.get_liveness_session();
    this.cameraOn = true;
  }

  onModalConfirm() {
    console.log("modal confirmed");
    this.modalHeaderText = "Are you sure you want to continue";

    this.isModalOpen = false;
  }

  onModalCancelled() {
    console.log("modal cancelled");
    this.router.navigate(["/"]);
    this.loadingScreenText = 'Hit Start to start the liveness session';
    this.subText = "";
    this.isModalOpen = false;

  }

  toggleCamera() {
    this.destroy$.next();
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next();
  }

}
