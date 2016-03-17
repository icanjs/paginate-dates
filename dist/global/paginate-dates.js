/*[global-shim-start]*/
(function (exports, global){
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses the exports and module object.
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
			if(deps[1] === "module") {
				args[1] = module;
			}
		} else if(!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		modules[moduleName] = module && module.exports ? module.exports : result;
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function(){
		// shim for @@global-helpers
		var noop = function(){};
		return {
			get: function(){
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load){
				eval("(function() { " + __load.source + " \n }).call(global);");
			}
		};
	});
})({},window)
/*paginate-dates@0.0.1#paginate-dates*/
define('paginate-dates', [
    'exports',
    'can/component/component',
    'can/map/map',
    'can/map/define/define',
    'paginate-dates/paginate-dates.less',
    'moment'
], function (exports, _canComponent, _canMap, _canMapDefine, _paginateDatesLess, _moment) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Component = _interopRequireDefault(_canComponent);
    var _Map = _interopRequireDefault(_canMap);
    var _moment2 = _interopRequireDefault(_moment);
    var ViewModel = _Map['default'].extend({
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
                    var start = this.attr('startOfFirstWeek'), end = this.attr('endOfLastWeek');
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
        }
    });
    exports.ViewModel = ViewModel;
    exports['default'] = _Component['default'].extend({
        tag: 'paginate-dates',
        viewModel: ViewModel
    });
});
/*[global-shim-end]*/
(function (){
	window._define = window.define;
	window.define = window.define.orig;
})();