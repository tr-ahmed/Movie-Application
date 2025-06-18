import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // تأكد من المسار
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from '../src/app/app.routes'; // لو عندك ملف فيه الـ routes

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),  // ✅ مهم لو بتستخدم راوتنج
    provideHttpClient()
  ]
});
