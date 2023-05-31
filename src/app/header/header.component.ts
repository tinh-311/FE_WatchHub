import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { getAuth, signOut } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { FullScreenService } from 'src/service/full-screen.service';
import jwt_decode from 'jwt-decode';
import * as LR from '@uploadcare/blocks';
import type { UploadcareFile } from '@uploadcare/upload-client';
import { CategoryService } from 'src/service/category.service';
import { LoadingService } from 'src/service/loading.service';

LR.registerBlocks(LR);

type UploadcareBlocksFile = UploadcareFile & {
  cdnUrlModifiers: string | null;
};

const auth = getAuth();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchInput: string = '';
  isFullScreen: boolean = false;
  currentUser: any;
  categories: any = [];
  selectedItemHeader: any;

  constructor(
    private router: Router,
    private fullScreenService: FullScreenService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwt_decode(token);
      console.log('🏍️ ~ this.currentUser: ', this.currentUser);
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const categoryName = params['categoryName'];
      this.selectedItemHeader = categoryName;
    });

    this.updateLRImgElementWithUuid(this.currentUser?.avatar);
    this.loadingService.showLoading();
    this.categoryService.getAll().subscribe(
      (res) => {
        this.categories = res;
        this.loadingService.hideLoading();
      },
      (err) => {
        this.loadingService.hideLoading();
      }
    );
  }

  updateLRImgElementWithUuid(uploadedUuid: string) {
    const lrImgElement = document.getElementById('user-avatar') as HTMLElement;
    if (lrImgElement) {
      lrImgElement.setAttribute('uuid', uploadedUuid);
    }
  }

  isMobileScreen(): boolean {
    const mobileScreenWidth = 768;
    return window.innerWidth < mobileScreenWidth;
  }

  navigateAdmin() {
    this.router.navigate(['/admin']);
  }

  toggleFullscreen() {
    this.isFullScreen = !this.isFullScreen;
    this.fullScreenService.toggleFullscreen();
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
    const categoryId = data.id;
    const categoryName = data.category_name;
    this.router.navigate(['/subcategory'], {
      queryParams: { categoryName, categoryId },
    });
  }
}
