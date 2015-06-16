baseUrl = 'base/';

requirejs.config({
    baseUrl: 'src/',
    paths: {
        d3: '/base/bower_components/d3/d3.min',
        koto: '/node_modules/koto/dist/koto.min'
    }
});
var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

