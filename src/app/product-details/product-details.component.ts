import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/service/products.service';
import { CartService } from '../service/cart.service';
import { GENDER, displayGender, getColor } from '../constant/util.constant';
import { UserService } from 'src/service/user.service';
import jwt_decode from 'jwt-decode';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  imgUrl: string = '';
  quantity: number = 1;
  currentUser: any;
  newRating: number = 5;

  curentNumpage: number = 1;

  isLoadingComment: boolean = false;

  comments: any = [];
  newComment: string = '';

  isShowLoadMore: boolean = true;

  addComment() {
    console.log('🏍️ ~ this.newRating: ', this.newRating);
    console.log('🏍️ ~ this.newComment: ', this.newComment);

    if (this.newComment.trim() !== '' && this.newRating) {
      let newComment: any = {
        feedback_message: this.newComment,
        feedback_images: [],
        rating: this.newRating,
        user_id: this.currentUser?.id,
        product_type_id: this.product?.id,
        user: {
          avatar: this.currentUser?.avatar,
          fullname: this.currentUser?.fullname,
        },
      };
      console.log('🏍️ ~ cmt: ', newComment);

      this.commentService.create(newComment).subscribe((res: any) => {
        console.log('🏍️ ~ res: ', res);
      });

      this.comments.unshift(newComment);
      this.newComment = '';
    }
  }

  textWithBreaks(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  safeHtml(commentText: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(commentText);
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private commentService: CommentService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProductTypesById(id).subscribe((data: any) => {
        this.product = data;
        this.changeSelectedImg(this.product?.product_image_uuid[0]);
        this.getComments(false);
      });
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwt_decode(token);
      console.log('🏍️ ~ this.currentUser: ', this.currentUser);

      this.getUserById(this.currentUser?.id)
        .then((data: any) => {
          this.currentUser = data;
          console.log('🏍️ ~ this.currentUser: ', this.currentUser);
        })
        .catch((error: any) => {});
    }
  }
  ngOnInit(): void {}

  loadMoreComments() {
    this.getComments();
  }

  getComments(isCount: boolean = true) {
    this.isLoadingComment = true;
    this.commentService
      .getById(this.curentNumpage, 5, this.product?.id)
      .subscribe(
        (comments: any) => {
          this.comments = this.comments.concat(comments?.res);
          this.isLoadingComment = false;
          this.curentNumpage++;

          console.log('🏍️ ~ comments?.totalCount: ', comments?.totalCount);

          console.log('🏍️ ~ this.comments: ', this.comments);
          if (this.comments?.length === comments?.totalCount) {
            this.isShowLoadMore = false;
          }
          console.log('🏍️ ~ comments: ', comments);
        },
        (err) => {
          this.isLoadingComment = false;
        }
      );
  }

  getGender(gender: any) {
    return displayGender(gender);
  }

  getUserById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByID(id).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  getColor(data: any) {
    return getColor(data);
  }

  getProductStatus(quantity: number): string {
    if (quantity <= 0) {
      return 'Tạm hết hàng';
    }

    if (quantity <= 10) {
      return `Chỉ còn ${quantity} sản phẩm`;
    }

    if (quantity > 10) {
      return `Còn ${quantity} sản phẩm`;
    }

    return '';
  }

  changeSelectedImg(imgUrl: string) {
    this.imgUrl = imgUrl;
  }

  addToCart() {
    this.cartService.addToCart({
      ...this.product,
      orderQty: this.quantity,
    });
  }
}
