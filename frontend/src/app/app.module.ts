import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleTaskComponent } from './pages/single-task/single-task.component';
import { LoginComponent } from './pages/login/login.component';
import { FavoriteTasksComponent } from './pages/favorite-tasks/favorite-tasks.component';
import { DeletedTasksComponent } from './pages/deleted-tasks/deleted-tasks.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { TodosComponent } from './todos/todos.component';
import { RegisterComponent } from './pages/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserInterceptorInterceptor } from './interceptor/user-interceptor.interceptor';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TodoComponent,
    SingleTaskComponent,
    LoginComponent,
    FavoriteTasksComponent,
    DeletedTasksComponent,
    ErrorpageComponent,
    TodosComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
     HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: UserInterceptorInterceptor, multi:true
    },
    CookieService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
