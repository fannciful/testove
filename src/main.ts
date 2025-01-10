import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ContactListComponent } from './app/components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './app/components/contact-details/contact-details.component';
import { ContactFormComponent } from './app/components/contact-form/contact-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: ContactListComponent },
      { path: 'contact/:id', component: ContactDetailsComponent },
      { path: 'add', component: ContactFormComponent },
      { path: 'edit/:id', component: ContactFormComponent },
    ]), provideAnimationsAsync('noop'),
  ],
});
