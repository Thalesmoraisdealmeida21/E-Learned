/* eslint-disable @typescript-eslint/interface-name-prefix */
export default interface SendMailDTO {
  to: {
    name: string;
    email: string;
  };
  from?: {
    name: string;
    email: string;
  };
  subject: string;
  html: string;
}
