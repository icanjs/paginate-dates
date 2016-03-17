# paginate-dates

[![Build Status](https://travis-ci.org/icanjs/paginate-dates.png?branch=master)](https://travis-ci.org/icanjs/paginate-dates)

A CanJS component that lets you paginate by date ranges instead of record counts.

## Usage

### ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```js
import plugin from 'paginate-dates';
```

### CommonJS use

Use `require` to load `paginate-dates` and everything else
needed to create a template that uses `paginate-dates`:

```js
var plugin = require("paginate-dates");
```

## AMD use

Configure the `can` and `jquery` paths and the `paginate-dates` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'paginate-dates',
		    	location: 'node_modules/paginate-dates/dist/amd',
		    	main: 'lib/paginate-dates'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

### Standalone use

Load the `global` version of the plugin:

```html
<script src='./node_modules/paginate-dates/dist/global/paginate-dates.js'></script>
```

## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
