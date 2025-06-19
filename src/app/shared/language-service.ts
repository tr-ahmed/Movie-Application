import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private currentLang = new BehaviorSubject<string>(localStorage.getItem('lang') || 'en');
  language$ = this.currentLang.asObservable();
  
   constructor(private translate: TranslateService) {
    this.translate.use(this.currentLang.value);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.currentLang.next(lang);
  }

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }

}
