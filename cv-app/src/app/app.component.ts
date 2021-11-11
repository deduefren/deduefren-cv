import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cv-app';

  constructor(translate: TranslateService) {

    if (translate != undefined){
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

      var browserLang = translate.getBrowserCultureLang().substr(0,2);
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      //translate.use('es');
      //If it's supported use it, if not, we are going to english by default
      if (browserLang == 'es' || browserLang == 'en')
      {
        translate.use(browserLang);
      }
    }
  }
}
