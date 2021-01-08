import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MailInterface, template_params } from '../models/mail.interface';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private http: HttpClient
  ) {}

  sendMail(dataTempl: template_params):Observable<any> {
    var data: MailInterface = {
      service_id: 'service_u9h5n8l',
      user_id: 'user_IvtYczPzFem21eaQkwOaF',
      template_id: 'template_y4zo3tt',
      template_params: dataTempl
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('https://api.emailjs.com/api/v1.0/email/send', data, { headers });
  }

}
