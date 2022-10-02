import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfoService } from '../../../services/user-info.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-view-user-dialog',
  templateUrl: './view-user-dialog.component.html',
  styleUrls: ['./view-user-dialog.component.css']
})
export class ViewUserDialogComponent implements OnInit {

  userInfo: any = [];
  viewUser!: UntypedFormGroup
  userTypes: any = [];
  userTypeName: any

  constructor(public dialogRef: MatDialogRef<ViewUserDialogComponent>, public userInfoService: UserInfoService, public http: HttpClient) { }

  ngOnInit(){
    this.userInfo = this.userInfoService.retrieveUserInfo();
    this.userInfoService.clearData();

    this.getUserType()

    this.viewUser = new UntypedFormGroup({
      usertype: new UntypedFormControl('', [Validators.required]),
      username: new UntypedFormControl(`${this.userInfo[0].username}`, [Validators.required]),
      email: new UntypedFormControl(`${this.userInfo[0].email}`, [Validators.required]),
      phoneNo: new UntypedFormControl(`${this.userInfo[0].phoneNo}`, [Validators.required]),
    })
    }
  
  submit() {
    // empty stuff
    }
    public back(): void {
      this.dialogRef.close();
    }

    public getUserType()
    {
      this.http.get(`${API_URL}/Authentication/GetUserTypeById?userId=${this.userInfo[0].id}`)
      .subscribe((results) => {
        this.userTypes = results
        this.userTypeName = this.userTypes.userType.userTypeName
      this.viewUser.controls['usertype'].setValue(this.userTypeName)
      })
    }
}
