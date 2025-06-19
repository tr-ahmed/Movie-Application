import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Search } from './components/search/search';
import { Wishlist } from './components/wishlist/wishlist';
import { Details } from './components/details/details';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';

// Define application routes
export const routes: Routes = [
  // Redirect root path to 'home'
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },

  // Home page
  { path: 'home', component: Home, title: 'Home' },

  // Details page with dynamic parameter ':id'
  { path: 'details/:id', component: Details, title: 'Detail' },

  // Wishlist page (protected, requires login)
  { path: 'wishlist', component: Wishlist, title: 'Wishlist' },

  // Search page
  { path: 'search', component: Search, title: 'Search' },

  // Login page
  { path: 'login', component: Login, title: 'Login' },

  // Register page
  { path: 'register', component: Register, title: 'Register' },

  // Fallback for undefined routes
  { path: '**', component: NotFound, title: 'Not Found' }
];