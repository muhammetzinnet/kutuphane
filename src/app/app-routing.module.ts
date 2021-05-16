import { ReturnbookAddComponent } from './components/returnbook-add/returnbook-add.component';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookComponent } from './components/book/book.component';
import { LoginComponent } from './components/login/login.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';
import { BookDeleteComponent } from './components/book-delete/book-delete.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { KindListComponent } from './components/kind-list/kind-list.component';
import { KindAddComponent } from './components/kind-add/kind-add.component';
import { KindUpdateComponent } from './components/kind-update/kind-update.component';
import { KindDeleteComponent } from './components/kind-delete/kind-delete.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { LendComponent } from './components/lend/lend.component';
import { LendAddComponent } from './components/lend-add/lend-add.component';
import { ReturnbookComponent } from './components/returnbook/returnbook.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BookComponent },
  { path: 'books', component: BookComponent },
  { path: 'books/category/:categoryId', component: BookComponent },
  { path: 'books/add', component: BookAddComponent, canActivate: [LoginGuard] },
  {
    path: 'book/list/update/:id',
    component: BookUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'books/list/delete/:id',
    component: BookDeleteComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'categories/list',
    component: CategoryListComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'categories/list/add',
    component: CategoryAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'categories/list/update/:id',
    component: CategoryUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'categories/list/delete/:id',
    component: CategoryDeleteComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'kinds/list',
    component: KindListComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'kinds/list/add',
    component: KindAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'kinds/list/update/:id',
    component: KindUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'kinds/list/delete/:id',
    component: KindDeleteComponent,
    canActivate: [LoginGuard],
  },

  { path: 'lends', component: LendComponent, canActivate: [LoginGuard] },
  { path: 'lends/add', component: LendAddComponent, canActivate: [LoginGuard] },

  {
    path: 'returBooks',
    component: ReturnbookComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'returnBooks/add',
    component: ReturnbookAddComponent,
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
