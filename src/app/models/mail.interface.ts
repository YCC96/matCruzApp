export interface MailInterface {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: template_params;
}

export interface template_params {
  from_subject: string;
  from_name: string;
  from_email: string;
  from_telephone: string;
  from_direccion: string;
  from_message: string;
  from_car: string;
}
