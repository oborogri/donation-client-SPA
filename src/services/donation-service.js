import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {TotalUpdate} from './message';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Fixtures, EventAggregator)
export default class DonationService {

  donations = [];
  methods = [];
  candidates = [];
  total = 0;

  constructor(data, ea) {
    this.donations = data.donations;
    this.candidates = data.candidates;
    this.methods = data.methods;
    this.ea = ea;
  }

  donate(amount, method, candidate) {
    const donation = {
      amount: amount,
      method: method,
      candidate: candidate
    };

    this.total = this.total + parseInt(amount, 10);
    this.ea.publish(new TotalUpdate(this.total));
    this.donations.push(donation);

    console.log(amount + ' donated to ' + candidate.firstName + ' ' + candidate.lastName + ': ' + method);
    console.log('Total donated so far: ' + this.total);
  }

  addCandidate(firstName, lastName, office) {
    const candidate = {
      firstName: firstName,
      lastName: lastName,
      office: office
    };
    this.candidates.push(candidate);
    console.log('New candidate: ' + candidate.firstName + ' ' + candidate.lastName);
  }
}
