import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { getAuth, signOut } from 'firebase/auth';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FullScreenService } from 'src/service/full-screen.service';
import jwt_decode from 'jwt-decode';
import * as LR from '@uploadcare/blocks';
import { CategoryService } from 'src/service/category.service';
import { LoadingService } from 'src/service/loading.service';
import { BreadcrumbService } from 'src/service/breadcrumb.service';
import { UtilService } from 'src/service/util.service';
import { finalize } from 'rxjs';

LR.registerBlocks(LR);
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  searchInput: string = '';
  isFullScreen: boolean = false;
  currentUser: any;
  categories: any;
  selectedItemHeader: any;
  breadcrumbItems: any;

  filteredProducts: any = [];

  constructor(
    private router: Router,
    private fullScreenService: FullScreenService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private utilService: UtilService
  ) {
    this.route.queryParams.subscribe((params) => {
      const categoryName = params['categoryName'];
      console.log('🏍️ ~ categoryName: ', categoryName);
      this.selectedItemHeader = categoryName;
      this.getCategories();
    });

    const token = localStorage.getItem('token');
    console.log('🏍️ ~ token: ', token);
    if (token) {
      this.currentUser = jwt_decode(token);
    }

    this.utilService.user$.subscribe((data) => {
      const token = localStorage.getItem('token');
      if (token) {
        this.currentUser = jwt_decode(token);
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  getCategories() {
    this.loadingService.showLoading();
    this.categoryService.getAll().subscribe(
      (data: any) => {
        this.categories = data?.res || [];
        this.loadingService.hideLoading();
      },
      (err) => {
        this.loadingService.hideLoading();
      }
    );
  }

  isMobileScreen(): boolean {
    const mobileScreenWidth = 768;
    return window.innerWidth < mobileScreenWidth;
  }

  navigateAdmin() {
    this.router.navigate(['/admin']);
  }

  navigateLogin() {
    this.router.navigate(['/login']);
  }

  toggleFullscreen() {
    this.isFullScreen = !this.isFullScreen;
    this.fullScreenService.toggleFullscreen();
  }

  onClickFavourite() {}

  onClickCart() {
    if (!this.currentUser) {
      return;
    }

    this.router.navigate(['/shopping-cart']);
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Đăng xuất thành công
        console.log('Đăng xuất thành công');
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
      })
      .catch((error) => {
        // Xảy ra lỗi khi đăng xuất
        console.error('Lỗi đăng xuất:', error);
      });
  }

  onClickCategory(data: any) {
    console.log('🏍️ ~ data: ', data);
    const categoryId = data.id;
    const categoryName = data.category_name;
    const queryParams: NavigationExtras = {
      queryParams: { categoryName, categoryId },
    };

    this.router.navigate(['/subcategory'], queryParams);
  }

  searchProducts(event: any) {
    const query = event.query;
    this.filteredProducts = [
      {
        id: 66,
        product_type_name:
          'Casio - 868-C6FC-96EE- - Kính Cứng - Pin (Quartz) - Mặt Số 12.1 mm - Chống Nước 10 ATM',
        quantity: 0,
        price: 3529000,
        product_image_uuid: [
          'https://ucarecdn.com/113cd6ca-4d79-44e3-adc7-37e05dc9d353/68_EFV550L1AVUDF1699x699.jpg',
          'https://ucarecdn.com/ae2a0094-7b0e-4b17-9d31-80be8047f70e/68_EFV550L1AVUDF1699x699.jpg',
          'https://ucarecdn.com/6fd1e5e9-8483-4660-8daf-826942c4bf4d/68_EFV550L1AVUDF1699x699.jpg',
        ],
        brand_id: 1,
        brand_name: 'Casio',
        brand_logo:
          'https://ucarecdn.com/0791cb26-4425-4009-95e6-f4a5786f8777/faba21c9bfa473a6e44cec9eda750e56w225h225.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây Da',
          id: 1,
          created_date: '2023-06-12T02:11:25.49887Z',
          created_user: 1,
          updated_date: '2023-06-19T15:38:12.518818Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Cứng',
          id: 1,
          created_date: '2023-06-12T02:13:19.811112Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:11.133Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: '1 Năm',
        product_dial_width: '12.1 mm',
        product_dial_height: '47 mm',
        product_dial_color: 'Đen',
        product_waterproof: '10 ATM',
        product_features: 'Lịch ngày – Chronograph',
        product_additional_information:
          'Mẫu Casio EFV-550L-1AVUDF mang đến cho phái mạnh vẻ ngoài lịch lãm nhưng cũng không kém phần trẻ trung đặc trưng thuộc dòng Edifice với kiểu dáng đồng hồ 6 kim đi kèm tính năng đo thời gian Chronograph.',
        created_date: '2023-06-22T02:09:53.0125249Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:53.0125259Z',
        updated_user: 1,
        is_deleted: false,
      },
      {
        id: 69,
        product_type_name:
          'Casio - 48B-A441-B44A- - Kính Nhựa - Pin (Quartz) - Mặt Số 16.6 mm - Chống Nước 10 ATM',
        quantity: 0,
        price: 1581000,
        product_image_uuid: [
          'https://ucarecdn.com/bb763871-5c19-4910-9cdc-4dd4745cfaa3/118_AEQ110W3AVDF699x699.jpg',
          'https://ucarecdn.com/35ca3e26-e9f5-4a6b-b5f8-211f24438d04/118_AEQ110W3AVDF699x699.jpg',
        ],
        brand_id: 1,
        brand_name: 'Casio',
        brand_logo:
          'https://ucarecdn.com/0791cb26-4425-4009-95e6-f4a5786f8777/faba21c9bfa473a6e44cec9eda750e56w225h225.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây Nhựa / Cao Su',
          id: 12,
          created_date: '2023-06-19T15:37:29.812195Z',
          created_user: 1,
          updated_date: '2023-06-19T15:37:29.8122Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Nhựa',
          id: 6,
          created_date: '2023-06-19T15:42:28.713545Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:28.713554Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: '1 Năm',
        product_dial_width: '16.6 mm',
        product_dial_height: '46.6 mm',
        product_dial_color: 'Đen',
        product_waterproof: '10 ATM',
        product_features:
          'Lịch – Bộ Bấm Giờ – Giờ Kép – Đèn Led – Dạ Quang – Vài Chức Năng Khác',
        product_additional_information:
          'Mẫu Casio AEQ-110W-3AVDF thiết kế phong cách dành cho các tín đồ yêu thích các hoạt động thể thao ngoài trời hoặc dân đi phượt với nền mặt số điện tử đi kèm đa chức năng cùng khả năng chịu nước 10 ATM.',
        created_date: '2023-06-22T02:09:53.3739112Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:53.3739119Z',
        updated_user: 1,
        is_deleted: false,
      },
      {
        id: 70,
        product_type_name:
          'Casio - F7D-E6DA-A4D6- - Kính Nhựa - Pin (Quartz) - Mặt Số 12.5 mm - Chống Nước 10 ATM',
        quantity: 0,
        price: 1218000,
        product_image_uuid: [
          'https://ucarecdn.com/8de301d7-610f-4586-9056-b20176049b33/12_AE1200WHB1BVDF699x699.jpg',
          'https://ucarecdn.com/f5ec80fc-a724-40e1-aee3-21382c06a164/12_AE1200WHB1BVDF699x699.jpg',
          'https://ucarecdn.com/4b881048-4f72-4bca-9bf6-5a0503b85958/12_AE1200WHB1BVDF699x699.jpg',
        ],
        brand_id: 1,
        brand_name: 'Casio',
        brand_logo:
          'https://ucarecdn.com/0791cb26-4425-4009-95e6-f4a5786f8777/faba21c9bfa473a6e44cec9eda750e56w225h225.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây vải',
          id: 10,
          created_date: '2023-06-19T15:34:21.633424Z',
          created_user: 1,
          updated_date: '2023-06-19T15:34:21.633429Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Nhựa',
          id: 6,
          created_date: '2023-06-19T15:42:28.713545Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:28.713554Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: 'Quốc tế 1 năm',
        product_dial_width: '12.5 mm',
        product_dial_height: '45 mm',
        product_dial_color: 'Xám',
        product_waterproof: '10 ATM',
        product_features:
          'Lịch – Bộ Bấm Giờ – Giờ Thế Giới – Đèn Led – Vài Chức Năng Khác',
        product_additional_information:
          'Đồng hồ nam Casio AE-1200WHB-1BVDF với thiết kế mạnh mẽ, vỏ máy tông màu xanh lục chủ đạo kết hợp cùng màu đen của viền bên ngoài tinh tế, phối cùng bộ dây đeo bằng vải tạo nên phong cách đậm chất cá tính.',
        created_date: '2023-06-22T02:09:53.7382352Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:53.7382359Z',
        updated_user: 1,
        is_deleted: false,
      },
      {
        id: 82,
        product_type_name:
          'G-Shock - A48-6788-8B09- - Kính Cứng - Pin (Quartz) - Mặt Số 18.44 - Chống Nước 20 ATM',
        quantity: 0,
        price: 3524000,
        product_image_uuid: [
          'https://ucarecdn.com/1bfcea64-078b-43b5-a7d2-3766cd83045d/GA7001ADR.jpg',
          'https://ucarecdn.com/e9e2f7b2-1429-4f16-a6da-f70419d30896/GA7001ADR.jpg',
          'https://ucarecdn.com/602c3e00-295d-4a9b-99a1-db5ebe5a1218/GA7001ADR.jpg',
          'https://ucarecdn.com/0fa4e9a2-478b-4b13-b381-b92092cdd2d6/GA7001ADR.jpg',
          'https://ucarecdn.com/65c34619-c9d9-4463-82b9-b3635ba0ae36/GA7001ADR.jpg',
          'https://ucarecdn.com/6e70daa7-157f-4f22-be53-b47f1c467300/GA7001ADR.jpg',
          'https://ucarecdn.com/0dab34cf-da16-4fad-97cc-f2a7d08c59d3/GA7001ADR.jpg',
          'https://ucarecdn.com/8e4078f8-1bb0-4dca-a2bc-51e432fe6839/GA7001ADR.jpg',
          'https://ucarecdn.com/721a1f3e-8b5a-4190-8a22-2b9a0a647d3a/GA7001ADR.jpg',
          'https://ucarecdn.com/eea17914-d1ff-4656-97a1-822dae703a69/GA7001ADR.jpg',
        ],
        brand_id: 18,
        brand_name: 'G-Shock',
        brand_logo:
          'https://ucarecdn.com/21427514-1042-4cdd-b407-5287254836c1/GShock_logosvg.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây Nhựa / Cao Su',
          id: 12,
          created_date: '2023-06-19T15:37:29.812195Z',
          created_user: 1,
          updated_date: '2023-06-19T15:37:29.8122Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Cứng',
          id: 1,
          created_date: '2023-06-12T02:13:19.811112Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:11.133Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: '5 Năm',
        product_dial_width: '18.44',
        product_dial_height: '57.4 mm',
        product_dial_color: 'Đen',
        product_waterproof: '20 ATM',
        product_features:
          'Lịch – Bộ Bấm Giờ – Giờ Kép – Đèn Led – Vài Chức Năng Khác',
        product_additional_information:
          'Đồng hồ G-Shock GA-700-1ADR với thiết kế vỏ máy bằng nhựa kết hợp cùng dây đeo cao su khả năng chống nước cao, theo phong cách thể thao kết hợp mặt số điện tử với những tính năng tiện dụng',
        created_date: '2023-06-22T02:09:54.0989644Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:54.098965Z',
        updated_user: 1,
        is_deleted: false,
      },
      {
        id: 84,
        product_type_name:
          'G-Shock - 6D8-C277-9570- - Kính Cứng - Pin (Quartz) - Mặt Số 11.8 mm - Chống Nước 20 ATM',
        quantity: 0,
        price: 3628000,
        product_image_uuid: [
          'https://ucarecdn.com/599708f1-4f8b-4003-9f45-9c9da38076bf/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/04bb2e5e-0264-43ab-9edb-e73ad6c49416/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/bbba6d93-1472-4550-82bf-a4205c867847/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/a5427e1f-c8ac-4990-8165-c3e46195f9cc/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/5398c40f-73b2-4e2b-8a5d-0f6fa9a9bc58/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/af7c8714-ff78-4221-b233-4aec4bde1e93/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/f62327c3-d407-4fa5-aa44-c6d32e4e9cb7/CASIOGA21004ADR4.jpg',
        ],
        brand_id: 18,
        brand_name: 'G-Shock',
        brand_logo:
          'https://ucarecdn.com/21427514-1042-4cdd-b407-5287254836c1/GShock_logosvg.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây Nhựa / Cao Su',
          id: 12,
          created_date: '2023-06-19T15:37:29.812195Z',
          created_user: 1,
          updated_date: '2023-06-19T15:37:29.8122Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Cứng',
          id: 1,
          created_date: '2023-06-12T02:13:19.811112Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:11.133Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: '5 Năm',
        product_dial_width: '11.8 mm',
        product_dial_height: '48.5 mm',
        product_dial_color: '48.5 mm',
        product_waterproof: '20 ATM',
        product_features:
          'Lịch – Bộ Bấm Giờ – Giờ Kép – Đèn Led – Vài Chức Năng Khác',
        product_additional_information:
          'Mẫu G-Shock GA-2100-4ADR phiên bản tone màu đỏ trẻ trung nổi bật phần dây vỏ nhựa năng động, đi kèm với khả năng chịu nước lên đến 20ATM.',
        created_date: '2023-06-22T02:09:54.4633296Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:54.4633303Z',
        updated_user: 1,
        is_deleted: false,
      },
      {
        id: 66,
        product_type_name:
          'Casio - 868-C6FC-96EE- - Kính Cứng - Pin (Quartz) - Mặt Số 12.1 mm - Chống Nước 10 ATM',
        quantity: 0,
        price: 3529000,
        product_image_uuid: [
          'https://ucarecdn.com/113cd6ca-4d79-44e3-adc7-37e05dc9d353/68_EFV550L1AVUDF1699x699.jpg',
          'https://ucarecdn.com/ae2a0094-7b0e-4b17-9d31-80be8047f70e/68_EFV550L1AVUDF1699x699.jpg',
          'https://ucarecdn.com/6fd1e5e9-8483-4660-8daf-826942c4bf4d/68_EFV550L1AVUDF1699x699.jpg',
        ],
        brand_id: 1,
        brand_name: 'Casio',
        brand_logo:
          'https://ucarecdn.com/0791cb26-4425-4009-95e6-f4a5786f8777/faba21c9bfa473a6e44cec9eda750e56w225h225.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây Da',
          id: 1,
          created_date: '2023-06-12T02:11:25.49887Z',
          created_user: 1,
          updated_date: '2023-06-19T15:38:12.518818Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Cứng',
          id: 1,
          created_date: '2023-06-12T02:13:19.811112Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:11.133Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: '1 Năm',
        product_dial_width: '12.1 mm',
        product_dial_height: '47 mm',
        product_dial_color: 'Đen',
        product_waterproof: '10 ATM',
        product_features: 'Lịch ngày – Chronograph',
        product_additional_information:
          'Mẫu Casio EFV-550L-1AVUDF mang đến cho phái mạnh vẻ ngoài lịch lãm nhưng cũng không kém phần trẻ trung đặc trưng thuộc dòng Edifice với kiểu dáng đồng hồ 6 kim đi kèm tính năng đo thời gian Chronograph.',
        created_date: '2023-06-22T02:09:53.0125249Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:53.0125259Z',
        updated_user: 1,
        is_deleted: false,
      },
      {
        id: 69,
        product_type_name:
          'Casio - 48B-A441-B44A- - Kính Nhựa - Pin (Quartz) - Mặt Số 16.6 mm - Chống Nước 10 ATM',
        quantity: 0,
        price: 1581000,
        product_image_uuid: [
          'https://ucarecdn.com/bb763871-5c19-4910-9cdc-4dd4745cfaa3/118_AEQ110W3AVDF699x699.jpg',
          'https://ucarecdn.com/35ca3e26-e9f5-4a6b-b5f8-211f24438d04/118_AEQ110W3AVDF699x699.jpg',
        ],
        brand_id: 1,
        brand_name: 'Casio',
        brand_logo:
          'https://ucarecdn.com/0791cb26-4425-4009-95e6-f4a5786f8777/faba21c9bfa473a6e44cec9eda750e56w225h225.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây Nhựa / Cao Su',
          id: 12,
          created_date: '2023-06-19T15:37:29.812195Z',
          created_user: 1,
          updated_date: '2023-06-19T15:37:29.8122Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Nhựa',
          id: 6,
          created_date: '2023-06-19T15:42:28.713545Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:28.713554Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: '1 Năm',
        product_dial_width: '16.6 mm',
        product_dial_height: '46.6 mm',
        product_dial_color: 'Đen',
        product_waterproof: '10 ATM',
        product_features:
          'Lịch – Bộ Bấm Giờ – Giờ Kép – Đèn Led – Dạ Quang – Vài Chức Năng Khác',
        product_additional_information:
          'Mẫu Casio AEQ-110W-3AVDF thiết kế phong cách dành cho các tín đồ yêu thích các hoạt động thể thao ngoài trời hoặc dân đi phượt với nền mặt số điện tử đi kèm đa chức năng cùng khả năng chịu nước 10 ATM.',
        created_date: '2023-06-22T02:09:53.3739112Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:53.3739119Z',
        updated_user: 1,
        is_deleted: false,
      },
      {
        id: 70,
        product_type_name:
          'Casio - F7D-E6DA-A4D6- - Kính Nhựa - Pin (Quartz) - Mặt Số 12.5 mm - Chống Nước 10 ATM',
        quantity: 0,
        price: 1218000,
        product_image_uuid: [
          'https://ucarecdn.com/8de301d7-610f-4586-9056-b20176049b33/12_AE1200WHB1BVDF699x699.jpg',
          'https://ucarecdn.com/f5ec80fc-a724-40e1-aee3-21382c06a164/12_AE1200WHB1BVDF699x699.jpg',
          'https://ucarecdn.com/4b881048-4f72-4bca-9bf6-5a0503b85958/12_AE1200WHB1BVDF699x699.jpg',
        ],
        brand_id: 1,
        brand_name: 'Casio',
        brand_logo:
          'https://ucarecdn.com/0791cb26-4425-4009-95e6-f4a5786f8777/faba21c9bfa473a6e44cec9eda750e56w225h225.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây vải',
          id: 10,
          created_date: '2023-06-19T15:34:21.633424Z',
          created_user: 1,
          updated_date: '2023-06-19T15:34:21.633429Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Nhựa',
          id: 6,
          created_date: '2023-06-19T15:42:28.713545Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:28.713554Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: 'Quốc tế 1 năm',
        product_dial_width: '12.5 mm',
        product_dial_height: '45 mm',
        product_dial_color: 'Xám',
        product_waterproof: '10 ATM',
        product_features:
          'Lịch – Bộ Bấm Giờ – Giờ Thế Giới – Đèn Led – Vài Chức Năng Khác',
        product_additional_information:
          'Đồng hồ nam Casio AE-1200WHB-1BVDF với thiết kế mạnh mẽ, vỏ máy tông màu xanh lục chủ đạo kết hợp cùng màu đen của viền bên ngoài tinh tế, phối cùng bộ dây đeo bằng vải tạo nên phong cách đậm chất cá tính.',
        created_date: '2023-06-22T02:09:53.7382352Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:53.7382359Z',
        updated_user: 1,
        is_deleted: false,
      },
      {
        id: 82,
        product_type_name:
          'G-Shock - A48-6788-8B09- - Kính Cứng - Pin (Quartz) - Mặt Số 18.44 - Chống Nước 20 ATM',
        quantity: 0,
        price: 3524000,
        product_image_uuid: [
          'https://ucarecdn.com/1bfcea64-078b-43b5-a7d2-3766cd83045d/GA7001ADR.jpg',
          'https://ucarecdn.com/e9e2f7b2-1429-4f16-a6da-f70419d30896/GA7001ADR.jpg',
          'https://ucarecdn.com/602c3e00-295d-4a9b-99a1-db5ebe5a1218/GA7001ADR.jpg',
          'https://ucarecdn.com/0fa4e9a2-478b-4b13-b381-b92092cdd2d6/GA7001ADR.jpg',
          'https://ucarecdn.com/65c34619-c9d9-4463-82b9-b3635ba0ae36/GA7001ADR.jpg',
          'https://ucarecdn.com/6e70daa7-157f-4f22-be53-b47f1c467300/GA7001ADR.jpg',
          'https://ucarecdn.com/0dab34cf-da16-4fad-97cc-f2a7d08c59d3/GA7001ADR.jpg',
          'https://ucarecdn.com/8e4078f8-1bb0-4dca-a2bc-51e432fe6839/GA7001ADR.jpg',
          'https://ucarecdn.com/721a1f3e-8b5a-4190-8a22-2b9a0a647d3a/GA7001ADR.jpg',
          'https://ucarecdn.com/eea17914-d1ff-4656-97a1-822dae703a69/GA7001ADR.jpg',
        ],
        brand_id: 18,
        brand_name: 'G-Shock',
        brand_logo:
          'https://ucarecdn.com/21427514-1042-4cdd-b407-5287254836c1/GShock_logosvg.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây Nhựa / Cao Su',
          id: 12,
          created_date: '2023-06-19T15:37:29.812195Z',
          created_user: 1,
          updated_date: '2023-06-19T15:37:29.8122Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Cứng',
          id: 1,
          created_date: '2023-06-12T02:13:19.811112Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:11.133Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: '5 Năm',
        product_dial_width: '18.44',
        product_dial_height: '57.4 mm',
        product_dial_color: 'Đen',
        product_waterproof: '20 ATM',
        product_features:
          'Lịch – Bộ Bấm Giờ – Giờ Kép – Đèn Led – Vài Chức Năng Khác',
        product_additional_information:
          'Đồng hồ G-Shock GA-700-1ADR với thiết kế vỏ máy bằng nhựa kết hợp cùng dây đeo cao su khả năng chống nước cao, theo phong cách thể thao kết hợp mặt số điện tử với những tính năng tiện dụng',
        created_date: '2023-06-22T02:09:54.0989644Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:54.098965Z',
        updated_user: 1,
        is_deleted: false,
      },
      {
        id: 84,
        product_type_name:
          'G-Shock - 6D8-C277-9570- - Kính Cứng - Pin (Quartz) - Mặt Số 11.8 mm - Chống Nước 20 ATM',
        quantity: 0,
        price: 3628000,
        product_image_uuid: [
          'https://ucarecdn.com/599708f1-4f8b-4003-9f45-9c9da38076bf/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/04bb2e5e-0264-43ab-9edb-e73ad6c49416/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/bbba6d93-1472-4550-82bf-a4205c867847/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/a5427e1f-c8ac-4990-8165-c3e46195f9cc/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/5398c40f-73b2-4e2b-8a5d-0f6fa9a9bc58/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/af7c8714-ff78-4221-b233-4aec4bde1e93/CASIOGA21004ADR4.jpg',
          'https://ucarecdn.com/f62327c3-d407-4fa5-aa44-c6d32e4e9cb7/CASIOGA21004ADR4.jpg',
        ],
        brand_id: 18,
        brand_name: 'G-Shock',
        brand_logo:
          'https://ucarecdn.com/21427514-1042-4cdd-b407-5287254836c1/GShock_logosvg.png',
        sub_category_id: 23,
        sub_category_name: 'Thể thao',
        product_feedback_ids: null,
        alberts: {
          albert_name: 'Dây Nhựa / Cao Su',
          id: 12,
          created_date: '2023-06-19T15:37:29.812195Z',
          created_user: 1,
          updated_date: '2023-06-19T15:37:29.8122Z',
          updated_user: 1,
          is_deleted: false,
        },
        cores: {
          core_name: 'Pin (Quartz)',
          id: 8,
          created_date: '2023-06-19T15:40:10.552072Z',
          created_user: 1,
          updated_date: '2023-06-19T15:40:10.552077Z',
          updated_user: 1,
          is_deleted: false,
        },
        glasses: {
          glass_name: 'Kính Cứng',
          id: 1,
          created_date: '2023-06-12T02:13:19.811112Z',
          created_user: 1,
          updated_date: '2023-06-19T15:42:11.133Z',
          updated_user: 1,
          is_deleted: false,
        },
        product_source: 'Nhật Bản',
        product_guarantee: '5 Năm',
        product_dial_width: '11.8 mm',
        product_dial_height: '48.5 mm',
        product_dial_color: '48.5 mm',
        product_waterproof: '20 ATM',
        product_features:
          'Lịch – Bộ Bấm Giờ – Giờ Kép – Đèn Led – Vài Chức Năng Khác',
        product_additional_information:
          'Mẫu G-Shock GA-2100-4ADR phiên bản tone màu đỏ trẻ trung nổi bật phần dây vỏ nhựa năng động, đi kèm với khả năng chịu nước lên đến 20ATM.',
        created_date: '2023-06-22T02:09:54.4633296Z',
        created_user: 1,
        updated_date: '2023-06-22T02:09:54.4633303Z',
        updated_user: 1,
        is_deleted: false,
      },
    ];
  }

  onClickItemSearch(data: any) {
    console.log('🏍️ ~ data: ', data);
    this.router.navigate(['/product-details'], {
      queryParams: { id: data?.id },
    });
  }
}
