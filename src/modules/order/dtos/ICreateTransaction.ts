interface ICustomer {
  type: string;
  country: string;
  name: string;
  documents: IDocument[];
}

interface IDocument {
  type: string;
  number: string;
}

export default interface ICreateTransaction {
  amount: number;
  card_number?: string;
  card_cvv?: string;
  card_expiration_date?: string;
  card_holder_name?: string;
  payment_method?: string;
  customer?: ICustomer;
}
