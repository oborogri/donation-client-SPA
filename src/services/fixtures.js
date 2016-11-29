export default class Fixtures {

  methods = ['Cash', 'PayPal'];

  candidates = [
    {
      firstName: 'Lisa',
      lastName: 'Simpson',
      office: 'New York'
    },
    {
      firstName: 'Bart',
      lastName: 'Simpson',
      office: 'Chicago'
    }
  ];

  users = {
    'homer@simpson.com': {
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'homer@simpson.com',
      password: 'secret'
    },
    'marge@simpson.com': {
      firstName: 'Marge',
      lastName: 'Simpson',
      email: 'marge@simpson.com',
      password: 'secret'
    }
  }

  donations = [
    {
      amount: 23,
      method: 'cash',
      candidate: this.candidates[0]
    },
    {
      amount: 212,
      method: 'paypal',
      candidate: this.candidates[1]
    }
  ];
}
