
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { CategoryComponent } from './components/category/category.component';
import { NaviComponent } from './components/navi/navi.component';


import { ToastrModule } from 'ngx-toastr';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import { BookAddComponent } from './components/book-add/book-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LendComponent } from './components/lend/lend.component';

import { BookDeleteComponent } from './components/book-delete/book-delete.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';
import { KindAddComponent } from './components/kind-add/kind-add.component';
import { KindDeleteComponent } from './components/kind-delete/kind-delete.component';
import { KindUpdateComponent } from './components/kind-update/kind-update.component';
import { KindListComponent } from './components/kind-list/kind-list.component';
import { LendAddComponent } from './components/lend-add/lend-add.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';

import { CustomerComponent } from './components/customer/customer.component';
import { ReturnBookComponent } from './components/return-book/return-book.component';
import { ReturnBookAddComponent } from './components/return-book-add/return-book-add.component';






@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    CategoryComponent,
    NaviComponent,
    FilterPipePipe,
   
    BookAddComponent,
    LoginComponent,

    LendComponent,
    BookDeleteComponent,
    BookUpdateComponent,
    KindAddComponent,
    KindDeleteComponent,
    KindUpdateComponent,
    KindListComponent,
    LendAddComponent,
    BookListComponent,
    CategoryAddComponent,
    CategoryDeleteComponent,
    CategoryUpdateComponent,
    CategoryListComponent,
    FooterComponent,
    ProfilComponent,
    RegisterComponent,
    CustomerComponent,
    ReturnBookComponent,
    ReturnBookAddComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
