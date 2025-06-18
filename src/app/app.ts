import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Wishlist } from './components/wishlist/wishlist';
import { NotFound } from './components/not-found/not-found';
import { Details } from './components/details/details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Home, Wishlist, NotFound, Details],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'movieApp';

}

