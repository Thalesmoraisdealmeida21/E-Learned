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
  card_hash: string;
  payment_method?: string;
  customer?: ICustomer;
}
