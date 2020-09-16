interface IMailCOnfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'equipe@florescereducacao.com.br',
      name: 'Equipe Florescer Educação',
    },
  },
} as IMailCOnfig;
