(function (root, factory) {
	'use strict';

	var define = define || null;

	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else {
		factory(window.math, window.moment);
	}
})(this, function (math, moment) {
	'use strict';

	math.typed.addType({
		name : 'Moment',
		test : function(x) {
			return moment.isMoment(x);
		}
	});

	math.typed.addType({
		name : 'Duration',
		test : function(x) {
			return moment.isDuration(x);
		}
	});

	// dr = dT1 - dT2
	math.import({
		subtract: math.typed('subtract', {
			'Moment, Moment' : function(a, b) {
				return moment.duration(a.diff(b));
			}
		}),
	});

	// dT2 = dT1 + dr
	math.import({
		add: math.typed('add', {
			'Moment, Duration' : function(a, b) {
				return a.clone().add(b);
			}
		}),
	});

	// dT2 = dT1 - dr
	math.import({
		subtract: math.typed('subtract', {
			'Moment, Duration' : function(a, b) {
				return a.clone().subtract(b);
			}
		}),
	});
	
	// dr3 = dr1 + dr2
	math.import({
		add: math.typed('add', {
			'Duration, Duration' : function(a, b) {
				return a.clone().add(b);
			}
		}),
	});
	
	// dr3 = dr1 - dr2
	math.import({
		subtract: math.typed('subtract', {
			'Duration, Duration' : function(a, b) {
				return a.clone().subtract(b);
			}
		}),
	});
	
	// dr2 = number * dr1
	math.import({
		multiply: math.typed('multiply', {
			'number, Duration' : function(a, b) {
				return moment.duration(Math.floor(a * b.asMilliseconds()));
			}
		}),
	});
	
	// dr2 = dr1 * number
	math.import({
		multiply: math.typed('multiply', {
			'Duration, number' : function(a, b) {
				return moment.duration(Math.floor(a.asMilliseconds() * b));
			}
		}),
	});

	// dr2 = dr1 / number
	math.import({
		divide: math.typed('divide', {
			'Duration, number' : function(a, b) {
				return moment.duration(Math.floor(a.asMilliseconds() / b));
			}
		}),
	});

	math.import({
		now: function() {
			return moment();
		}
	});

	math.import({moment: moment, duration: moment.duration});

	// str3 = str1 + str2
	math.import({
		add: math.typed('add', {
			'string, string' : function(a, b) {
				return a + b;
			}
		}),
	});

	//========================================================
	// Compare Moments (dateTimes)
	//========================================================
	
	// dT1 == dT2
	math.import({
		equal: math.typed('equal', {
			'Moment, Moment' : function(a, b) {
				return a.isSame(b);
			}
		}),
	});
	
	// dT1 != dT2
	math.import({
		unequal: math.typed('unequal', {
			'Moment, Moment' : function(a, b) {
				return !a.isSame(b);
			}
		}),
	});
	
	// dT1 < dT2
	math.import({
		smaller: math.typed('smaller', {
			'Moment, Moment' : function(a, b) {
				return a.isBefore(b);
			}
		}),
	});
	
	// dT1 <= dT2
	math.import({
		smallerEq: math.typed('smallerEq', {
			'Moment, Moment' : function(a, b) {
				return a.isSameOrBefore(b);
			}
		}),
	});
	
	// dT1 > dT2
	math.import({
		larger: math.typed('larger', {
			'Moment, Moment' : function(a, b) {
				return a.isAfter(b);
			}
		}),
	});
	
	// dT1 >= dT2
	math.import({
		largerEq: math.typed('largerEq', {
			'Moment, Moment' : function(a, b) {
				return a.isSameOrAfter(b);
			}
		}),
	});
	
	//========================================================
	// Compare Durations
	// Hmmm? Some durations cannot be compared. For example,
	// P1M and P29D.  1 Month can be as short as 28 days
	// or as long as 31 days.
	//========================================================
	math.import({
		equal: math.typed('equal', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() === b.asMilliseconds();
			}
		}),
	});
	
	// dr1 != dr2
	math.import({
		unequal: math.typed('unequal', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() !== b.asMilliseconds();
			}
		}),
	});
	
	// dr1 < dr2
	math.import({
		smaller: math.typed('smaller', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() < b.asMilliseconds();
			}
		}),
	});
	
	// dr1 <= dr2
	math.import({
		smallerEq: math.typed('smallerEq', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() <= b.asMilliseconds();
			}
		}),
	});

	// dr1 > dr2
	math.import({
		larger: math.typed('larger', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() > b.asMilliseconds();
			}
		}),
	});
	
	// dr1 >= dr2
	math.import({
		largerEq: math.typed('largerEq', {
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() >= b.asMilliseconds();
			}
		}),
	});
});
