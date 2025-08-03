import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  readonly API_URL = '/.netlify/functions/gemini-rewrite';

  constructor(private http: HttpClient) {}

  rewriteText(text: string): Observable<{ result: string }> {
    return this.http.post<{ result: string }>(this.API_URL, { text });
  }
}
