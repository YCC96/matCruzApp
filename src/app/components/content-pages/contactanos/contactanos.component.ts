import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var $:any;
//declare var Email:any;

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
  
  urlMapa:string;
  mensaje:any = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  }

  constructor() { }
  
  ngOnInit() {
    this.cargarMapa();
  }
  
  cargarMapa(){
    this.urlMapa = environment.apiConfig.urlmapa;
    $("#urlMapa").prop('src', this.urlMapa);
  }

  enviarMensaje(){
    /***
     * 
     Email.send({
       Host : "smtp.yourisp.com",
       Username : "username",
       Password : "password",
       To : 'them@website.com',
       From : "you@isp.com",
       Subject : "This is the subject",
       Body : "And this is the body"
     }).then(
       message => alert(message)
     );
     */
    console.log('Enviar mensaje: ', this.mensaje);

    /**
     * 
     * npm install nodemailer --save --verbose
     * smtpJs
     console.log("nodeMailerSample()");
     var nodemailer = require('nodemailer');
 
     console.log("Creating transport...");
     var transporter = nodemailer.createTransport({
       host: 'smtp.mycompany.com',
       port: 25,
       secure: false, // true for 465, false for other ports
     });
 
     var mailOptions = {
       from: 'my.sender.account@mycompany.com',
       to: 'targetaccount1@othercompany.com,targetaccount2@onemorecompany.com',
       subject: 'Sending Email using Node.js',
       text: 'That was easy!'
     };
 
     console.log("sending email", mailOptions);
 
     transporter.sendMail(mailOptions, function (error, info) {
       console.log("senMail returned!");
       if (error) {
         console.log("ERROR!!!!!!", error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });
 
     console.log("End of Script");
     */



  }

}
