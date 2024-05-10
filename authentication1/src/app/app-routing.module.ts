import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';
import { ProductComponent } from './product/product.component';
import { CommentComponent } from './comment/comment.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserComponent},
  {path:'register',component:RegisterComponent},
  {path: 'todo-list', component: TodoComponent },
  {path: 'products', component: ProductComponent },
  {path: 'products/:id/comment', component: CommentComponent },
  {path: 'products/:id/edit', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }