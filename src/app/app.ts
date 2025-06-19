import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from "./components/navbar/navbar";
import { LanguageService } from './shared/language-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, Navbar,RouterOutlet,TranslateModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected title = 'movieApp';

    constructor(private langService: LanguageService, private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
    this.langService.language$.subscribe(lang => {
      if (lang === 'ar') {
        this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
      } else {
        this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
      }
      this.cdr.detectChanges(); 
     });
    }
}
