import {inject} from 'aurelia-framework';
import {TotalUpdate} from '../services/message';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(EventAggregator)
export class Stats {

  total = 0;

  constructor(ea) {
    ea.subscribe(TotalUpdate, msg => {
      this.total = msg.total;
    });
  }
}
