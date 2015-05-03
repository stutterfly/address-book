'use strict';

requirejs.config({
  baseUrl: './js',
  urlArgs: "dev=" + (new Date()).getTime(),
  paths: {
    jquery: '../node_modules/jquery/dist/jquery.min',
    underscore: '../node_modules/underscore/underscore-min',
    backbone: '../node_modules/backbone/backbone-min',
    'backbone.localStorage': '../node_modules/backbone.localstorage/backbone.localStorage-min',
    react: '../node_modules/react/dist/react.min',
    text: '../node_modules/requirejs-text/text',
    bootstrap: '../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone', 'underscore'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'Bootstrap'
    }
  }
});

require([
  'react',
  'collections/contacts',
  'components/app'
], function(React, ContactsCollection, App) {
  var contactsCollection = new ContactsCollection();

  React.render(
    React.createElement(App, {contacts: contactsCollection}),
    document.getElementById('app')
  );
});
