import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { reducer } from './app/search-page/data-access/reducers/search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchApiEffects } from './app/search-page/data-access/effects/search-api.effects';
import { AuthInterceptor } from './app/search-page/utils/auth.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    importProvidersFrom(
      AppRoutingModule,
      HttpClientModule,
      StoreModule.forRoot({ search: reducer }),
      EffectsModule.forRoot([SearchApiEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
      })
    ),
  ],
});
