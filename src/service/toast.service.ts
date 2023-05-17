import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastType } from './constant/toast.constant';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showMessage(sumary: string, detail: string, type: string = ToastType.Info) {
    this.messageService.add({
      severity: type,
      summary: sumary,
      detail: detail,
    });
  }
}
