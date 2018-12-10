(function (root, factory) {
	'use strict';

	var define = define || null;

	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else {
		factory(window.moment);
	}
})(this, function (moment) {
	'use strict';
	var add, subtract, multiply;
	
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
	subtract = math.typed('subtract', {
		'Moment, Moment' : function(a, b) {
			return moment.duration(a.diff(b));
		}
	});
	
	math.import({subtract: subtract});

	// dT2 = dT1 + dr
	add = math.typed('add', {
		'Moment, Duration' : function(a, b) {
			return a.clone().add(b);
		}
	});
	
	math.import({add: add});
	
	// dT2 = dT1 - dr
	subtract = math.typed('subtract', {
		'Moment, Duration' : function(a, b) {
			return a.clone().subtract(b);
		}
	});
	
	math.import({subtract: subtract});
	
	// dr3 = dr1 + dr2
	add = math.typed('add', {
		'Duration, Duration' : function(a, b) {
			return a.clone().add(b);
		}
	});
	
	math.import({add: add});
	
	// dr3 = dr1 - dr2
	subtract = math.typed('subtract', {
		'Duration, Duration' : function(a, b) {
			return a.clone().subtract(b);
		}
	});
	
	math.import({subtract: subtract});
	
	// dr2 = number * dr1
	multiply = math.typed('multiply', {
		'number, Duration' : function(a, b) {
			return moment.duration(Math.floor(a * b.asMilliseconds()));
		}
	});
	
	math.import({multiply: multiply});
	
	// dr2 = dr1 * number
	multiply = math.typed('multiply', {
		'Duration, number' : function(a, b) {
			return moment.duration(Math.floor(a.asMilliseconds() * b));
		}
	});
	
	math.import({multiply: multiply});
	
	// dr2 = dr1 / number
	divide = math.typed('divide', {
		'Duration, number' : function(a, b) {
			return moment.duration(Math.floor(a.asMilliseconds() / b));
		}
	});
	
	math.import({divide: divide});
	
	math.import({
		  now: function() {
		    return moment();
		  }
	});
	
	math.import({moment: moment, duration: moment.duration});
	
	// str3 = str1 + str2
	add = math.typed('add', {
		'string, string' : function(a, b) {
			return a + b;
		}
	});
		
	math.import({add: add});

	//========================================================
	// Compare Moments (dateTimes)
	//========================================================
	
	// dT1 == dT2
	var equal = math.typed('equal', {
		'Moment, Moment' : function(a, b) {
			return a.isSame(b);
		}
	});
	
	math.import({equal: equal});
	
	// dT1 != dT2
	var unequal = math.typed('unequal', {
		'Moment, Moment' : function(a, b) {
			return !a.isSame(b);
		}
	});
	
	math.import({unequal: unequal});
	
	// dT1 < dT2
	var smaller = math.typed('smaller', {
		'Moment, Moment' : function(a, b) {
			return a.isBefore(b);
		}
	});
	
	math.import({smaller: smaller});
	
	// dT1 <= dT2
	var smallerEq = math.typed('smallerEq', {
		'Moment, Moment' : function(a, b) {
			return a.isSameOrBefore(b);
		}
	});
	
	math.import({smallerEq: smallerEq});
	
	// dT1 > dT2
	var larger = math.typed('larger', {
		'Moment, Moment' : function(a, b) {
			return a.isAfter(b);
		}
	});
	
	math.import({larger: larger});
	
	// dT1 >= dT2
	var largerEq  = math.typed('largerEq ', {
		'Moment, Moment' : function(a, b) {
			return a.isSameOrAfter(b);
		}
	});
	
	math.import({largerEq : largerEq });
	
	//========================================================
	// Compare Durations
	// Hmmm? Some durations cannot be compared. For example,
	// P1M and P29D.  1 Month can be as short as 28 days
	// or as long as 31 days.
	//========================================================
	
	// dr1 == dr2
	var equal = math.typed('equal', {
		'Duration, Duration' : function(a, b) {
			return a.asMilliseconds() === b.asMilliseconds();
		}
	});
	
	math.import({equal: equal});
	
	// dr1 != dr2
	var unequal = math.typed('unequal', {
		'Duration, Duration' : function(a, b) {
			return a.asMilliseconds() !== b.asMilliseconds();
		}
	});
	
	math.import({unequal: unequal});
	
	// dr1 < dr2
	var smaller = math.typed('smaller', {
		'Duration, Duration' : function(a, b) {
			return a.asMilliseconds() < b.asMilliseconds();
		}
	});
	
	math.import({smaller: smaller});
	
	// dr1 <= dr2
	var smallerEq = math.typed('smallerEq', {
		'Duration, Duration' : function(a, b) {
			return a.asMilliseconds() <= b.asMilliseconds();
		}
	});
	
	math.import({smallerEq: smallerEq});
	
	// dr1 > dr2
	var larger = math.typed('larger', {
		'Duration, Duration' : function(a, b) {
			return a.asMilliseconds() > b.asMilliseconds();
		}
	});
	
	math.import({larger: larger});
	
	// dr1 >= dr2
	var largerEq  = math.typed('largerEq ', {
		'Duration, Duration' : function(a, b) {
			return a.asMilliseconds() >= b.asMilliseconds();
		}
	});
	
	math.import({largerEq : largerEq });	
});