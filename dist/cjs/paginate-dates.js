/*paginate-dates@0.2.0#paginate-dates*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _canComponent = require('can/component/component');
var _canComponent2 = _interopRequireDefault(_canComponent);
var _canMap = require('can/map/map');
var _canMap2 = _interopRequireDefault(_canMap);
require('can/map/define/define');
require('./paginate-dates.less.css');
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);
var ViewModel = _canMap2['default'].extend({
    define: {
        targetDate: {
            Type: _moment2['default'],
            value: _moment2['default'].now()
        },
        startDate: {
            Type: _moment2['default'],
            get: function get() {
                var interval = this.attr('interval'), multiplier = this.attr('multiplier'), projectionType = this.attr('projectionType');
                if (projectionType === 'back') {
                    return this.attr('targetDate').clone().subtract(multiplier - 1, interval).startOf(interval);
                } else {
                    return this.attr('endDate').clone().subtract(multiplier - 1, interval).startOf(interval);
                }
            }
        },
        endDate: {
            Type: _moment2['default'],
            get: function get() {
                var interval = this.attr('interval'), multiplier = this.attr('multiplier'), projectionType = this.attr('projectionType');
                if (projectionType === 'back') {
                    return this.attr('startDate').clone().add(multiplier - 1, interval).endOf(interval);
                } else {
                    return this.attr('targetDate').clone().add(multiplier - 1, interval).endOf(interval);
                }
            }
        },
        numberOfDays: {
            get: function get() {
                var start = this.attr('startDate'), end = this.attr('endDate');
                return end.clone().diff(start, 'days') + 1;
            }
        },
        projectionType: {
            value: 'back',
            set: function set(val) {
                if (val !== 'back' && val !== 'forward') {
                    val = 'back';
                }
                return val;
            }
        },
        multiplier: { value: 2 },
        interval: { value: 'week' },
        intervalTypes: {
            value: [
                'day',
                'week',
                'month',
                'quarter',
                'year'
            ]
        }
    },
    incrementTargetDate: function incrementTargetDate() {
        var target = this.attr('targetDate');
        var multiplier = this.attr('multiplier');
        var interval = this.attr('interval');
        this.attr('targetDate', target.clone().add(multiplier, interval));
    },
    decrementTargetDate: function decrementTargetDate() {
        var target = this.attr('targetDate');
        var multiplier = this.attr('multiplier');
        var interval = this.attr('interval');
        this.attr('targetDate', target.clone().subtract(multiplier, interval));
    },
    incrementMultiplier: function incrementMultiplier() {
        this.attr('multiplier', this.attr('multiplier') + 1);
    },
    decrementMultiplier: function decrementMultiplier() {
        this.attr('multiplier', this.attr('multiplier') - 1 || 1);
    },
    setTargetDate: function setTargetDate(date) {
        this.attr('targetDate', date);
    }
});
exports.ViewModel = ViewModel;
exports['default'] = _canComponent2['default'].extend({
    tag: 'paginate-dates',
    viewModel: ViewModel
});