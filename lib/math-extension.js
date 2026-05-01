(function (root, factory) {
	'use strict';

	var define = define || null;

	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else {
		const extension = factory(window.math, window.moment);
		if(extension) {
			window.math.import(extension);
		}
	}
})(this, function (mathjs, moment) {
	'use strict';

	function hasType(name) {
		return !!mathjs.typed._findType(name);
	}

	if(hasType('Moment') && hasType('Duration')) {
		// We've already attached, no need to do it again.
		return;
	}

	if(!hasType('Moment')) {
		mathjs.typed.addType({
			name : 'Moment',
			test : function(x) {
				return moment.isMoment(x);
			}
		});
	}

	if(!hasType('Duration')) {
		mathjs.typed.addType({
			name : 'Duration',
			test : function(x) {
				return moment.isDuration(x);
			}
		});
	}

	return {
		moment: moment,
		duration: moment.duration,
		now: function() {
			return moment();
		},
		add: mathjs.typed('add', {
			// dT2 = dT1 + dr
			'Moment, Duration' : function(a, b) {
				return a.clone().add(b);
			},
			// dr3 = dr1 + dr2
			'Duration, Duration' : function(a, b) {
				return a.clone().add(b);
			},
			// str3 = str1 + str2
			'string, string' : function(a, b) {
				return a + b;
			}
		}),
		subtract: mathjs.typed('subtract', {
			// dr = dT1 - dT2
			'Moment, Moment' : function(a, b) {
				return moment.duration(a.diff(b));
			},
			// dT2 = dT1 - dr
			'Moment, Duration' : function(a, b) {
				return a.clone().subtract(b);
			},
			// dr3 = dr1 - dr2
			'Duration, Duration' : function(a, b) {
				return a.clone().subtract(b);
			}
		}),
		multiply: mathjs.typed('multiply', {
			// dr2 = number * dr1
			'number, Duration' : function(a, b) {
				return moment.duration(Math.floor(a * b.asMilliseconds()));
			},
			// dr2 = dr1 * number
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
		//========================================================
		// Compare Moments (dateTimes) and Durations
		// Hmmm? Some durations cannot be compared. For example,
		// P1M and P29D.  1 Month can be as short as 28 days
		// or as long as 31 days.
		//========================================================
		equal: mathjs.typed('equal', {
			// dT1 == dT2
			'Moment, Moment' : function(a, b) {
				return a.isSame(b);
			},
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() === b.asMilliseconds();
			}
		}),
		unequal: mathjs.typed('unequal', {
			// dT1 != dT2
			'Moment, Moment' : function(a, b) {
				return !a.isSame(b);
			},
			// dr1 != dr2
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() !== b.asMilliseconds();
			}
		}),
		smaller: mathjs.typed('smaller', {
			// dT1 < dT2
			'Moment, Moment' : function(a, b) {
				return a.isBefore(b);
			},
			// dr1 < dr2
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() < b.asMilliseconds();
			}
		}),
		smallerEq: mathjs.typed('smallerEq', {
			// dT1 <= dT2
			'Moment, Moment' : function(a, b) {
				return a.isSameOrBefore(b);
			},
			// dr1 <= dr2
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() <= b.asMilliseconds();
			}
		}),
		larger: mathjs.typed('larger', {
			// dT1 > dT2
			'Moment, Moment' : function(a, b) {
				return a.isAfter(b);
			},
			// dr1 > dr2
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() > b.asMilliseconds();
			}
		}),
		largerEq: mathjs.typed('largerEq', {
			// dT1 >= dT2
			'Moment, Moment' : function(a, b) {
				return a.isSameOrAfter(b);
			},
			// dr1 >= dr2
			'Duration, Duration' : function(a, b) {
				return a.asMilliseconds() >= b.asMilliseconds();
			}
		})
	};
});
