define([
  'backbone'
], function (Backbone) {
  return Backbone.Collection.extend({
    itemSet: function(id, status) {
      if (status) {
        this.add({id: id});
      } else {
        this.remove({id: id});
      }
    },
    itemsSet: function(ids, status) {
      if (!status) {
        ids.forEach(function(id) {
          this.add({id: id});
        }, this);
      } else {
        this.reset();
      }
    }
  });
});