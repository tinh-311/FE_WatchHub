import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './header/header.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';

import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';

import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';
import { ProfileComponent } from './profile/profile.component';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { CalendarModule } from 'primeng/calendar';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { TableModule } from 'primeng/table';
import { AdminDasboardComponent } from './admin/admin-dasboard/admin-dasboard.component';
import { SplitterModule } from 'primeng/splitter';
import { AdminDashboardHomeComponent } from './admin/admin-dashboard-home/admin-dashboard-home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    LoadingComponent,
    ProfileComponent,
    AdminUserComponent,
    AdminDasboardComponent,
    AdminDashboardHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    ToolbarModule,
    MenubarModule,
    CarouselModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    ProgressSpinnerModule,
    PasswordModule,
    AvatarModule,
    DropdownModule,
    OverlayPanelModule,
    InputNumberModule,
    TooltipModule,
    NgxWebstorageModule,
    CalendarModule,
    TableModule,
    SplitterModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
