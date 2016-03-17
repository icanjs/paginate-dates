import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './paginate-dates.less!';
import moment from 'moment';

export const ViewModel = Map.extend({
  define: {
    targetDate: {
      Type: moment,
      value: moment.now()
    },
    startDate: {
      Type: moment,
      get(){
        let interval = this.attr('interval'),
          multiplier = this.attr('multiplier'),
          projectionType = this.attr('projectionType');

        if (projectionType === 'back') {
          return this.attr('targetDate').clone().subtract(multiplier - 1, interval).startOf(interval);
        } else {
          return this.attr('endDate').clone().subtract(multiplier - 1, interval).startOf(interval);
        }
      }
    },
    endDate: {
      Type: moment,
      get(){
        let interval = this.attr('interval'),
          multiplier = this.attr('multiplier'),
          projectionType = this.attr('projectionType');

        if (projectionType === 'back') {
          return this.attr('startDate').clone().add(multiplier - 1, interval).endOf(interval);
        } else {
          return this.attr('targetDate').clone().add(multiplier - 1, interval).endOf(interval);
        }
      }
    },
    numberOfDays: {
      get(){
        let start = this.attr('startOfFirstWeek'),
          end = this.attr('endOfLastWeek');
        return end.clone().diff(start, 'days') + 1;
      }
    },
    projectionType: {
      value: 'back',
      set(val){
        if (val !== 'back' && val !== 'forward') {
          val = 'back';
        }
        return val;
      }
    },
    multiplier: {
      value: 2
    },
    interval: {
      value: 'week'
    },
    intervalTypes: {
      value: ['day', 'week', 'month', 'quarter', 'year']
    }
  },
  incrementTargetDate(){
    let target = this.attr('targetDate');
    let multiplier = this.attr('multiplier');
    let interval = this.attr('interval');
    this.attr('targetDate', target.clone().add(multiplier, interval));
  },
  decrementTargetDate(){
    let target = this.attr('targetDate');
    let multiplier = this.attr('multiplier');
    let interval = this.attr('interval');
    this.attr('targetDate', target.clone().subtract(multiplier, interval));
  },
  incrementMultiplier(){
    this.attr('multiplier', this.attr('multiplier') + 1);
  },
  decrementMultiplier(){
    this.attr('multiplier', this.attr('multiplier') - 1 || 1);
  }
});

export default Component.extend({
  tag: 'paginate-dates',
  viewModel: ViewModel
});
