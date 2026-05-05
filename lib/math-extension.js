(function (root, factory) {
	'use strict';

	function getInstance(mathjs) {
		if(mathjs && typeof mathjs.import === 'function') {
			return mathjs;
		}

		if(mathjs && typeof mathjs.create === 'function' && mathjs.all) {
			return mathjs.create(mathjs.all);
		}

		throw new TypeError('math-extension requires a mathjs instance with import(), or the mathjs module namespace with create(all).');
	}

	function attach(mathjs, moment) {
		if(!moment || typeof moment.isMoment !== 'function' || typeof moment.isDuration !== 'function') {
			throw new TypeError('math-extension requires moment with isMoment() and isDuration().');
		}

		const instance = getInstance(mathjs);
		const extension = factory(instance, moment);

		if(extension) {
			instance.import(extension);
		}

		return instance;
	}

	if(typeof module === 'object' && module.exports) {
		module.exports = attach;
	} else {
		root.math = attach(root.math, root.moment);
	}
})(typeof globalThis === 'undefined' ? this : globalThis, function (mathjs, moment) {
	'use strict';

	function hasType(name) {
		try {
			return !!mathjs.typed._findType(name);
		} catch (err) {
			return false;
		}
	}

	if(hasType('Moment') && hasType('Duration')) {
		return;
	}

	if(!hasType('Moment')) {
		mathjs.typed.addType({
			name: 'Moment',
			test: function(x) {
				return moment.isMoment(x);
			}
		});
	}

	if(!hasType('Duration')) {
		mathjs.typed.addType({
			name: 'Duration',
			test: function(x) {
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
			'Moment, Duration': function(a, b) {
				return a.clone().add(b);
			},
			'Duration, Duration': function(a, b) {
				return a.clone().add(b);
			},
			'string, string': function(a, b) {
				return a + b;
			}
		}),
		subtract: mathjs.typed('subtract', {
			'Moment, Moment': function(a, b) {
				return moment.duration(a.diff(b));
			},
			'Moment, Duration': function(a, b) {
				return a.clone().subtract(b);
			},
			'Duration, Duration': function(a, b) {
				return a.clone().subtract(b);
			}
		}),
		multiply: mathjs.typed('multiply', {
			'number, Duration': function(a, b) {
				return moment.duration(Math.floor(a * b.asMilliseconds()));
			},
			'Duration, number': function(a, b) {
				return moment.duration(Math.floor(a.asMilliseconds() * b));
			}
		}),
		divide: mathjs.typed('divide', {
			'Duration, number': function(a, b) {
				return moment.duration(Math.floor(a.asMilliseconds() / b));
			}
		}),
		equal: mathjs.typed('equal', {
			'Moment, Moment': function(a, b) {
				return a.isSame(b);
			},
			'Duration, Duration': function(a, b) {
				return a.asMilliseconds() === b.asMilliseconds();
			}
		}),
		unequal: mathjs.typed('unequal', {
			'Moment, Moment': function(a, b) {
				return !a.isSame(b);
			},
			'Duration, Duration': function(a, b) {
				return a.asMilliseconds() !== b.asMilliseconds();
			}
		}),
		smaller: mathjs.typed('smaller', {
			'Moment, Moment': function(a, b) {
				return a.isBefore(b);
			},
			'Duration, Duration': function(a, b) {
				return a.asMilliseconds() < b.asMilliseconds();
			}
		}),
		smallerEq: mathjs.typed('smallerEq', {
			'Moment, Moment': function(a, b) {
				return a.isSameOrBefore(b);
			},
			'Duration, Duration': function(a, b) {
				return a.asMilliseconds() <= b.asMilliseconds();
			}
		}),
		larger: mathjs.typed('larger', {
			'Moment, Moment': function(a, b) {
				return a.isAfter(b);
			},
			'Duration, Duration': function(a, b) {
				return a.asMilliseconds() > b.asMilliseconds();
			}
		}),
		largerEq: mathjs.typed('largerEq', {
			'Moment, Moment': function(a, b) {
				return a.isSameOrAfter(b);
			},
			'Duration, Duration': function(a, b) {
				return a.asMilliseconds() >= b.asMilliseconds();
			}
		})
	};
});