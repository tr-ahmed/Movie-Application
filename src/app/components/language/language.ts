import { Component } from '@angular/core';
import { LanguageService } from '../../shared/language-service';

@Component({
  selector: 'app-language',
  imports: [],
  templateUrl: './language.html',
  styleUrl: './language.css'
})
export class Language {
  supportedLangs = ['en', 'ar', 'fr', 'zh'];
  currentLang!: string;

  constructor(private languageService: LanguageService) {
    this.languageService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  changeLanguage(lang: string, event: MouseEvent) {
    event.preventDefault()
    this.languageService.setLanguage(lang);
  }
}