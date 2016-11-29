import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {TotalUpdate, LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class DonationService {

  donations = [];
  methods = [];
  candidates = [];
  users = [];
  total = 0;

  constructor(data, ea, ac) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
    this.getDonations();
    this.getCandidates();
    this.getUsers();
  }

  getCandidates() {
    this.ac.get('/api/candidates').then(res => {
      this.candidates = res.content;
    });
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
  }

  getDonations() {
    this.ac.get('/api/donations').then(res => {
      this.donations = res.content;
    });
  }

  donate(amount, method, candidate) {
    const donation = {
      amount: amount,
      method: method
    };
    this.ac.post('/api/candidates/' + candidate._id + '/donations', donation).then(res => {
      const returnedDonation = res.content;
      this.donations.push(returnedDonation);
      console.log(amount + ' donated to ' + candidate.firstName + ' ' + candidate.lastName + ': ' + method);

      this.total = this.total + parseInt(amount, 10);
      console.log('Total so far ' + this.total);
      this.ea.publish(new TotalUpdate(this.total));
    });
  }
  addCandidate(firstName, lastName, office) {
    const candidate = {
      firstName: firstName,
      lastName: lastName,
      office: office
    };
    this.ac.post('/api/candidates', candidate).then(res => {
      this.candidates.push(res.content);
    });
  }

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.ac.post('/api/users', newUser).then(res => {
      this.getUsers();
    });
  }

  login(email, password) {
    const status = {
      success: false,
      message: 'Login Attempt Failed'
    };
    for (let user of this.users) {
      if (user.email === email && user.password === password) {
        status.success = true;
        status.message = 'logged in';
      }
    }
    this.ea.publish(new LoginStatus(status));
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ea.publish(new LoginStatus(new LoginStatus(status)));
  }
}
