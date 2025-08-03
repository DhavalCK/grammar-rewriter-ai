import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export enum ToastTypeEnum {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();
  toast$ = this.toastSubject.asObservable();

  show(message: string, type: ToastType = 'info') {
    this.toastSubject.next({ message, type });
  }
}

// this.toastService.show('✅ Successfully copied!', 'success');
// this.toastService.show('❌ Something went wrong!', 'error');
// this.toastService.show('⚠️ Warning message', 'warning');
// this.toastService.show('ℹ️ Just FYI', 'info');
