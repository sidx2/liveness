import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KioskSettingsService } from '../../../services/kiosk-settings.service';
import { Store } from '@ngrx/store';
import { createAssignmentRequest, deleteAssignmentRequest, fetchAssignmentRequest, updateAssignmentRequest } from '../../../store/kiosk-settings.actions';
import { kiosSettingsStateSelector } from '../../../store/kiosk-settings.selectors';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  assignmentForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    Nationality: new FormControl([]),
    gender: new FormControl([]),
    Location: new FormControl([]),
    Religion: new FormControl([]),

  })

  editAssignmentForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    Nationality: new FormControl([]),
    gender: new FormControl([]),
    Location: new FormControl([]),
    Religion: new FormControl([]),

  })

  attributeOptions: { [key: string]: string[] } = {
    'Nationality': ['Indian', 'American', 'German'],
    'gender': ['Male', 'Female', 'Other'],
    'Location': ['USA', 'Germany', 'India'],
    'Religion': ['Hindu', 'Christian', 'Jew', 'Muslim', 'Aesthist'],
  };

  assignments
  editing: string = "-1"

  constructor(
    private store: Store<{ kioskSettings: any }>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fetchAssignmentRequest());
    this.store.select(kiosSettingsStateSelector).subscribe(state => {
      this.assignments = state.assignments;
    })
  }

  onSubmit() {
    console.log(this.assignmentForm.value);
    if (!this.assignmentForm.valid) {
      alert("Invalid form")
      return;
    }

    const assignment = {
      UA: this.assignmentForm.value
    }
    
    this.store.dispatch(createAssignmentRequest({ assignment }));

    this.assignmentForm.reset();
  }

  onEdit(_id) {
    this.editing = _id;

    const editingAssignment = this.assignments.filter((a) => a._id.$oid === _id)[0];

    this.editAssignmentForm = new FormGroup({
      name: new FormControl(editingAssignment.name),
      description: new FormControl(editingAssignment.description),
      Nationality: new FormControl(editingAssignment.Nationality),
      gender: new FormControl(editingAssignment.gender),
      Location: new FormControl(editingAssignment.Location),
      Religion: new FormControl(editingAssignment.Religion),
    })
  }

  onCancel() {
    this.editing = "-1";
  }

  onDone() {
    this.editing = "-1"
    console.log(this.editAssignmentForm.value);
    const assignment = {
      UA: this.editAssignmentForm.value
    }

    this.store.dispatch(updateAssignmentRequest({ assignment }))
  }

  onDelete(_id) {
    console.log("_id onDelete: ", _id);
    this.store.dispatch(deleteAssignmentRequest({ _id }));
  }

}
