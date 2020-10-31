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

interface IItem {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  tangible: boolean;
}

interface IBilling {
  name: string;
  address: {
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    street_number: string;
    zipcode: string;
  };
}

export default interface ICreateTransaction {
  amount: number;
  card_hash: string;
  payment_method?: string;
  customer?: ICustomer;
  billing: IBilling;
  items: [
    {
      id: string;
      title: string;
      unit_price: number;
      quantity: number;
      tangible: boolean;
    },
  ];
}
