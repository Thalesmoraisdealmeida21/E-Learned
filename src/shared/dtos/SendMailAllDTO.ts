export default interface ISendMailDTO {
  to: string[];
  from?: {
    name: string;
    email: string;
  };
  subject: string;
  html: string;
}
