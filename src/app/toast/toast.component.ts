import { Component, OnInit } from '@angular/core';
import { ToastMessage, ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {
  message: string = '';
  type: string = 'info';
  visible = false;
  timeout: any;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toast: ToastMessage) => {
      this.message = toast.message;
      this.type = toast.type;
      this.visible = true;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = false;
      }, 3000);
    });
  }

  get toastClasses() {
    const base =
      'fixed top-4 right-4 z-50 px-4 py-2 rounded-xl shadow-lg text-white transition-all duration-500';

    const colorMap: any = {
      success: 'bg-green-600',
      error: 'bg-red-600',
      warning: 'bg-yellow-500 text-black',
      info: 'bg-blue-600',
    };

    return `${base} ${colorMap[this.type] || 'bg-blue-600'}`;
  }
}
