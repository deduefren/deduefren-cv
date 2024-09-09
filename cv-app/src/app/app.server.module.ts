import { NgModule } from '@angular/core';
import {
  ServerModule,
} from '@angular/platform-server';


import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TransferState } from '@angular/core';
import { translateServerLoaderFactory } from 'src/loaders/translate-server.loader';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState],
      },
    }),
    MarkdownModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
 export class AppServerModule {}
