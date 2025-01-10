import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from '../../services/contact.service';
import { Router } from '@angular/router';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm: string = '';

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  get filteredContacts(): Contact[] {
    return this.contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName} ${contact.phone}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  viewContact(id: string): void {
    this.router.navigate(['/contact', id]);
  }

  addContact(): void {
    this.router.navigate(['/add']);
  }
}
