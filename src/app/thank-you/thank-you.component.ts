import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getVnpResponseMessage } from '../constant/util.constant';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {
  code: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(
      (params) => {
        const code: any = params['code'];
        this.code = code;
        console.log('🏍️ ~ this.code: ', this.code);
      },
      (err) => {}
    );
  }
  ngOnInit(): void {}

  getVnpResponseMessage(code: string) {
    return getVnpResponseMessage(code);
  }

  navigateOrder() {
    this.router.navigate(['/orders']);
  }
}
