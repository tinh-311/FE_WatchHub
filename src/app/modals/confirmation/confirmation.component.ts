import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  message: string = '';
  display: boolean = false;

  constructor(
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data;
      this.message = data?.message;
    }
  }

  confirm() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }
}
