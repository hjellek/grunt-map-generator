# grunt-map-generator

> Grunt task for generating a map of files

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install git+https://github.com/hjellek/grunt-map-generator.git --save-dev
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
  "grunt-map-generator": {
    options: {
        banner: undefined,
        outFile: "test/tmp/result", // file to output to
        sourceDir: "test/fixtures", // directory to scan
        extension: '.html', // file extensions to look for
        ignore: [ // list of files to ignore. String and RegExp support
            /c\.html/
        ],
        template: function(file, basePath) // template to create each file entry in out file
        {
            return file+"\n";
        }
    }
  },
});
```

### Options

#### options.banner
Type: `String`
Default value: `undefined`

A string value that is added at top of out file.

#### options.outFile
Type: `String`
Default value: `undefined`

A string value where the result map will be saved to

#### options.sourceDir
Type: `String`
Default value: `undefined`

A string value where the map generator will scan for files

#### options.extension
Type: `String`
Default value: `undefined`

A string value representing the file extension the map generator will look for

#### options.ignore
Type: `Array`
Default value: `undefined`

An array of `String` and `RegExp` values. Files matching these values will be ignored.

#### options.template
Type: `Function`
Default value: `Function`

A `Function` that will be used to create the each file entry in the resulting map.

### Usage Examples

#### Options
In this example, we scan a folder for HTML files specifically ignore the c.html file and output it using to "test/tmp"result" with each file run through the template function.

```js
grunt.initConfig({
  "grunt-map-generator": {
    options: {
        banner: 'Supports banner!\n',
        outFile: "test/tmp/result",
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
