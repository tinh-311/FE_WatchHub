import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FilterService } from 'primeng/api';
import {
  parseAddressData,
  normalizeName,
} from 'src/app/constant/util.constant';
import { AddressVNService } from 'src/service/address-vn.service';
import { AddressService } from 'src/service/address.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { GeolocationService } from 'src/service/geolocation.service';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { UserService } from 'src/service/user.service';
import { UtilService } from 'src/service/util.service';
import { Geolocation } from '@capacitor/geolocation';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit {
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

  address: any;

  addresses: any;
  newAddress: string = '';
  isLoading: boolean = false;

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
    private ref: DynamicDialogRef
  ) {}

  cancel() {
    this.ref.close(false);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.addressService.getProvinces().subscribe(
      (res: any) => {
        this.provinces = res?.data?.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.toastService.showMessage(
          ToastType.Error,
          err?.error?.message,
          ToastType.Error
        );
      }
    );
  }

  onProvinceChange() {
    this.isLoading = true;
    const selectedProvince = this.addressForm.value?.city;
    if (!selectedProvince) {
      this.wards = [];
    }

    this.addressService.getDistricts(selectedProvince?.code).subscribe(
      (res: any) => {
        this.districts = res?.data?.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.toastService.showMessage(
          ToastType.Error,
          err?.error?.message,
          ToastType.Error
        );
      }
    );
  }

  onDistrictChange() {
    this.isLoading = true;
    const selectedDistrict = this.addressForm.value.districts;
    this.addressService.getWards(selectedDistrict?.code).subscribe(
      (res: any) => {
        this.wards = res?.data?.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
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
    if (!this.addressForm?.value) {
      return;
    }
    console.log('🏍️ ~ this.addressForm?.value: ', this.addressForm?.value)

    this.ref.close({
      province: this.addressForm?.value?.city?.name_with_type,
      street: this.addressForm?.value?.road,
      ward: this.addressForm?.value?.wards?.name_with_type,
      district: this.addressForm?.value?.districts?.name_with_type,
    });
  }

  async getCurrenAddress() {
    this.isLoading = true;
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

          if (!selectedCity) {
            this.isLoading = false;
            return;
          }

          this.addressForm = this.formBuilder.group({
            city: [selectedCity, [Validators.required]],
            districts: ['', [Validators.required]],
            wards: ['', [Validators.required]],
            road: ['', [Validators.required]],
          });

          this.addressService.getDistricts(selectedCity?.code).subscribe(
            (res: any) => {
              this.districts = res?.data?.data;

              let selectedDistrict = this.districts?.find((p) =>
                this.filterService.filters.contains(
                  address.city_district,
                  p?.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                )
              );

              if (!selectedDistrict) {
                this.isLoading = false;
                return;
              }

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
                    let n = normalizeName(p?.name).replace(' ', '');
                    let suburb = address.suburb.replace('Phường ', '');
                    suburb = suburb.replace('Ward ', '');

                    return suburb == n.trim();
                  });

                  if (!selectedWards) {
                    this.isLoading = false;
                    return;
                  }

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
                  this.isLoading = false;
                },
                (err) => {
                  this.isLoading = false;
                  this.toastService.showMessage(
                    ToastType.Error,
                    err?.error?.message,
                    ToastType.Error
                  );
                }
              );
            },
            (err) => {
              this.isLoading = false;
              this.toastService.showMessage(
                ToastType.Error,
                err?.error?.message,
                ToastType.Error
              );
            }
          );
        },
        (err) => {
          this.isLoading = false;
          this.toastService.showMessage(
            ToastType.Error,
            err?.error?.message,
            ToastType.Error
          );
        }
      );
  }
}
