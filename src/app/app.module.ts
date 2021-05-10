
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
import { BookSummaryComponent } from './components/book-summary/book-summary.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { KindComponent } from './components/kind/kind.component';
import { LendComponent } from './components/lend/lend.component';
import { ReturnbookComponent } from './components/returnbook/returnbook.component';




@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    CategoryComponent,
    NaviComponent,
    FilterPipePipe,
    BookSummaryComponent,
    BookAddComponent,
    LoginComponent,
    KindComponent,
    LendComponent,
    ReturnbookComponent


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
