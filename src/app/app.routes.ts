import { Routes } from '@angular/router';
import { Search } from './components/search/search'; 
import { Home } from './components/home/home';
import { Wishlist } from './components/wishlist/wishlist';
import { NotFound } from './components/not-found/not-found';
import { Details } from './components/details/details';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full', title:'Home'},
  {path: 'home', component: Home,  title: 'Home'},
  {path: 'details/:id', component: Details,  title: 'Detail'},
  {path: 'wishlist', component: Wishlist,  title: 'Wishlist'},
  {path: 'home/search', component: Search,  title: 'Search'},
  {path: '**', component: NotFound, title: 'Not Found'}
];
