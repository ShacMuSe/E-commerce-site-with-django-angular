import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CommentComponent } from './comment/comment.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    LogoutComponent,
    RegisterComponent,
    TodoComponent,
    ProductComponent,
    NavigationComponent,
    CommentComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }