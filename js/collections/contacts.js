define([
  'backbone',
  'underscore',
  'models/contact',
  'backbone.localStorage'
], function (Backbone, _, ContactModel) {

  return Backbone.Collection.extend({
    model: ContactModel,
    localStorage: new Backbone.LocalStorage('address-book'),
    comparator: 'first_name',
    sortChange: function(value) {
      this.comparator = value;
      this.sort();
    },
    favSet: function(ids, status) {
      ids.forEach(function(id) {
        console.log('this', this, id);
        if (this.get(id)) {
          this.get(id).set({fav: status});
        }
      }, this);
    },
    removeSelected: function(ids) {
      ids.forEach(function(id) {
        if (this.get(id)) {
          this.get(id).destroy();
        }
      }, this);
    }
  });
});
