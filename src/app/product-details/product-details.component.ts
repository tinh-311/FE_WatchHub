import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/service/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: any;
  imgUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getAllProductTypesById(id).subscribe((data: any) => {
        this.product = data;
        console.log('🏍️ ~ this.product: ', this.product)
      });
    });
  }

  getProductStatus(quantity: number): string {
    if(quantity <= 0) {
      return 'Tạm hết hàng';
    }

    if(quantity <= 10) {
      return `Chỉ còn ${quantity} sản phẩm`;
    }

    if(quantity > 10) {
      return `Còn ${quantity} sản phẩm`;
    }

    return '';
  }

  changeSelectedImg(imgUrl: string) {
    this.imgUrl = imgUrl;
    console.log('🏍️ ~ this.imgUrl: ', this.imgUrl)
  }
}
