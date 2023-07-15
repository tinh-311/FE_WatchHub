import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import {
  DynamicDialogRef,
  DynamicDialogConfig,
  DialogService,
} from 'primeng/dynamicdialog';
import { BrandsService } from 'src/app/brands.service';
import {
  DIAL_COLOR,
  GENDER,
  getKeyByValue,
} from 'src/app/constant/util.constant';
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
  selectedGender: any;

  genderOptions: any = [
    { val: getKeyByValue(GENDER, GENDER.MALE), name: GENDER.MALE },
    { val: getKeyByValue(GENDER, GENDER.FEMALE), name: GENDER.FEMALE },
    { val: getKeyByValue(GENDER, GENDER.COUPLE), name: GENDER.COUPLE },
    { val: getKeyByValue(GENDER, GENDER.UNISEX), name: GENDER.UNISEX },
  ];

  colorOptions: any = [
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.BLACK),
      name: DIAL_COLOR.BLACK,
    },
    { val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.BLUE), name: DIAL_COLOR.BLUE },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.BROWN),
      name: DIAL_COLOR.BROWN,
    },
    { val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.CYAN), name: DIAL_COLOR.CYAN },
    { val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.GOLD), name: DIAL_COLOR.GOLD },
    { val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.GRAY), name: DIAL_COLOR.GRAY },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.GREEN),
      name: DIAL_COLOR.GREEN,
    },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.INDIGO),
      name: DIAL_COLOR.INDIGO,
    },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.MAGENTA),
      name: DIAL_COLOR.MAGENTA,
    },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.ORANGE),
      name: DIAL_COLOR.ORANGE,
    },
    { val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.PINK), name: DIAL_COLOR.PINK },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.PURPLE),
      name: DIAL_COLOR.PURPLE,
    },
    { val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.RED), name: DIAL_COLOR.RED },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.SILVER),
      name: DIAL_COLOR.SILVER,
    },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.VIOLET),
      name: DIAL_COLOR.VIOLET,
    },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.WHITE),
      name: DIAL_COLOR.WHITE,
    },
    {
      val: getKeyByValue(DIAL_COLOR, DIAL_COLOR.YELLOW),
      name: DIAL_COLOR.YELLOW,
    },
  ];

  groupedCategories!: SelectItemGroup[];
  selectedCategories: any;

  addNewForm: any = this.fb.group({
    price: [0, Validators.required],
    selectedBrand: ['', Validators.required],
    selectedCore: ['', Validators.required],
    selectedAlbert: ['', Validators.required],
    productTypeCode: ['', Validators.required],
    selectedGlass: ['', Validators.required],
    productDialHeight: ['', Validators.required],
    productDialWidth: ['', Validators.required],
    productDialColor: [this.colorOptions[0], Validators.required],
    productGuarantee: ['', Validators.required],
    productWaterproof: ['', Validators.required],
    productSource: ['', Validators.required],
    productFeatures: ['', Validators.required],
    productAdditionalInformation: ['', Validators.required],
    gender: [this.genderOptions[0], Validators.required],
    subCategories: ['', Validators.required],
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
  ) {
    this.categoriesService.getAll().subscribe(async (category: any) => {
      this.groupedCategories = await category?.res?.map((data: any) => {
        return {
          label: data?.category_name,
          value: data?.id,
          items: data?.subCategories.map((s: any) => {
            return {
              label: s?.sub_category_name,
              value: s?.id,
            };
          }),
        };
      });

      this.selectedCategories =
        this.originalProductType?.productSubCategories.map(
          (item: any) => item.sub_category_id
        );

      this.addNewForm.patchValue({
        subCategories: this.selectedCategories,
      });
    });
  }

  async ngOnInit(): Promise<void> {
    this.addNewForm.get('productTypeCode').disable();
    window.addEventListener('LR_DATA_OUTPUT', (e: any) => {
      this.imgURLS = [];
      this.imgDirty = true;
      if (e.detail.ctx === 'edit-productType') {
        e.detail?.data.forEach((d: any) => {
          const uploadedUrl = d?.cdnUrl + e.detail?.data[0]?.name;
          this.imgURLS.push(uploadedUrl);
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
        productDialColor: this.colorOptions.find(
          (c: any) => c.val === this.originalProductType?.product_dial_color
        ),
        productGuarantee: this.originalProductType?.product_guarantee,
        productTypeCode: this.originalProductType?.product_type_code,
        productWaterproof: this.originalProductType?.product_waterproof,
        gender: this.genderOptions.find(
          (g: any) => g.val === this.originalProductType?.gender
        ),
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
        (g: any) => g.glass_name === this.originalProductType?.glass?.glass_name
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
        (a: any) =>
          a.albert_name === this.originalProductType?.albert?.albert_name
      );

      this.addNewForm.patchValue({
        selectedAlbert: this.selectedAlbert,
      });
    });
  }

  onDropdownGenderChange(event: any) {
    this.selectedGender = event?.value;
  }

  onDropdownAlbertChange(event: any) {}

  getCores() {
    this.coresService.getAll().subscribe((data: any) => {
      this.cores = data?.res;
      this.selectedCore = this.cores.find(
        (c: any) => c?.core_name === this.originalProductType?.core?.core_name
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
        selectedBrand: this.selectedBrand,
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
        formData?.productDialColor?.name +
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
      sub_category_ids: formData?.subCategories,
      product_albert_id: formData?.selectedAlbert?.id,
      product_core_id: formData?.selectedCore?.id,
      product_glass_id: formData?.selectedGlass?.id,
      product_source: formData?.productSource,
      product_guarantee: formData?.productGuarantee,
      product_dial_width: formData?.productDialWidth,
      product_dial_height: formData?.productDialHeight,
      product_dial_color: formData?.productDialColor.val,
      product_waterproof: formData?.productWaterproof,
      product_features: formData?.productFeatures,
      product_additional_information: formData?.productAdditionalInformation,
      product_type_code: formData?.productTypeCode,
      gender: formData?.gender?.val,
    };

    if (!formData) {
      return;
    }
    this.productsService.updateProductType(p).subscribe(
      (res) => {
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
