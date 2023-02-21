import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // I believe for Ionic apps should be more relevant libs or something else.
  set(key: string, value: any): void {
    const storedValue = JSON.stringify(value);
    localStorage.setItem(key, storedValue);
  }

  get(key: string): any {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  }
}
