import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { SingleTaskComponent } from './pages/single-task/single-task.component';
import { LoginComponent } from './pages/login/login.component';
import { FavoriteTasksComponent } from './pages/favorite-tasks/favorite-tasks.component';
import { DeletedTasksComponent } from './pages/deleted-tasks/deleted-tasks.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { UserComponent } from './pages/user/user.component';

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
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
