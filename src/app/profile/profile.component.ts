import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressVNService } from 'src/service/address-vn.service';
import { AddressService } from 'src/service/address.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { GeolocationService } from 'src/service/geolocation.service';
import { ToastService } from 'src/service/toast.service';
import {
  UUID_DEFAUL_AVATAR,
  formatAddress,
  normalizeName,
  parseAddressData,
} from '../constant/util.constant';
import { FilterService } from 'primeng/api';
import { LoadingService } from 'src/service/loading.service';
import { Geolocation } from '@capacitor/geolocation';
import jwt_decode from 'jwt-decode';
import * as LR from '@uploadcare/blocks';
import type { UploadcareFile } from '@uploadcare/upload-client';
import { UserService } from 'src/service/user.service';
import { UtilService } from 'src/service/util.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddAddressComponent } from '../modals/add-address/add-address.component';

LR.registerBlocks(LR);

type UploadcareBlocksFile = UploadcareFile & {
  cdnUrlModifiers: string | null;
};

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
    road: ['', [Validators.required]],
  });

  infoForm: any;

  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  currentUser: any;
  address: any = [];
  uploadedUrl: string = '';
  readonly UUID_DEFAUL_AVATAR = UUID_DEFAUL_AVATAR;

  addresses: any = [];
  newAddress: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressVNService,
    private toastService: ToastService,
    private geolocationService: GeolocationService,
    private addressByGeoService: AddressService,
    private filterService: FilterService,
    private loadingService: LoadingService,
    private userService: UserService,
    private utilService: UtilService,
    private dialogService: DialogService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwt_decode(token);
      this.infoForm = this.formBuilder.group({
        fullName: [this.currentUser?.fullname, [Validators.required]],
        email: [this.currentUser?.email],
        phoneNumber: [
          this.currentUser?.phone,
          [Validators.required, Validators.pattern(/^\d{10}$/)],
        ],
        createdDate: [this.currentUser?.created_date],
        totalOrder: [0, [Validators.required]],
      });
      this.infoForm.get('email').disable();

      this.userService
        .getUserByID(this.currentUser?.id)
        .subscribe((data: any) => {
          this.currentUser = data;
          this.addresses = JSON.parse(this.currentUser?.addresses);
        });
    }
  }

  ngOnInit() {
    window.addEventListener('LR_DATA_OUTPUT', (e: any) => {
      this.loadingService.showLoading();
      this.uploadedUrl = e.detail?.data[0]?.cdnUrl + e.detail?.data[0]?.name;
      this.currentUser.avatar = this.uploadedUrl;
      let userUpdate = {
        id: this.currentUser?.id,
        username: this.currentUser?.username || '',
        fullname: this.currentUser?.fullname || '',
        phone: this.currentUser?.phone || '',
        userAddresses: this.currentUser?.address || [],
        avatar: this.currentUser?.avatar || '',
      };

      this.userService.updateUser({ ...userUpdate }).subscribe(
        (res) => {
          localStorage.setItem('token', res?.token);
          this.loadingService.hideLoading();
          this.toastService.showMessage(
            ToasSumary.Success,
            res?.message,
            ToastType.Success
          );
          this.utilService.onChange(res?.token);
        },
        (err) => {
          this.toastService.showMessage(
            ToasSumary.Error,
            err?.error?.message,
            ToastType.Error
          );
          this.loadingService.hideLoading();
        }
      );
    });
  }

  convertAddress(data: any) {
    return (
      data?.street +
      ', ' +
      data?.ward +
      ', ' +
      data?.district +
      ', ' +
      data?.province
    );
  }

  convertAddressDB(data: any) {
    return (
      data?.street +
      ', ' +
      data?.ward +
      ', ' +
      data?.district +
      ', ' +
      data?.province
    );
  }

  addAddress() {
    const ref = this.dialogService.open(AddAddressComponent, {
      header: 'Thêm Địa Chỉ',
      width: '40%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((data) => {
      if (
        data &&
        !this.addresses.find((address: any) => {
          return (
            address?.ward === data?.ward &&
            address?.street === data?.street &&
            address?.province === data?.province &&
            address?.district === data?.district
          );
        })
      ) {
        this.addresses.unshift(data);
        console.log('🏍️ ~ this.addresses: ', this.addresses);
      } else {
        this.toastService.showMessage(
          ToasSumary.Warn,
          'Bạn đã thêm địa chỉ này',
          ToastType.Warn
        );
      }
    });
  }

  deleteAddress(address: string) {
    const index = this.addresses.indexOf(address);
    if (index > -1) {
      this.addresses.splice(index, 1);
    }
  }

  save() {
    let userUpdate = {
      id: this.currentUser?.id,
      username: this.infoForm?.value?.username || '',
      fullname: this.infoForm?.value?.fullName || '',
      phone: this.infoForm?.value?.phoneNumber || '',
      userAddresses: this.addresses || [],
      avatar: this.currentUser?.avatar || '',
    };

    this.userService.updateUser({ ...userUpdate }).subscribe(
      (res) => {
        localStorage.setItem('token', res?.token);
        this.loadingService.hideLoading();
        this.toastService.showMessage(
          ToasSumary.Success,
          res?.message,
          ToastType.Success
        );
        this.utilService.onChange(res?.token);
      },
      (err) => {
        this.toastService.showMessage(
          ToasSumary.Error,
          err?.error?.message,
          ToastType.Error
        );
        this.loadingService.hideLoading();
      }
    );
  }
}
