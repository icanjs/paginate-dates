import QUnit from 'steal-qunit';
import { ViewModel } from './paginate-dates';
import moment from 'moment';

// ViewModel unit tests
QUnit.module('mma-app/components/paginate-dates');

QUnit.test('Testing the defaults.', function(){
  var vm = new ViewModel({
    targetDate: '3/11/2016'
  });
  QUnit.equal(vm.attr('targetDate') instanceof moment, true, 'startDate is a MomentJS object.');
  QUnit.equal(vm.attr('startDate') instanceof moment, true, 'startDate is a MomentJS object.');
  QUnit.equal(vm.attr('endDate') instanceof moment, true, 'endDate is a MomentJS object.');
  QUnit.equal(vm.attr('interval'), 'week', 'default interval is two weeks.');
  QUnit.equal(vm.attr('multiplier'), 2, 'default interval is one day.');
  QUnit.equal(vm.attr('projectionType'), 'back', 'default projection is back.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Feb 28', 'startDate is Sunday the week before.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 12', 'endDate is Saturday of the current week.');
});

QUnit.test('Testing the defaults with previous day.', function(){
  var vm = new ViewModel({
    targetDate: '3/10/2016'
  });
  QUnit.equal(vm.attr('interval'), 'week', 'default interval is two weeks.');
  QUnit.equal(vm.attr('multiplier'), 2, 'default interval is one day.');
  QUnit.equal(vm.attr('projectionType'), 'back', 'default projection is back.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Feb 28', 'startDate is Sunday the week before.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 12', 'endDate is Saturday of the current week.');
});

QUnit.test('Testing changing the targetDate in 2-week intervals.', function(){
  var vm = new ViewModel({
    targetDate: '3/11/2016'
  });
  // Go back 2 weeks.
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Feb 26', 'Target is two weeks before March 11.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Feb 14', 'startDate is Sunday the week before.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Feb 27', 'endDate is Saturday of the current week.');
  // Go forward 2 weeks.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 11', 'Target is March 11, again.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Feb 28', 'startDate is Sunday the week before.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 12', 'endDate is Saturday of the current week.');
  // Go forward 2 more weeks.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 25', 'Target is two weeks after March 11.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 13', 'startDate is Sunday the week before.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 26', 'endDate is Saturday of the current week.');
});

QUnit.test('Testing changing the targetDate in 1-week intervals.', function(){
  var vm = new ViewModel({
    targetDate: '3/11/2016',
    interval: 'week',
    multiplier: 1
  });
  // Go back 1 week.
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 4', 'Target is 1 week before March 11.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Feb 28', 'startDate is Sunday the week before.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 5', 'endDate is Saturday of the current week.');
  // Go forward 1 week.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 11', 'Target is March 11, again.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6', 'startDate is Sunday the week before.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 12', 'endDate is Saturday of the current week.');
  // Go forward 1 more week.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 18', 'Target is 1 week after March 11.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 13', 'startDate is Sunday the week before.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 19', 'endDate is Saturday of the current week.');
});

QUnit.test('Testing day-based intervals.', function(){
  var vm = new ViewModel({
    targetDate: '3/11/2016',
    interval: 'days',
    multiplier: 5
  });
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 11', 'Target is still March 11.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 7', 'startDate is 4 days earlier.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 11', 'endDate is the same as the target');
  // Go back 5 days.
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 6', 'Target is 5 days before March 11.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 2', 'startDate is 4 days earlier.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 6', 'endDate is the same as the target.');
  // Go forward 5 days.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 11', 'Target is back to March 11.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 7', 'startDate is 4 days earlier.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 11', 'endDate is the same as the target');
  // Go forward 5 more days.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 16');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 12');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 16');
  // Change the multiplier to 4 days.
  vm.attr('multiplier', 4);
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 16', `targetDate stayed the same.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 13', `startDate is one day sooner.`);
  // Go back 4 days.
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 12');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 9');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 12');
  // Go back 4 more days.
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 8');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 5');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 8');
  // Go forward 4 days.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 12');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 9');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 12');
  // Change the multiplier to 3 days
  vm.attr('multiplier', 3);
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 12', `targetDate didn't change.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 10', `startDate is one day sooner.`);
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 12');
  // Go back 3 days
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 9');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 9');
  // Go back 3 more days
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 4');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 6');
  // Go forward 3 days
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 9');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 9');
  // Change the multiplier to 2 days
  vm.attr('multiplier', 2);
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 9', `targetDate didn't change.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 8', `startDate is one day sooner.`);
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 9');
  // Go back 2 days
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 7');
  // Go back 2 more days
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 5');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 4');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 5');
  // Go forward 2 days
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 7');
  // Change the multiplier to 1 day
  vm.attr('multiplier', 1);
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 7');
  // Go back 1 day
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 6');
  // Go back 1 more day
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 5');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 5');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 5');
  // Go forward 1 day
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 6');
});

