import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { BrandsService } from 'src/app/brands.service';
import { ProductAlbertService } from 'src/app/service/product-albert.service';
import { ProductCoreService } from 'src/app/service/product-core.service';
import { ProductGlassService } from 'src/app/service/product-glass.service';
import { CategoryService } from 'src/service/category.service';
import { LoadingService } from 'src/service/loading.service';
import { ProductsService } from 'src/service/products.service';
import { ToastService } from 'src/service/toast.service';
import * as LR from '@uploadcare/blocks';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { ImgReviewComponent } from 'src/app/img-review/img-review.component';
LR.registerBlocks(LR);

@Component({
  selector: 'app-add-new-product-types',
  templateUrl: './add-new-product-types.component.html',
  styleUrls: ['./add-new-product-types.component.scss'],
})
export class AddNewProductTypesComponent implements OnInit {
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

  addNewForm: any = this.fb.group({
    productTypeName: ['', Validators.required],
    price: [0, Validators.required],
    selectedBrand: ['', Validators.required],
    selectedCore: ['', Validators.required],
    selectedAlbert: ['', Validators.required],
    selectedGlass: ['', Validators.required],
    productDialHeight: ['', Validators.required],
    productDialWidth: ['', Validators.required],
    productDialColor: ['', Validators.required],
    productGuarantee: ['', Validators.required],
    productWaterproof: ['', Validators.required],
    productSource: ['', Validators.required],
    productFeatures: ['', Validators.required],
    productAdditionalInformation: ['', Validators.required],
  });

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private config: DynamicDialogConfig,
    private productsService: ProductsService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private categoriesService: CategoryService,
    private subCategoriesService: CategoryService,
    private brandService: BrandsService,
    private coresService: ProductCoreService,
    private albertsService: ProductAlbertService,
    private glassesService: ProductGlassService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    window.addEventListener('LR_DATA_OUTPUT', (e: any) => {
      this.imgURLS = [];
      this.imgDirty = true;
      if (e.detail.ctx === 'add-new-productType') {
        e.detail?.data.forEach((d: any) => {
          const uploadedUrl = d?.cdnUrl + e.detail?.data[0]?.name;
          this.imgURLS.push(uploadedUrl);
        });
      }
      console.log('🏍️ ~ this.imgURLS: ', this.imgURLS);
    });

    if (this.config.data) {
      const data = this.config.data;
      this.subCategoryId = data?.subCategoryId;
    }

    this.getBrands();
    this.getCores();
    this.getAlberts();
    this.getGlasses();
  }

  getGlasses() {
    this.glassesService.getAll().subscribe((data: any) => {
      this.glasses = data?.res;
      this.selectedGlass = this.glasses[0];
      this.addNewForm.patchValue({
        selectedGlass: this.selectedGlass,
      });
    });
  }

  onDropdownGlassChange(event: any) {}

  getAlberts() {
    this.albertsService.getAll().subscribe((data: any) => {
      this.alberts = data?.res;
      this.selectedAlbert = this.alberts[0];
      this.addNewForm.patchValue({
        selectedAlbert: this.selectedAlbert,
      });
    });
  }

  onDropdownAlbertChange(event: any) {}

  getCores() {
    this.coresService.getAll().subscribe((data: any) => {
      this.cores = data?.res;
      this.selectedCore = this.cores[0];
      this.addNewForm.patchValue({
        selectedCore: this.selectedCore,
      });
    });
  }

  onDropdownCoreChange(event: any) {}

  openImage(imageUrl: string) {
    const ref = this.dialogService.open(ImgReviewComponent, {
      header: 'Image Review',
      dismissableMask: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { imageUrl: imageUrl },
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe((b) => {
      this.brands = b?.res;
      this.selectedBrand = this.brands[0];
      this.addNewForm.patchValue({
        selectedBrand: this.brands[0],
      });
    });
  }

  onDropdownBrandChange(event: any) {}

  cancel() {
    this.ref.close(false);
  }

  create() {
    const formData = this.addNewForm.getRawValue();

    let p = {
      product_type_name: formData?.productTypeName,
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
    };
    console.log('🏍️ ~ p: ', p)

    if (!formData) {
      return;
    }
    this.productsService.createProductType(p).subscribe(
      (res) => {
        console.log('🏍️ ~ res: ', res)
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
      console.log('🏍️ ~ err: ', err)

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
