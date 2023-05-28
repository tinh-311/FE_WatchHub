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
  address: any;
  uploadedUuid: string = '';
  readonly UUID_DEFAUL_AVATAR = UUID_DEFAUL_AVATAR;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressVNService,
    private toastService: ToastService,
    private geolocationService: GeolocationService,
    private addressByGeoService: AddressService,
    private filterService: FilterService,
    private loadingService: LoadingService,
    private userService: UserService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwt_decode(token);
      console.log('🏍️ ~ this.currentUser: ', this.currentUser);
      this.updateLRImgElementWithUuid(this.currentUser?.avatar);
      this.infoForm = this.formBuilder.group({
        fullName: [this.currentUser?.fullname, [Validators.required]],
        email: [
          this.currentUser?.email,
          [Validators.required, Validators.email],
        ],
        phoneNumber: [
          this.currentUser?.phone,
          [Validators.required, Validators.pattern(/^\d{10}$/)],
        ],
        createdDate: [this.currentUser?.created_date],
        totalOrder: [0, [Validators.required]],
      });
    }
  }

  ngOnInit() {
    window.addEventListener('LR_DATA_OUTPUT', (e: any) => {
      this.loadingService.showLoading();
      this.uploadedUuid = e.detail?.data[0]?.uuid;
      this.currentUser.avatar = this.uploadedUuid;
      let userUpdate = {
        id: this.currentUser?.id,
        username: this.currentUser?.username || '',
        fullname: this.currentUser?.fullname || '',
        phone: this.currentUser?.phone || '',
        address: this.currentUser?.address || '',
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
      this.uploadedUuid = this.uploadedUuid
        ? this.uploadedUuid
        : UUID_DEFAUL_AVATAR;
      this.updateLRImgElementWithUuid(this.uploadedUuid);
    });

    this.loadingService.showLoading();
    this.addressService.getProvinces().subscribe(
      (res: any) => {
        this.provinces = res?.data?.data;
        this.loadingService.hideLoading();
        this.updateLRImgElementWithUuid(this.currentUser?.avatar);
      },
      (err) => {
        this.loadingService.hideLoading();
        this.toastService.showMessage(
          ToastType.Error,
          err?.error?.message,
          ToastType.Error
        );
        this.updateLRImgElementWithUuid(this.currentUser?.avatar);
      }
    );
    this.updateLRImgElementWithUuid(this.currentUser?.avatar);
  }

  updateLRImgElementWithUuid(uploadedUuid: string) {
    const lrImgElement = document.getElementById(
      'user-avatar-profile'
    ) as HTMLElement;
    if (lrImgElement) {
      lrImgElement.setAttribute('uuid', uploadedUuid);
    }

    const lrImgElement2 = document.getElementById('user-avatar') as HTMLElement;
    if (lrImgElement) {
      lrImgElement2.setAttribute('uuid', uploadedUuid);
    }
  }

  files: UploadcareBlocksFile[] = [];

  handleUploaderEvent(e: Event) {
    const { data: files } = (e as CustomEvent).detail;
    this.files = files;
  }

  onProvinceChange() {
    this.loadingService.showLoading();
    const selectedProvince = this.addressForm.value?.city;
    if (!selectedProvince) {
      this.wards = [];
    }

    this.addressService.getDistricts(selectedProvince?.code).subscribe(
      (res: any) => {
        this.districts = res?.data?.data;
        this.loadingService.hideLoading();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.toastService.showMessage(
          ToastType.Error,
          err?.error?.message,
          ToastType.Error
        );
      }
    );
  }

  onDistrictChange() {
    this.loadingService.showLoading();
    const selectedDistrict = this.addressForm.value.districts;
    this.addressService.getWards(selectedDistrict?.code).subscribe(
      (res: any) => {
        this.wards = res?.data?.data;
        this.loadingService.hideLoading();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.toastService.showMessage(
          ToastType.Error,
          err?.error?.message,
          ToastType.Error
        );
      }
    );
  }

  onWardsChange() {}

  onSubmitAddress() {
    console.log(this.addressForm.value);
  }

  async getCurrenAddress() {
    this.loadingService.showLoading();
    const coordinates: any = await Geolocation.getCurrentPosition();
    this.addressByGeoService
      .getAddressByGeolocation(
        coordinates?.coords?.latitude,
        coordinates?.coords?.longitude
      )
      .subscribe(
        (res) => {
          const address: any = parseAddressData(res);
          this.address = address;
          let selectedCity = this.provinces.find((p) =>
            this.filterService.filters.contains(address.city, p?.name)
          );

          this.addressForm = this.formBuilder.group({
            city: [selectedCity, [Validators.required]],
            districts: ['', [Validators.required]],
            wards: ['', [Validators.required]],
            road: ['', [Validators.required]],
          });

          this.addressService.getDistricts(selectedCity?.code).subscribe(
            (res: any) => {
              this.districts = res?.data?.data;

              let selectedDistrict = this.districts.find((p) =>
                this.filterService.filters.contains(
                  address.city_district,
                  p?.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                )
              );

              this.addressForm = this.formBuilder.group({
                city: [selectedCity, [Validators.required]],
                districts: [
                  selectedDistrict || this.districts[0],
                  [Validators.required],
                ],
                wards: ['', [Validators.required]],
                road: ['', [Validators.required]],
              });

              this.addressService.getWards(selectedDistrict?.code).subscribe(
                (res: any) => {
                  this.wards = res?.data?.data;

                  let selectedWards = this.wards.find((p) => {
                    let n = normalizeName(p?.name);
                    return this.filterService.filters.contains(
                      address.suburb,
                      n
                    );
                  });

                  this.addressForm = this.formBuilder.group({
                    city: [selectedCity, [Validators.required]],
                    districts: [selectedDistrict, [Validators.required]],
                    wards: [
                      selectedWards || this.wards[0],
                      [Validators.required],
                    ],
                    road: ['', [Validators.required]],
                  });

                  let road = '';
                  if (address?.road && address?.road != 'unnamed road') {
                    road = address?.road;
                  }

                  this.addressForm = this.formBuilder.group({
                    city: [selectedCity, [Validators.required]],
                    districts: [selectedDistrict, [Validators.required]],
                    wards: [
                      selectedWards || this.wards[0],
                      [Validators.required],
                    ],
                    road: [road, [Validators.required]],
                  });
                  this.loadingService.hideLoading();
                },
                (err) => {
                  this.loadingService.hideLoading();
                  this.toastService.showMessage(
                    ToastType.Error,
                    err?.error?.message,
                    ToastType.Error
                  );
                }
              );
            },
            (err) => {
              this.loadingService.hideLoading();
              this.toastService.showMessage(
                ToastType.Error,
                err?.error?.message,
                ToastType.Error
              );
            }
          );
        },
        (err) => {
          this.loadingService.hideLoading();
          this.toastService.showMessage(
            ToastType.Error,
            err?.error?.message,
            ToastType.Error
          );
        }
      );
  }
}
