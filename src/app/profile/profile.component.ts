import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressVNService } from 'src/service/address-vn.service';
import { AddressService } from 'src/service/address.service';
import { ToastType } from 'src/service/constant/toast.constant';
import { GeolocationService } from 'src/service/geolocation.service';
import { ToastService } from 'src/service/toast.service';
import { formatAddress, parseAddressData } from '../constant/util.constant';
import { FilterService } from 'primeng/api';
import { LoadingService } from 'src/service/loading.service';

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

  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressVNService,
    private toastService: ToastService,
    private geolocationService: GeolocationService,
    private addressByGeoService: AddressService,
    private filterService: FilterService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.showLoading();
    this.addressService.getProvinces().subscribe(
      (res: any) => {
        this.provinces = res?.data?.data;
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

  onProvinceChange() {
    this.loadingService.showLoading();
    const selectedProvince = this.addressForm.value?.city;
    if(!selectedProvince) {
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

  onSubmitAddress() {
    console.log(this.addressForm.value);
  }

  getCurrenAddress() {
    this.loadingService.showLoading();
    this.geolocationService
      .getCurrentLocation()
      .then((position) => {
        this.addressByGeoService
          .getAddressByGeolocation(
            position?.coords?.latitude,
            position?.coords?.longitude
          )
          .subscribe(
            (res) => {
              const address = parseAddressData(res);

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
                    districts: [selectedDistrict, [Validators.required]],
                    wards: ['', [Validators.required]],
                    road: ['', [Validators.required]],
                  });

                  this.addressService
                    .getWards(selectedDistrict?.code)
                    .subscribe(
                      (res: any) => {
                        this.wards = res?.data?.data;
                        let selectedWards = this.wards.find((p) =>
                          this.filterService.filters.contains(
                            address.suburb,
                            p?.name
                              .normalize('NFD')
                              .replace(/[\u0300-\u036f]/g, '')
                          )
                        );
                        this.addressForm = this.formBuilder.group({
                          city: [selectedCity, [Validators.required]],
                          districts: [selectedDistrict, [Validators.required]],
                          wards: [selectedWards, [Validators.required]],
                          road: ['', [Validators.required]],
                        });
                        let road = '';
                        if (address?.road && address?.road != 'unnamed road') {
                          road = address?.road;
                        }

                        this.addressForm = this.formBuilder.group({
                          city: [selectedCity, [Validators.required]],
                          districts: [selectedDistrict, [Validators.required]],
                          wards: [selectedWards, [Validators.required]],
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
            (err) => {}
          );
      })
      .catch((error) => {
        this.loadingService.hideLoading();
        console.error('Failed to get current location:', error);
      });
  }
}
