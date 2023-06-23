import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {
  DynamicDialogRef,
  DynamicDialogConfig,
  DialogService,
} from 'primeng/dynamicdialog';
import { BrandsService } from 'src/app/brands.service';
import { ImgReviewComponent } from 'src/app/img-review/img-review.component';
import { ProductAlbertService } from 'src/app/service/product-albert.service';
import { ProductCoreService } from 'src/app/service/product-core.service';
import { ProductGlassService } from 'src/app/service/product-glass.service';
import { CategoryService } from 'src/service/category.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ProductsService } from 'src/service/products.service';
import { ToastService } from 'src/service/toast.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-product-types',
  templateUrl: './edit-product-types.component.html',
  styleUrls: ['./edit-product-types.component.scss'],
})
export class EditProductTypesComponent implements OnInit {
  brands: any;
  selectedBrand: any;

  cores: any;
  selectedCore: any;

  alberts: any;
  selectedAlbert: any;

  glasses: any;
  selectedGlass: any;

  subCategoryId: any;

  imgURLS: any = [];
  imgDirty: boolean = false;

  originalProductType: any;

  genderOptions: any = [
    { val: 'male', name: 'Nam' },
    { val: 'female', name: 'Nữ' },
  ];

  addNewForm: any = this.fb.group({
    price: [0, Validators.required],
    selectedBrand: ['', Validators.required],
    selectedCore: ['', Validators.required],
    selectedAlbert: ['', Validators.required],
    productTypeCode: ['', Validators.required],
    selectedGlass: ['', Validators.required],
    productDialHeight: ['', Validators.required],
    productDialWidth: ['', Validators.required],
    productDialColor: ['', Validators.required],
    productGuarantee: ['', Validators.required],
    productWaterproof: ['', Validators.required],
    productSource: ['', Validators.required],
    productFeatures: ['', Validators.required],
    productAdditionalInformation: ['', Validators.required],
    gender: [this.genderOptions[0], Validators.required],
  });

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private brandService: BrandsService,
    private coresService: ProductCoreService,
    private albertsService: ProductAlbertService,
    private glassesService: ProductGlassService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private productsService: ProductsService,
    private toastService: ToastService,
    private categoriesService: CategoryService,
    private subCategoriesService: CategoryService
  ) {}

  async ngOnInit(): Promise<void> {
    window.addEventListener('LR_DATA_OUTPUT', (e: any) => {
      this.imgURLS = [];
      this.imgDirty = true;
      if (e.detail.ctx === 'edit-productType') {
        e.detail?.data.forEach((d: any) => {
          const uploadedUrl = d?.cdnUrl + e.detail?.data[0]?.name;
          console.log('🏍️ ~ uploadedUrl: ', uploadedUrl);
          this.imgURLS.push(uploadedUrl);
          console.log('🏍️ ~ this.imgURLS: ', this.imgURLS);
        });
      }
    });

    if (this.config.data) {
      const data = this.config.data;
      this.originalProductType = data?.productType;
      this.imgURLS = this.originalProductType?.product_image_uuid;
      this.subCategoryId = this.originalProductType?.sub_category_id;
      this.addNewForm.patchValue({
        price: this.originalProductType?.price,
        productDialHeight: this.originalProductType?.product_dial_height,
        productDialWidth: this.originalProductType?.product_dial_width,
        productDialColor: this.originalProductType?.product_dial_color,
        productGuarantee: this.originalProductType?.product_guarantee,
        productTypeCode: this.originalProductType?.product_type_code,
        productWaterproof: this.originalProductType?.product_waterproof,
        gender: this.originalProductType?.gender,
        productSource: this.originalProductType?.product_source,
        productFeatures: this.originalProductType?.product_features,
        productAdditionalInformation:
          this.originalProductType?.product_additional_information,
      });
    }

    this.getBrands();
    this.getCores();
    this.getAlberts();
    this.getGlasses();
  }

  openImage(imageUrl: string) {
    const ref = this.dialogService.open(ImgReviewComponent, {
      header: 'Image Review',
      dismissableMask: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { imageUrl: imageUrl },
    });
  }

  getGlasses() {
    this.glassesService.getAll().subscribe((data: any) => {
      this.glasses = data?.res;
      this.selectedGlass = this.glasses.find(
        (g: any) => g.id === this.originalProductType?.glasses?.id
      );

      this.addNewForm.patchValue({
        selectedGlass: this.selectedGlass,
      });
    });
  }

  onDropdownGlassChange(event: any) {}

  getAlberts() {
    this.albertsService.getAll().subscribe((data: any) => {
      this.alberts = data?.res;
      this.selectedAlbert = this.alberts.find(
        (a: any) => a.id === this.originalProductType?.alberts?.id
      );

      this.addNewForm.patchValue({
        selectedAlbert: this.selectedAlbert,
      });
    });
  }

  onDropdownAlbertChange(event: any) {}

  getCores() {
    this.coresService.getAll().subscribe((data: any) => {
      this.cores = data?.res;
      this.selectedCore = this.cores.find(
        (c: any) => c?.id === this.originalProductType?.cores?.id
      );

      this.addNewForm.patchValue({
        selectedCore: this.selectedCore,
      });
    });
  }

  onDropdownCoreChange(event: any) {}

  getBrands() {
    this.brandService.getAll().subscribe((b) => {
      this.brands = b?.res;
      this.selectedBrand = this.brands.find(
        (b: any) => b?.id === this.originalProductType?.brand_id
      );

      this.addNewForm.patchValue({
        selectedBrand: this.brands[0],
      });
    });
  }

  onDropdownBrandChange(event: any) {}

  cancel() {
    this.ref.close(false);
  }

  generateProductCode(): string {
    const uuid = uuidv4().toUpperCase();
    const formData = this.addNewForm.getRawValue();
    const code = `${uuid.substr(0, 3)}-${uuid.substr(9, 4)}-${uuid.substr(
      19,
      4
    )}`;
    return code;
  }

  autoGenerateCode() {
    this.addNewForm.patchValue({
      productTypeCode: this.generateProductCode(),
    });
  }

  update() {
    const formData = this.addNewForm.getRawValue();

    let p = {
      id: this.originalProductType?.id,
      product_type_name:
        formData?.selectedBrand?.brand_name +
        '-' +
        formData?.productTypeCode +
        ' - ' +
        formData?.gender?.name +
        ' - ' +
        formData?.selectedGlass?.glass_name +
        ' - ' +
        formData?.selectedCore?.core_name +
        ' - ' +
        'Mặt Số ' +
        formData?.productDialWidth +
        ' - ' +
        'Chống Nước ' +
        formData?.productWaterproof,
      product_image_uuid: this.imgURLS,
      price: formData?.price,
      brand_id: formData?.selectedBrand?.id,
      sub_category_id: this.subCategoryId,
      product_albert_id: formData?.selectedAlbert?.id,
      product_core_id: formData?.selectedCore?.id,
      product_glass_id: formData?.selectedGlass?.id,
      product_source: formData?.productSource,
      product_guarantee: formData?.productGuarantee,
      product_dial_width: formData?.productDialWidth,
      product_dial_height: formData?.productDialHeight,
      product_dial_color: formData?.productDialColor,
      product_waterproof: formData?.productWaterproof,
      product_features: formData?.productFeatures,
      product_additional_information: formData?.productAdditionalInformation,
      product_type_code: formData?.productTypeCode,
      gender: formData?.gender?.name,
    };
    console.log('🏍️ ~ p: ', p);

    if (!formData) {
      return;
    }
    this.productsService.updateProductType(p).subscribe(
      (res) => {
        console.log('🏍️ ~ res: ', res);
        if (res?.message) {
          this.toastService.showMessage(
            ToasSumary.Success,
            res?.message,
            ToastType.Success
          );
          this.ref.close(true);
        }
      },
      (err) => {
        console.log('🏍️ ~ err: ', err);

        if (err?.error?.message) {
          this.toastService.showMessage(
            ToasSumary.Error,
            err?.error?.message,
            ToastType.Error
          );
        }
        this.ref.close(false);
      }
    );
  }
}
