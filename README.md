# grunt-map-generator

> Grunt task for generating a map of files

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-map-generator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-map-generator');
```

## The "grunt-map-generator" task

### Overview
In your project's Gruntfile, add a section named `grunt-map-generator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  grunt-map-generator: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Options
In this example, we scan a folder for HTML files specifically ignore the c.html file and output it using to "test/tmp"result" with each file run through the template function.

```js
grunt.initConfig({
  "grunt-map-generator": {
    options: {
        banner: 'Supports banner!\n',
        out: "test/tmp/result",
        sourceDir: "test/fixtures",
        extension: '.html',
        ignore: [
            /c\.html/
        ],
        template: function(file, basePath)
        {
            return file+"\n";
        }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
