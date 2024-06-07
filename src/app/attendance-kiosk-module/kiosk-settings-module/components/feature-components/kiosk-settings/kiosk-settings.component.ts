import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUserRequest, deleteUserRequest, fetchUsersRequest, updateUserRequest } from '../../../store/kiosk-settings.actions';
import { kiosSettingsStateSelector } from "../../../store/kiosk-settings.selectors";

@Component({
  selector: 'app-kiosk-settings',
  templateUrl: './kiosk-settings.component.html',
  styleUrls: ['./kiosk-settings.component.scss']
})
export class KioskSettingsComponent implements OnInit {
  addUserForm: FormGroup;

  editUserForm: FormGroup;
  ip: string[] = [];
  editingIp: string[] = [];

  users: any;
  editing: string = "";
  attributes: string[] = ['Nationality', 'gender', 'Location', 'Religion'];
  attributeOptions: { [key: string]: string[] } = {
    'Nationality': ['Indian', 'American', 'German'],
    'gender': ['Male', 'Female', 'Other'],
    'Location': ['USA', 'Germany', 'India'],
    'Religion': ['Hindu', 'Christian', 'Jew', 'Muslim', 'Aesthist'],
  };
  selectedAttributes: string[] = [];

  selectedAttributeOptions: { [key: string]: string[] } = {};

  selectedAttributeOptionsEditing: { [key: string]: string[] } = {};


  scopes: any[] = [
    { id: 'UA1', name: 'UA1' },
    { id: 'UA2', name: 'UA2' },
    { id: 'UA3', name: 'UA3' },
    { id: 'UA4', name: 'UA4' },
    { id: 'UA5', name: 'UA5' },
  ];


  ips: any[] = [
    { id: '192.168.1.2', name: '192.168.1.2' },
    { id: '192.168.1.3', name: '192.168.1.3' },
    { id: '192.168.1.4', name: '192.168.1.4' },
    { id: '192.168.1.5', name: '192.168.1.5' },
    { id: '192.168.1.6', name: '192.168.1.6' },
  ];

  selectedScopes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ kioskSettings: any }>,
  ) {
    this.addUserForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      scope: new FormControl([], [Validators.required]),
      ip: new FormControl([], [Validators.required])
    });

    this.editUserForm = this.fb.group({
      name: new FormControl(""),
      login: new FormControl(""),
      password: new FormControl(""),
      scope: new FormControl([]),
      ip: new FormControl([])
    });

  }

  ngOnInit(): void {
    this.store.dispatch(fetchUsersRequest(null));

    this.store.select(kiosSettingsStateSelector).subscribe(state => {
      this.users = state.users;
    });
  }

  addAttribute(): void {
    const selectedAttribute = this.addUserForm.get('attributeSelect')?.value;
    if (selectedAttribute && !this.selectedAttributes.includes(selectedAttribute)) {
      this.selectedAttributes = [...this.selectedAttributes, selectedAttribute];
      this.selectedAttributeOptions = { ...this.selectedAttributeOptions, [selectedAttribute]: [] };
    }
  }

  updateAttributeOptions(attribute: string, event: any): void {
    const options = Array.from(event.target.selectedOptions, (option: any) => option.value);
    this.selectedAttributeOptions = { ...this.selectedAttributeOptions, [attribute]: options };
  }

  updateAttributeOptionsEditing(attribute: string, event: any): void {
    const options = Array.from(event.target.selectedOptions, (option: any) => option.value);
    this.selectedAttributeOptionsEditing = { ...this.selectedAttributeOptionsEditing, [attribute]: options };
  }

  addIP(): void {
    const ipValue = this.addUserForm.get('ipInput')?.value;
    if (ipValue) {
      this.ip.push(ipValue);
      this.addUserForm.get('ipInput')?.reset();
    }
  }

  addIPEditing(): void {
    const ipValue = this.editUserForm.get('ipInput')?.value;
    if (ipValue) {
      this.editingIp = [...this.editingIp, ipValue];
      this.editUserForm.get('ipInput')?.reset();
    }
  }

  onSubmit() {
    const data = {
      name: this.addUserForm.value.name,
      login: this.addUserForm.value.login,
      password: this.addUserForm.value.password,
      scope: this.addUserForm.value.scope,
      ip: this.addUserForm.value.ip,
    };

    console.log("data: ", data);

    this.store.dispatch(createUserRequest({ user: data }));
  }

  onEdit(_id: any) {
    this.editing = _id;
    const editingUser = this.users.find((u: any) => u._id.$oid === _id);

    console.log("editingUser:", editingUser)
    this.editingIp = editingUser.ip;
    console.log("selectedAttributeOptions: ", this.selectedAttributeOptions)
    this.selectedAttributeOptionsEditing = editingUser.scope;

    this.editUserForm = this.fb.group({
      name: new FormControl(editingUser.name),
      login: new FormControl(editingUser.login),
      password: new FormControl(editingUser.password),
      scope: new FormControl(editingUser.scope),
      ip: new FormControl(editingUser.ip)
    });

    this.selectedAttributes = Object.keys(this.selectedAttributeOptions);
  }

  onCancel() {
    this.editing = "-1";
  }

  onDone() {
    const data = {
      id: this.editing,
      name: this.editUserForm.value.name,
      login: this.editUserForm.value.login,
      password: this.editUserForm.value.password,
      scope: this.editUserForm.value.scope,
      ip: this.editUserForm.value.ip,
    };

    this.editUserForm.reset();
    this.selectedAttributes = [];
    this.selectedAttributeOptionsEditing = {};
    this.editingIp = [];
    this.editing = "";

    console.log("data:", data)
    this.store.dispatch(updateUserRequest({ user: data }));
    return;
  }

  onDelete(_id: any) {
    if (confirm("Are you sure want to delete the user?"))
      this.store.dispatch(deleteUserRequest({ _id: _id.$oid }));
  }
}
