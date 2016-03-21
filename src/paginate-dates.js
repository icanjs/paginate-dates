import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './paginate-dates.less!';
import moment from 'moment';

export const ViewModel = Map.extend({
  define: {
    /**
     * The `targetDate` is currently the master date.  The `startDate` and `endDate`
     * both use the `targetDate` for their calculations.
     */
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
    /**
     * `numberOfDays` is simply the integer count of the number of days in the
     * selected period.
     */
    numberOfDays: {
      get(){
        let start = this.attr('startDate'),
          end = this.attr('endDate');
        return end.clone().diff(start, 'days') + 1;
      }
    },

    /**
     * The `projectionType` determines which direction the module displays additional
     * data above 1 day.  It can be either 'back' or 'forward'.  If it's 'back', it
     * will calculate back in time.  If it's set to 'forward', it will calculate
     * forward in time.
     */
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
  /**
   * `incrementTargetDate` adds time to the `targetDate` according to the current
   * multiplier and interval.
   */
  incrementTargetDate(){
    let target = this.attr('targetDate');
    let multiplier = this.attr('multiplier');
    let interval = this.attr('interval');
    this.attr('targetDate', target.clone().add(multiplier, interval));
  },
  /**
   * `decrementTargetDate` removes time from the `targetDate` according to the current
   * multiplier and interval.
   */
  decrementTargetDate(){
    let target = this.attr('targetDate');
    let multiplier = this.attr('multiplier');
    let interval = this.attr('interval');
    this.attr('targetDate', target.clone().subtract(multiplier, interval));
  },

  /**
   * `incrementMultiplier` increases the multiplier by 1.  For example 1 week
   * would become 2 weeks. It will always be at least 1.
   */
  incrementMultiplier(){
    this.attr('multiplier', this.attr('multiplier') + 1);
  },

  /**
   * `decrementMultiplier` decreases the multiplier by 1.  For example 2 weeks
   * would become 1 weeks. It cannot be dropped below 1.
   */
  decrementMultiplier(){
    this.attr('multiplier', this.attr('multiplier') - 1 || 1);
  },
  /**
   * `setTargetDate` allows you to directly set the `targetDate` to a specific date.
   */
  setTargetDate(date){
    this.attr('targetDate', date);
  }
});

export default Component.extend({
  tag: 'paginate-dates',
  viewModel: ViewModel
});
