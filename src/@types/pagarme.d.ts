/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable import/prefer-default-export */
declare module 'pagarme' {
  export namespace client {
    function connect(authentication: {
      api_key?: string;
      encryption_key?: string;
      email?: string;
      password?: string;
    }): Promise<typeof client>;

    namespace transactions {
      function create({
        card_hash: string,
        amount: number,
        payment_method: string,
        customer: Customer,
      });
    }

    interface Document {
      type: string;
      number: string;
    }
    interface Customer {
      type: string;
      country: string;
      name: string;
      documents: Document[];
    }
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

    namespace security {
      function encrypt(data: ICreateTransaction): Promise<string>;
    }
  }
}
