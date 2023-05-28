import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { FullScreenService } from 'src/service/full-screen.service';
import jwt_decode from 'jwt-decode';
import * as LR from '@uploadcare/blocks';
import type { UploadcareFile } from '@uploadcare/upload-client';

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

  constructor(
    private router: Router,
    private fullScreenService: FullScreenService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwt_decode(token);
      console.log('🏍️ ~ this.currentUser: ', this.currentUser);
    }
  }

  ngOnInit() {
    this.updateLRImgElementWithUuid(this.currentUser?.avatar);
  }

  updateLRImgElementWithUuid(uploadedUuid: string) {
    console.log('🏍️ ~ uploadedUuid: ', uploadedUuid);
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
}
