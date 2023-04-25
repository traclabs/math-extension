(function (root, factory) {
	'use strict';

	var define = define || null;

	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else {
		factory(window.math, window.moment);
	}
})(this, function (mathjs, moment) {
	'use strict';

	try {
		let momentType = mathjs.typed._findType('Moment');
		let durationType = mathjs.typed._findType('Duration');
		if(momentType && durationType) {
			// We've already attached, no need to do it again.
			return;
		}
	} catch (TypeError) {
		// The type does not exist. Go ahead and attach new types.
	}

	mathjs.typed.addType({
		name : 'Moment',
		test : function(x) {
			return moment.isMoment(x);
		}
	});

	mathjs.typed.addType({
		name : 'Duration',
		test : function(x) {
			return moment.isDuration(x);
		}
	});

	return {
		moment: moment,
		duration: moment.duration,
		now: function() {
			return moment();
		},
		// dr = dT1 - dT2
		subtract: mathjs.typed('subtract', {
			'Moment, Moment' : function(a, b) {
				return moment.duration(a.diff(b));
			}
		}),
		// dT2 = dT1 + dr
		add: mathjs.typed('add', {
			'Moment, Duration' : function(a, b) {
				return a.clone().add(b);
			}
		}),
		// dT2 = dT1 - dr
		subtract: mathjs.typed('subtract', {
			'Moment, Duration' : function(a, b) {
				return a.clone().subtract(b);
			}
		}),
		// dr3 = dr1 + dr2
		add: mathjs.typed('add', {
			'Duration, Duration' : function(a, b) {
				return a.clone().add(b);
			}
		}),
		// dr3 = dr1 - dr2
		subtract: mathjs.typed('subtract', {
			'Duration, Duration' : function(a, b) {
				return a.clone().subtract(b);
			}
		}),
		// dr2 = number * dr1
		multiply: mathjs.typed('multiply', {
			'number, Duration' : function(a, b) {
				return moment.duration(Math.floor(a * b.asMilliseconds()));
			}
		}),
		// dr2 = dr1 * number
		multiply: mathjs.typed('multiply', {
			'Duration, number' : function(a, b) {
				return moment.duration(Math.floor(a.asMilliseconds() * b));
			}
		}),
		// dr2 = dr1 / number
		divide: mathjs.typed('divide', {
			'Duration, number' : function(a, b) {
				return moment.duration(Math.floor(a.asMilliseconds() / b));
			}
		}),
		// str3 = str1 + str2
		add: mathjs.typed('add', {
			'string, string' : function(a, b) {
				return a + b;
			}
		}),

		//========================================================
		// Compare Moments (dateTimes)
		//========================================================
		
		// dT1 == dT2
		equal: mathjs.typed('equal', {
			'Moment, Moment' : function(a, b) {
				return a.isSame(b);
			}
		}),
		// dT1 != dT2
		unequal: mathjs.typed('unequal', {
			'Moment, Moment' : function(a, b) {
				return !a.isSame(b);
			}
		}),
		// dT1 < dT2
		smaller: mathjs.typed('smaller', {
			'Moment, Moment' : function(a, b) {
				return a.isBefore(b);
			}
		}),
		// dT1 <= dT2
		smallerEq: mathjs.typed('smallerEq', {
			'Moment, Moment' : function(a, b) {
				return a.isSameOrBefore(b);
			}
		}),
		// dT1 > dT2
		larger: mathjs.typed('larger', {
			'Moment, Moment' : function(a, b) {
				return a.isAfter(b);
			}
		}),
		// dT1 >= dT2
		largerEq: mathjs.typed('largerEq', {
			'Moment, Moment' : function(a, b) {
				return a.isSameOrAfter(b);
			}
		}),
	
		//========================================================
		// Compare Durations
		// Hmmm? Some durations cannot be compared. For example,
		// P1M and P29D.  1 Month can be as short as 28 days
		// or as long as 31 days.
		//========================================================
	
		equal: mathjs.typed('equal', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() === b.asMilliseconds();
			}
		}),
		// dr1 != dr2
		unequal: mathjs.typed('unequal', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() !== b.asMilliseconds();
			}
		}),
		// dr1 < dr2
		smaller: mathjs.typed('smaller', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() < b.asMilliseconds();
			}
		}),
		// dr1 <= dr2
		smallerEq: mathjs.typed('smallerEq', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() <= b.asMilliseconds();
			}
		}),
		// dr1 > dr2
		larger: mathjs.typed('larger', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() > b.asMilliseconds();
			}
		}),
		// dr1 >= dr2
		largerEq: mathjs.typed('largerEq', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() >= b.asMilliseconds();
			}
		}),
	};
});