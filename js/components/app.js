define([
  'backbone',
  'react',
  'collections/contactsSelected',
  'components/header/main',
  'components/contact',
  'components/contactModal',
  'jquery',
  'bootstrap'
], function (Backbone, React, ContactsSelected, Header, Contact, ContactModal, $) {

  var BackboneMixin = {
    componentDidMount: function () {
      this.getBackboneCollections().forEach(function (collection) {
        collection.on('add remove reset change sort', this.forceUpdate.bind(this, null));
      }, this);
    },
    componentWillUnmount: function () {
      this.getBackboneCollections().forEach(function (collection) {
        collection.off(null, null, this);
      }, this);
    }
  };

  return React.createClass({
    mixins: [BackboneMixin],
    getBackboneCollections: function () {
      return [this.props.contacts, this.state.selectedItems];
    },
    componentDidMount: function () {
      this.props.contacts.fetch();
    },
    componentDidUpdate: function () {
      this.props.contacts.forEach(function (contact) {
        contact.save();
      });
    },
    getInitialState: function() {
      return {
        searchStr: '',
        filter: 'all',
        action: null,
        target: null,
        selectedItems: new ContactsSelected()
      }
    },
    filterItems: function(searchStr, items) {
      return items.filter(function(item) {
        var first_name = item.get('first_name') || '',
          lastName = item.get('last_name') || '';

        return first_name.toLowerCase().match( searchStr ) || lastName.toLowerCase().match( searchStr );
      });
    },
    filterChange: function(val) {
      this.setState({filter: val});
    },
    handleSearch: function(e) {
      this.setState({searchStr:e.target.value});
    },
    handleAddSubmit: function() {
      this.props.contacts.add(this.state.target);
      this.handleClose();
    },
    handleClose: function() {
      this.setState({target: null});
      $('.modal.fade').modal('hide');
    },
    showModal: function(contact, action) {
      this.setState({target: contact, action: action}, function() {
        $('.modal.fade')
          .modal('show')
          .on('hidden.bs.modal', this.handleClose);
      });
    },
    render: function() {
      var contacts = this.props.contacts,
        contactsIds = contacts.pluck('id'),
        isSelectedAll = (contacts.length == this.state.selectedItems.length) && contacts.length != 0,
        action = (contacts.length == 0 ? 'new' : this.state.action);

      if (this.state.searchStr.length > 0) {
        contacts = this.filterItems(this.state.searchStr, this.props.contacts);
      }

      if (this.state.filter == 'fav') {
        contacts = contacts.filter(function(contact) {
          return contact.get('fav');
        });
      }

      // bar with tools (filter, sort, set favourite, delete)
      var header = (
        React.createElement(Header, {contacts:  this.props.contacts, 
          onShowModal:  this.showModal.bind(null, new this.props.contacts.model(), 'new'), 
          onFilterSet:  this.filterChange.bind(this), 
          filter:  this.state.filter, 
          selectedItems:  this.state.selectedItems}
        )
      );

      var search = (
        React.createElement("div", {id: "contact-search", className: "input-group"}, 
          React.createElement("span", {className: "input-group-addon"}, "Search:"), 
          React.createElement("input", {value:  this.state.searchStr, 
            onChange:  this.handleSearch, 
            type: "text", 
            className: "form-control", 
            placeholder: "Enter name of contact", 
            "aria-describedby": "basic-addon1"}
          )
        )
        );

      // Result contacts items
      var contactsItems = contacts.map(function (contact) {
        return (
          React.createElement(Contact, {key:  contact.id, 
            contact:  contact, 
            selected:  this.state.selectedItems.get(contact.id) || false, 
            onShowFull:  this.showModal.bind(this, contact, 'show'), 
            onEdit:  this.showModal.bind(this, contact, 'edit'), 
            onDestroy:  contact.destroy.bind(contact), 
            onFavToggle:  contact.favToggle.bind(contact), 
            onSelect:  this.state.selectedItems.itemSet.bind(this.state.selectedItems) }
          )
        );
      }, this);

      // Table width contacts items
      var contactsBlock = (
        React.createElement("div", {className: "panel panel-default"}, 
          React.createElement("table", {className: "table table-striped"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", {className: "row-check"}, React.createElement("input", {type: "checkbox", checked: isSelectedAll, onClick:  this.state.selectedItems.itemsSet.bind(this.state.selectedItems, contactsIds, isSelectedAll) })), 
                React.createElement("th", null, "Name"), 
                React.createElement("th", null, "Phone"), 
                React.createElement("th", {className: "actions"}, "Actions")
              )
            ), 
            React.createElement("tbody", null, 
                contactsItems
            )
          )
        )
      );

      // Modal window with add, edit, show contact features
      var modal = (
        this.state.target ?
          React.createElement(ContactModal, {contact:  this.state.target, 
            action:  action, 
            onEdit:  this.showModal.bind(this, this.state.target, 'edit'), 
            onSubmit:  this.handleAddSubmit, 
            onClose:  this.handleClose}
          ) : ''
      );

      return (
        React.createElement("div", {id: "contacts"}, 
          React.createElement("h1", {id: "title"}, "Address book"), 
          header, 
          search, 
          contactsBlock, 
          modal
        )
      )
    }
  });
});
