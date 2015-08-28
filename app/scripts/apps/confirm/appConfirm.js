/* global define */
define([
    'underscore',
    'marionette',
    'backbone.radio',
    'modules',
    'apps/confirm/show/controller'
], function(_, Marionette, Radio, Modules, Controller) {
    'use strict';

    /**
     * Confirm module. We use it as a replacement for window.confirm.
     *
     * Complies on channel `Confirm` to:
     * 1. command `start` - starts itself.
     * 2. command `stop`  - stops itself.
     */
    var Confirm = Modules.module('Confirm', {startWithParent: false});

    Confirm.on('start', function(options) {
        Confirm.controller = new Controller(options);
    });

    Confirm.on('stop', function() {
        Confirm.controller.destroy();
        delete Confirm.controller;
    });

    // Initializer
    Radio.command('init', 'add', 'app', function() {
        Radio.comply('Confirm', 'start', Confirm.start, Confirm);
        Radio.comply('Confirm', 'stop', Confirm.stop, Confirm);
    });

    return Confirm;

});
