import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private axiosInstance: AxiosInstance;
  private apiUrl = 'https://hiveducationalmobilebackend.onrender.com';
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Add new page content
  async addPageContent(title: string, description: string, links: string[]): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/pages', {
        title,
        description,
        links
      });
      return response.data;
    } catch (error) {
      console.error('Error adding page content:', error);
      throw error;
    }
  }

  async getPageContent(id: number): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`/pages`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error('Error fetching page content:', error);
      throw error;
    }
  }

  async getCurrentPageId(): Promise<any> {
    try {
      const response = await this.axiosInstance.get('/current-page');
      return response.data;
    } catch (error) {
      console.error('Error fetching current page ID:', error);
      throw error;
    }
  }

  
  // Fetch data for a page (e.g., prevention, treatment)
  // async getPageContent(pageName: string): Promise<any> {
  //   try {
  //     // Replace with your backend API URL
  //     const response = await axios.get(`http://localhost:3000/pages`, {
  //       params: {
  //         page: pageName, // Query parameter for the page (prevention, treatment, etc.)
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching page content', error);
  //     throw error;
  //   }
  // }
}

