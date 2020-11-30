import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpProvider {
  request<T>(url: string, method: 'GET' | 'POST' = 'GET') {
    return axios.request<T>({
      method,
      baseURL: 'https://jsonplaceholder.typicode.com',
      url,
    });
  }
}
