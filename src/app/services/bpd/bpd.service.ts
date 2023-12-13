import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BpdService {

  constructor(private http: HttpClient) { }

  // private baseUrl = "http://localhost:3100";
  private baseUrl = "http://192.168.9.47:3116";

  getBPDOC1Hour: any = () => {
    return this.http.get(`${this.baseUrl}/bpd/bpd-oc1`);
  }

  getBPDOC2Hour: any = () => {
    return this.http.get(`${this.baseUrl}/bpd/bpd-oc2`);
  }

  getBoundaryOC1: any = () => {
    return this.http.get(`${this.baseUrl}/bpd/boundary-oc1`);
  }

  getBoundaryOC2: any = () => {
    return this.http.get(`${this.baseUrl}/bpd/boundary-oc2`);
  }
}
