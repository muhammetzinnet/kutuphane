import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookComponent } from './components/book/book.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', pathMatch:'full', component:BookComponent},
  {path: 'books',component:BookComponent},
  {path: 'books/category/:categoryId', component:BookComponent},
  {path: 'books/add', component:BookAddComponent, canActivate:[LoginGuard]},
  {path: 'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
