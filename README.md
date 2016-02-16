# simple-script-loader

Simple promise based script loader for js

###Installation

Just copy loader.min.js contents to your project

###Usage

Very simple promise based loader. Appends css and js tags to document.

Original idea, source and credit to [this article](https://davidwalsh.name/javascript-loader)

####Simple Usage

<pre>
    var load = new Loader();
    Promise.all([
        load.css('https://fonts.googleapis.com/css?family=Open+Sans:400,600'),
        load.css('https://fonts.googleapis.com/css?family=Raleway:400,100,200,300,500,600'),
        load.css('css/css.min.css'),
        load.js('js/app.js')
    ]).then(function (urls) {
        console.log('downloaded : ' + urls); // => outputs downloaded : http....
    }).catch(function () {
        console.log('oops'); // One or more of the urls could not be downloaded
    });
</pre>

####Usage with an array of objects

As a convenience resources can also be loaded from an array of objects such as:

<pre>
    [
        {tag: 'script', src: 'js/app.js'},
        {tag: 'link', src: 'css/css.min.css'}
    ]
</pre>

Usage would look something like:

<pre>
var load = new Loader();

var res = [
    {tag: 'script', src: 'js/app.js'},
    {tag: 'link', src: 'css/css.min.css'}
];

load.resources(res)
    .then(function (urls) {
        // .. tidy up after the resources have successfully loaded
    })
    .catch(function (url) {
        console.log('something went wrong');
    });

</pre>