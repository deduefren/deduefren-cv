import { NgModule, TransferState } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { translateBrowserLoaderFactory } from 'src/loaders/translate-browser.loader';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({ declarations: [AppComponent, ContactFormComponent, BlogSectionComponent, BlogPostComponent],
    bootstrap: [AppComponent], imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }),
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateBrowserLoaderFactory,
                deps: [HttpClient, TransferState],
            },
        }),
        MarkdownModule.forRoot(),
      ], providers: [provideHttpClient(withInterceptorsFromDi()), provideMarkdown()] })
export class AppModule {}
