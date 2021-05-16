import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookComponent } from './components/book/book.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { BookDeleteComponent } from './components/book-delete/book-delete.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { KindComponent } from './components/kind/kind.component';
import { KindAddComponent } from './components/kind-add/kind-add.component';
import { KindDeleteComponent } from './components/kind-delete/kind-delete.component';
import { KindUpdateComponent } from './components/kind-update/kind-update.component';
import { KindListComponent } from './components/kind-list/kind-list.component';
import { LendComponent } from './components/lend/lend.component';
import { LendAddComponent } from './components/lend-add/lend-add.component';
import { ReturnBookComponent } from './components/return-book/return-book.component';
import { ReturnBookAddComponent } from './components/return-book-add/return-book-add.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BookComponent },
  { path: 'books', component: BookComponent },
  { path: 'books/category/:categoryId', component: BookComponent },
  { path: 'books/add', component: BookAddComponent, canActivate: [LoginGuard] },
  {
    path: 'books/delete',
    component: BookDeleteComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'books/list',
    component: BookListComponent,
    canActivate: [LoginGuard],
  },
  {path:'books/update', component:BookUpdateComponent, canActivate: [LoginGuard]},
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'categories/add',
    component: CategoryAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'categories/delete',
    component: CategoryDeleteComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'categories/update',
    component: CategoryUpdateComponent,
    canActivate: [LoginGuard],
  },
  {path:'categories/list', component: CategoryListComponent, canActivate: [LoginGuard]},
  { path: 'customer', component: CustomerComponent, canActivate: [LoginGuard] },
  { path: 'kinds', component: KindComponent, canActivate: [LoginGuard] },
  { path: 'kinds/add', component: KindAddComponent, canActivate: [LoginGuard] },
  {
    path: 'kinds/delete',
    component: KindDeleteComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'kinds/update',
    component: KindUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'kinds/list',
    component: KindListComponent,
    canActivate: [LoginGuard],
  },
  { path: 'lends', component: LendComponent, canActivate: [LoginGuard] },
  { path: 'lends/add', component: LendAddComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  {
    path: 'returnbooks',
    component: ReturnBookComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'returnbooks/add',
    component: ReturnBookAddComponent,
    canActivate: [LoginGuard],
  },

  { path: 'profil', component: ProfilComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
