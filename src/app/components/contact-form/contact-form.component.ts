import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService, Contact } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact: Contact = { id: '', firstName: '', lastName: '', phone: '' };
  isEditMode: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.isEditMode = true;
      const contact = this.contactService.getContactById(contactId);
      if (contact) {
        this.contact = { ...contact };
      }
    }
  }

  submitForm(): void {
    // Перевірка обов'язкових полів
    if (!this.contact.firstName.trim() || !this.contact.lastName.trim() || !this.contact.phone.trim()) {
      alert('Please fill out all required fields: First Name, Last Name, Phone number.');
      return;
    }
  
    if (this.isEditMode) {
      this.contactService.updateContact(this.contact);
    } else {
      this.contact.id = new Date().getTime().toString();
      this.contactService.addContact(this.contact);
    }
    this.router.navigate(['/']);
  }
}
