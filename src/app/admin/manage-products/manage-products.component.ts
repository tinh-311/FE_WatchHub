import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductsService } from 'src/service/products.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  productTypes: any;
  selectedProductTypes: any;

  currentPage: any = 1;
  rowsPerPage: any = 5;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private productService: ProductsService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getProductTypes();
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getProducts();
  }

  onDropdownChange(event: any) {
    this.selectedProductTypes = event?.value;
    this.getProducts();
  }

  getProducts() {}

  getProductTypes() {
    this.productService.getAllProductTypes().subscribe((data) => {
      this.productTypes = data.res;
      console.log('🏍️ ~ this.productTypes: ', this.productTypes);
      this.selectedProductTypes = this.productTypes[0];
      console.log('🏍️ ~ this.selectedProductTypes: ', this.selectedProductTypes)
    });
  }

  showModalAddNew() {}
}
