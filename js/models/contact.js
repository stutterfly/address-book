define([
  'backbone'
], function (Backbone) {

  return Backbone.Model.extend({
    defaults: {
      first_name: '',
      fav: false
    },
    selected: false,
    fields: [
      { title: 'First name', val: 'first_name' },
      { title: 'Last name', val: 'last_name' },
      { title: 'Phone', val: 'phone' },
      { title: 'Mail', val: 'mail' },
      { title: 'Photo', val: 'photo' },
      { title: 'Birthday', val: 'birthday' },
      { title: 'Note', val: 'note' }
    ],
    favToggle: function() {
      this.save({
        fav: !this.get('fav')
      });
    },
    select: function() {
      this.selected = !this.selected;
      this.trigger('change');
    }
  });
});
