/*
 * grunt-map-generator
 * https://github.com/hjellek/grunt-map-generator
 *
 * Copyright (c) 2015 Knut Eirik Leira Hjelle
 * Licensed under the MIT license.
 */

'use strict';

/**
 * @param grunt
 */
module.exports = function (grunt) {
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    var fs = require('fs');
    var path = require('path');

    grunt.registerMultiTask('grunt-map-generator', 'Generate map of files', function () {

        //// Merge task-specific and/or target-specific options with these defaults.
        //var files = this.options().files;

        var banner = this.options().banner || this.options.topBanner;
        var bottomBanner = this.options().bottomBanner;
        var outFile = path.resolve(this.options().outFile);
        var sourceDir = path.resolve(this.options().sourceDir);
        var ignores = this.options().ignore || [];
        var templateToRender = this.options().template || defaultModuleTemplate;
        var extension = this.options().extension;

        var files = getFilesInPath(sourceDir, null, ignores, extension);
        var newContent = writeModuleMap(sourceDir, files, templateToRender);
        if(banner)
        {
            newContent = banner + newContent;
        }
        var currentContent;
        try
        {
            currentContent = fs.readFileSync(outFile).toString();
        }
        catch(error)
        {}
        if(bottomBanner)
        {
            newContent += bottomBanner;
        }
        if(currentContent !== newContent)
        {
            fs.writeFileSync(outFile, newContent);
        }
    });

    function getFilesInPath(basePath, prependPath, filesToIgnore, extension)
    {
        var pathToRead = path.resolve(basePath);
        var files = fs.readdirSync(pathToRead);
        var result = [];
        for(var index in files)
        {
            var file = files[index];
            if(filesToIgnore)
            {
                var shouldIgnore = false;
                for(var i in filesToIgnore)
                {
                    var ignore = filesToIgnore[i];
                    if(file.match(ignore) !== null)
                    {
                        shouldIgnore = true;
                        break;
                    }
                }
                if(shouldIgnore)
                {
                    continue;
                }
            }
            var relativeFilePath = file;
            if(prependPath)
            {
                relativeFilePath = prependPath+'/'+file;
            }
            if(fs.lstatSync(path.resolve(basePath, file)).isDirectory())
            {
                var subFiles = getFilesInPath(basePath + '/' + file, relativeFilePath, filesToIgnore, extension);
                result = result.concat(subFiles);
            }
            else if(typeof extension === 'string' && file.substr(-(extension.length)) === extension)
            {
                result.push(relativeFilePath);
            }
            else if(Object.prototype.toString.call( extension ) === '[object Array]')
            {
                for(var j = 0; j < extension.length; j++)
                {
                    var currentExtension = extension[j];
                    if(file.substr(-(currentExtension.length)) === currentExtension)
                    {
                        result.push(relativeFilePath);
                    }
                }

            }
        }
        return result;
    }

    var writeModuleMap = function (sourceDir, files, templateToRender) {
        var dirParts = sourceDir.split("/");
        var basePath = dirParts.pop();
        var text = "";
        for (var index in files) {
            var file = files[index];
            text += templateToRender(file, basePath);
        }
        return text;
    };

    var defaultModuleTemplate = function(file, basePath)
    {
        var modulePath = file.substr(0, file.length - 3);
        return "declare module \"" + modulePath + "\" {\n" +
        "   import Component = require('"+basePath+"/"+modulePath+"');\n" +
        "   export = Component;\n" +
        "}\n";
    };
};
