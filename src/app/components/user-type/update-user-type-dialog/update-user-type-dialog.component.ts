import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { UserTypeInfoService } from '../../../services/user-type-info.service';

const API_URL = environment.API_URL + '/UserType';

@Component({
  selector: 'app-update-user-type-dialog',
  templateUrl: './update-user-type-dialog.component.html',
  styleUrls: ['./update-user-type-dialog.component.css'],
})
export class UpdateUserTypeDialogComponent implements OnInit {
  userTypeInfo: any = [];
  userTVM: any = [];
  updateUserType!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserTypeDialogComponent>,
    public userTypeInfoService: UserTypeInfoService,
    public http: HttpClient,
    public snackBarService: SnackbarService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userTypeInfo = this.userTypeInfoService.retrieveUserTypeInfo();
    this.userTypeInfoService.clearData();

    this.updateUserType = new FormGroup({
      userTypeName: new FormControl(`${this.userTypeInfo[0].name}`),
    });
  }

  onNoClick(): void {
    this.snackBarService.setMessage('You chose not to update the user type');
    this.dialogRef.close();
  }

  onClick() {
    this.dialogRef.close();
  }

  submit() { }

  public confirmUpdateType() {
    this.http
      .put(
        `${API_URL}/UpdateUserType?userTypeID=${this.userTypeInfo[0].ID}`,
        this.updateUserType.value
      ).subscribe();
    this.snackBarService.setMessage('The user type was successfully updated');
    this.dialogRef.close();
  }
}