QUnit.test('Testing forward projection with default interval of 2 weeks.', function(){
  var vm = new ViewModel({
    targetDate: '3/11/2016',
    projectionType: 'forward'
  });
  QUnit.equal(vm.attr('projectionType'), 'forward', 'Using forward projection.');
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 11', `targetDate still Mar 11.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6', 'startDate is Sunday of the current week.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 19', 'endDate is Saturday of the next week.');
  // Move forward 2 weeks.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 25', `targetDate bumped up 2 weeks.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 20', 'startDate is Sunday of the current week.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Apr 2', 'endDate is Saturday of the next week.');
  // Move forward 2 more weeks.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Apr 8', `targetDate bumped up 2 weeks.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Apr 3', 'startDate is Sunday of the current week.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Apr 16', 'endDate is Saturday of the current week.');
});

QUnit.test('Testing forward projection in 1 week intervals.', function(){
  var vm = new ViewModel({
    targetDate: '3/11/2016',
    projectionType: 'forward',
    multiplier: 1
  });
  QUnit.equal(vm.attr('projectionType'), 'forward', 'Using forward projection.');
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 11', `targetDate still Mar 11.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6', 'startDate is Sunday of the current week.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 12', 'endDate is Saturday of the current week.');
  // Move forward a week.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 18', `targetDate bumped up 1 week.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 13', 'startDate is Sunday of the current week.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 19', 'endDate is Saturday of the current week.');
  // Move forward another week.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 25', `targetDate bumped up 1 week.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 20', 'startDate is Sunday of the current week.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 26', 'endDate is Saturday of the current week.');
  // Move back a week.
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 18', `targetDate bumped up 2 weeks.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 13', 'startDate is Sunday of the current week.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 19', 'endDate is Saturday of the current week.');
});

QUnit.test('Testing day-based intervals.', function(){
  var vm = new ViewModel({
    targetDate: '3/11/2016',
    interval: 'days',
    multiplier: 5,
    projectionType: 'forward'
  });
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 11', 'Target is still March 11.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 11', 'startDate is the same as the target.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 15', 'endDate is 5 days later');
  // Go back 5 days.
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 6', 'Target is 5 days before March 11.');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6', 'startDate is the same as the target.');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 10', 'endDate is 5 days later');
  // Go forward 5 days.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 11');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 11');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 15');
  // Go forward 5 more days.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 16');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 16');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 20');
  // Change the multiplier to 4 days.
  vm.attr('multiplier', 4);
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 16', `targetDate stayed the same.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 16', `startDate is the same.`);
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 19', `endDate is one day sooner.`);
  // Go back 4 days.
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 12');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 12');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 15');
  // Go back 4 more days.
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 8');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 8');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 11');
  // Go forward 4 days.
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 12');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 12');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 15');
  // Change the multiplier to 3 days
  vm.attr('multiplier', 3);
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 12', `targetDate didn't change.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 12', `startDate is one day sooner.`);
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 14');
  // Go back 3 days
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 9');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 9');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 11');
  // Go back 3 more days
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 8');
  // Go forward 3 days
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 9');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 9');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 11');
  // Change the multiplier to 2 days
  vm.attr('multiplier', 2);
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 9', `targetDate didn't change.`);
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 9', `startDate is one day sooner.`);
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 10');
  // Go back 2 days
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 8');
  // Go back 2 more days
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 5');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 5');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 6');
  // Go forward 2 days
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 8');
  // Change the multiplier to 1 day
  vm.attr('multiplier', 1);
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 7');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 7');
  // Go back 1 day
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 6');
  // Go back 1 more day
  vm.decrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 5');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 5');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 5');
  // Go forward 1 day
  vm.incrementTargetDate();
  QUnit.equal(vm.attr('targetDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('startDate').format('MMM D'), 'Mar 6');
  QUnit.equal(vm.attr('endDate').format('MMM D'), 'Mar 6');
});

QUnit.test('Testing numberOfDays.', function(){
  var vm = new ViewModel({
    targetDate: '3/11/2016',
    interval: 'days',
    multiplier: 5,
    projectionType: 'forward'
  });
  QUnit.equal(vm.attr('numberOfDays'), 5);
});

QUnit.test('Can set the targetDate.', function(){
  var vm = new ViewModel({
    targetDate: '3/11/2016',
    interval: 'days',
    multiplier: 1
  });
  vm.setTargetDate('5/15/2012');
  QUnit.equal(
    vm.attr('targetDate').format('MMM DD, YYYY'),
    'May 15, 2012',
    'targetDate was directly set to May 15, 2012.'
  );
});
