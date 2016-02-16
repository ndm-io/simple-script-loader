/**
 * @ngdoc object
 * @name app.object:Loader
 *
 * @description
 *
 * Very simple promise based loader. Appends css and js tags to document.
 *
 * Original idea and source came from [https://davidwalsh.name/javascript-loader](https://davidwalsh.name/javascript-loader)
 *
 * ####Simple Usage
 *
 * <pre>
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
 * </pre>
 *
 * ####Usage with an array of objects
 *
 * As a convenience resources can also be loaded from an array of objects such as:
 * <pre>
 [
 {tag: 'script', src: 'js/app.js'},
 {tag: 'link', src: 'css/css.min.css'}
 ]
 * </pre>
 *
 * Usage would look something like:
 *
 * <pre>
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

 * </pre>
 */

function Loader() {

    function _load(tag) {
        return function (url) {

            return new Promise(function (resolve, reject) {
                var element = document.createElement(tag);
                var parent = 'body';
                var attr = 'src';


                element.onload = function () {
                    resolve(url);
                };
                element.onerror = function () {
                    reject(url);
                };

                switch (tag) {
                    case 'script':
                        element.async = true;
                        break;
                    case 'link':
                        element.type = 'text/css';
                        element.rel = 'stylesheet';
                        attr = 'href';
                        parent = 'head';
                }

                element[attr] = url;
                document[parent].appendChild(element);
            });
        };
    }

    /**
     * @ngdoc method
     * @name css
     * @methodOf app.object:Loader
     *
     * @param {string} url The url of the resource to be loaded
     *
     * @returns {Promise} A new promise with an array of URLs loaded and appended
     *
     */

    this.css = function (url) {
        return _load('link')(url);
    };

    /**
     * @ngdoc method
     * @name js
     * @methodOf app.object:Loader
     *
     * @param {string} url The url of the resource to be loaded
     *
     * @returns {Promise} A new promise with an array of URLs loaded and appended
     *
     */

    this.js = function (url) {
        return _load('script')(url);
    };

    /**
     * @ngdoc method
     * @name resources
     * @methodOf app.object:Loader
     *
     * @param {Array} objs An array of resources to be loaded.
     *
     * @description
     *
     * Takes an array of tags and urls and returns a promise with the urls loaded when resolved
     *
     * <pre>
     *     [
     *          {tag: 'script', src: 'js/app.js'},
     *          {tag: 'link', src: 'css/css.min.css'}
     *      ]
     * </pre>
     *
     *
     * @returns {Promise} A promise with the successful Urls
     *
     */

    var _promises = function (objs) {
        return objs.map(function (obj) {
            return _load(obj.tag)(obj.src);
        });
    };

    this.resources = function (objs) {
        return Promise.all(_promises(objs));
    };

}






