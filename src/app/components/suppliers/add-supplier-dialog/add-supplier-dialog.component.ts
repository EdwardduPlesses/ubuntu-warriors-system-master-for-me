import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SupplierService } from 'src/app/services/supplier.service';

const options = {
  componentRestrictions: { country: "za" },
  strictBounds: false
};
@Component({
  selector: 'app-add-supplier-dialog',
  templateUrl: './add-supplier-dialog.component.html',
  styleUrls: ['./add-supplier-dialog.component.css']
})
export class AddSupplierDialogComponent implements OnInit {

  suppliers: any = [];

  addSupplier = new UntypedFormGroup({
    supplierName: new UntypedFormControl(''),
    supplierPhoneNo: new UntypedFormControl(''),
    supplierEmail: new UntypedFormControl(''),
    addressId: new UntypedFormControl(''),
  })

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  //Address VAR's
  streetName: string | undefined= "";
  streetNumber: string | undefined = "";
  suburbName: string | undefined= "";
  cityName: string | undefined= "";
  provinceName: string | undefined= "";
  countryName: string | undefined= "";

  constructor(public dialog: MatDialogRef<AddSupplierDialogComponent>, public http: HttpClient, public service: SupplierService, public snackbar: SnackbarService, public ngZone: NgZone) { }

  async ngOnInit() {
    await this.getSupplier();
   }

  onNoClick() {
    this.snackbar.setMessage("You chose not to add a new supplier")
    this.dialog.close()
  }

  async confirmSupplierAdd() {

    let addressSend = {
      supplierName: this.addSupplier.value.supplierName,
      addressId: 0,
      supplierPhoneNo: this.addSupplier.value.supplierPhoneNo,
      supplierEmail: this.addSupplier.value.supplierEmail,
      Street_Name: this.streetName,
      Street_Number: this.streetNumber,
      Suburb_Name: this.suburbName,
      City_Name: this.cityName,
      Province_Name: this.provinceName,
      Country_Name: this.countryName
    }

    await this.service.PostSupplier(addressSend).then(() => { },
    (response: HttpErrorResponse) => {
      if (response.status == 200) {
        this.snackbar.setMessage("Supplier Added successfully")
      }
      else {
        this.snackbar.setMessage("Failed to Add Supplier")
      }
    })

      this.dialog.close();
   


  }

  async getSupplier() {
    await this.service.GetSupplier().then(Response => { 
      this.suppliers = Response
      console.log('Supplier', this.suppliers)
     });
  }

  ngAfterViewInit(): void{
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement, options
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          
          return;
        }
        else{
          this.streetNumber = place.name?.replace(/[^0-9]/g,'')
          this.suburbName = place.vicinity

          if(place.address_components != undefined){
            this.cityName = place.address_components[3].long_name
            this.provinceName = place.address_components[5].long_name
            this.countryName = place.address_components[6].long_name
            this.streetName = place.address_components[1].long_name
          }
        }
      })
    })
  }
}