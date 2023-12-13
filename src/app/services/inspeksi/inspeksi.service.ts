import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InspeksiService {

  constructor(private http: HttpClient) { }

  // private baseUrl = "http://localhost:3116";
  private baseUrl = "http://192.168.9.47:3116";

  getAllReason: any = () => {
    return this.http.get(`${this.baseUrl}/inspeksi/reason`);
  }

  getAllProdcut: any = () => {
    return this.http.get(`${this.baseUrl}/inspeksi/product`);
  }

  getRejection: any = (reason: any, varian: any, start: any, end: any) => {
    return this.http.post(`${this.baseUrl}/inspeksi/rejection`, {reason: reason, varian: varian, startDate: start, endDate: end});
  }


}
