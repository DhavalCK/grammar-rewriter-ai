import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../services/gemini.service';
import { timestamp } from 'rxjs';
import {
  ToastService,
  ToastType,
  ToastTypeEnum,
} from '../services/toast.service';

@Component({
  selector: 'app-grammar-rewriter',
  templateUrl: './grammar-rewriter.component.html',
  styleUrls: ['./grammar-rewriter.component.scss'],
})
export class GrammarRewriterComponent implements OnInit {
  inputText = '';
  rewrittenText = '';
  isDarkMode = false;
  isLoading: boolean = false;

  private readonly THEME_KEY = 'grammar-rewriter-theme';

  constructor(
    private geminiService: GeminiService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Read from localStorage on load
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    this.isDarkMode = savedTheme === 'dark';

    // Apply class to <html>
    this.updateRootClass();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    // Save to localStorage
    localStorage.setItem(this.THEME_KEY, this.isDarkMode ? 'dark' : 'light');

    // Update <html> class
    this.updateRootClass();
  }

  private updateRootClass(): void {
    const root = document.documentElement;

    if (this.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  liveElapsedTime = 0;
  private liveTimerId: number | null = null;

  rewriteText(): void {
    if (this.inputText.trim().length < 5 || this.isLoading) return;

    this.rewrittenText = '';
    this.isLoading = true;
    this.liveElapsedTime = 0;

    const startTime = performance.now();
    this.startLiveTimer(startTime);

    this.geminiService.rewriteText(this.inputText.trim()).subscribe({
      next: (data) => {
        this.stopLiveTimer();
        this.isLoading = false;

        if (data?.result) {
          this.rewrittenText = data.result.trim();
        }
      },
      error: () => {
        this.stopLiveTimer();
        this.isLoading = false;
        this.toastService.show(
          '❌ Failed to rewrite. Please try again.',
          ToastTypeEnum.Error
        );
      },
    });
  }

  private startLiveTimer(startTime: number): void {
    const update = () => {
      this.liveElapsedTime = +((performance.now() - startTime) / 1000).toFixed(
        2
      );
      this.liveTimerId = requestAnimationFrame(update);
    };
    this.liveTimerId = requestAnimationFrame(update);
  }

  private stopLiveTimer(): void {
    if (this.liveTimerId) cancelAnimationFrame(this.liveTimerId);
    this.liveTimerId = null;
  }

  copyText(): void {
    if (!this.rewrittenText) return;

    navigator.clipboard.writeText(this.rewrittenText).then(() => {
      this.toastService.show(
        'Text Copied successfully 😊',
        ToastTypeEnum.Success
      );
    });
  }

  downloadText(): void {
    if (!this.rewrittenText) return;

    const blob = new Blob([this.rewrittenText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'rewritten-text.txt';
    link.click();
    this.toastService.show(
      'Content file downloaded successfully 😊',
      ToastTypeEnum.Success
    );
  }

  clearAll(): void {
    this.inputText = '';
    this.rewrittenText = '';
  }
}
