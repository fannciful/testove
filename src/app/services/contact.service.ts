import { Injectable } from '@angular/core'; // Додайте цей імпорт

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
  birthDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'contacts'; // Ключ для LocalStorage

  constructor() {
    this.loadInitialData();
  }

  // Завантаження контактів з LocalStorage або початкових даних
  private loadInitialData(): void {
    const storedContacts = localStorage.getItem(this.storageKey);
    if (!storedContacts) {
      this.initDefaultContacts();
    }
  }

  // Ініціалізація початкових контактів
  private initDefaultContacts(): void {
    const defaultContacts: Contact[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
        address: '123 Main St, Springfield',
        birthDate: '1990-01-01',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '987-654-3210',
        email: 'jane.smith@example.com',
        address: '456 Elm St, Springfield',
        birthDate: '1985-02-14',
      },
    ];

    localStorage.setItem(this.storageKey, JSON.stringify(defaultContacts));
  }

  // Отримання всіх контактів
  getContacts(): Contact[] {
    const storedContacts = localStorage.getItem(this.storageKey);
    return storedContacts ? JSON.parse(storedContacts) : [];
  }

  // Отримання контакту за ID
  getContactById(id: string): Contact | undefined {
    const contacts = this.getContacts();
    return contacts.find(contact => contact.id === id);
  }

  // Додавання нового контакту
  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  // Оновлення контакту
  updateContact(contact: Contact): void {
    const contacts = this.getContacts();
    const index = contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      contacts[index] = contact;
      localStorage.setItem(this.storageKey, JSON.stringify(contacts));
    }
  }

  // Видалення контакту
  deleteContact(id: string): void {
    let contacts = this.getContacts();
    contacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }
}
