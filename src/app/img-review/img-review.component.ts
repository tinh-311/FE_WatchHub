import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-img-review',
  templateUrl: './img-review.component.html',
  styleUrls: ['./img-review.component.scss'],
})
export class ImgReviewComponent {
  imageUrl: string = '';

  constructor(private config: DynamicDialogConfig) {
    if (this.config.data) {
      const data = this.config.data;
      this.imageUrl = data?.imageUrl;
    }
  }
}
