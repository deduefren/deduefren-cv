import { NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { translateBrowserLoaderFactory } from 'src/loaders/translate-browser.loader';
import { AboutMeComponent } from './about-me/about-me.component';
import { CareerComponent } from './career/career.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { HomePageComponent } from './home-page/home-page.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    AboutMeComponent,
    CareerComponent,
    CertificationsComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),

    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
