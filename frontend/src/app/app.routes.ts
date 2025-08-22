import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { CategoryList } from './components/category-list/category-list';
import { HomeComponent } from './components/home/home';


export const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'product' , component:ProductList},
  {path:"category",component:CategoryList}
];
