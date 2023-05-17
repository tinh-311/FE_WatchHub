import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressVNService } from 'src/service/address-vn.service';
import { ToastType } from 'src/service/constant/toast.constant';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  addressForm: any = this.formBuilder.group({
    city: ['', [Validators.required]],
    districts: ['', [Validators.required]],
    wards: ['', [Validators.required]],
  });

  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressVNService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.addressService.getProvinces().subscribe(
      (res: any) => {
        this.provinces = res?.data?.data;
      },
      (err) => {
        this.toastService.showMessage(
          ToastType.Error,
          err?.error?.message,
          ToastType.Error
        );
      }
    );
  }

  onProvinceChange() {
    const selectedProvince = this.addressForm.value?.city;
    this.addressService.getDistricts(selectedProvince?.code).subscribe((res: any) => {
      this.districts = res?.data?.data;
    }, (err) => {
      this.toastService.showMessage(
        ToastType.Error,
        err?.error?.message,
        ToastType.Error
      );
    })
  }

  onDistrictChange() {
    const selectedDistrict = this.addressForm.value.districts;
    this.addressService.getWards(selectedDistrict?.code).subscribe((res: any) => {
      this.wards = res?.data?.data;
    }, (err) => {
      this.toastService.showMessage(
        ToastType.Error,
        err?.error?.message,
        ToastType.Error
      );
    })
  }

  onSubmitAddress() {
    console.log(this.addressForm.value);
  }
}
