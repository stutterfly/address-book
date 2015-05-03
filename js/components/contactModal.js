define([
  'react',
  'jquery',
  'bootstrap'
], function (React, $) {

  var Modal = React.createClass({displayName: "Modal",
    componentDidMount: function () {
    },
    render: function() {
      // Show submit button if new contact
      var submitButton = (
        this.props.action == 'new' && this.props.isSubmit ?
          React.createElement("button", {onClick:  this.props.onSubmit, type: "button", className: "btn btn-primary"}, "Add") : ''
      );

      return (
        React.createElement("div", {id: "contact-modal", className: "modal fade"}, 
          React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("div", {className: "modal-content"}, 
              React.createElement("div", {className: "modal-header"}, 
                React.createElement("button", {type: "button", onClick:  this.props.onClose, className: "close", "data-dismiss": "modal", "aria-label": "Close"}, 
                  React.createElement("span", {"aria-hidden": "true"}, "×")
                ), 
                React.createElement("h4", {className: "modal-title"}, " ",  this.props.title, " ")
              ), 
              React.createElement("div", {className: "modal-body"}, 
                this.props.content
              ), 
              React.createElement("div", {className: "modal-footer"}, 
                React.createElement("button", {onClick:  this.props.onClose, type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Close"), 
                submitButton
              )
            )
          )
        )
      )
    }
  });

  var Field = React.createClass({displayName: "Field",
    getInitialState: function() {
      return {
        value: this.props.value
      }
    },
    handleEdit: function(e) {
      this.setState({value:e.target.value}, function() {
        this.props.onEdit(this.props.param, this.state.value);
      });
    },
    render: function() {
      var isValid = this.props.param != 'first_name' ? true : this.state.value.length > 0;

      // Set uneditable field in show mode
      var field = (
        this.props.action != 'show' ?
          React.createElement("input", {className: "form-control", onChange:  this.handleEdit, name:  this.props.param, value:  this.state.value}) :
          React.createElement("span", {className: "form-control", "aria-describedby": "basic-addon1"},  this.state.value)
      );

      return (
        React.createElement("div", {className: "input-group" + (!isValid ? ' has-error' : '')}, 
          React.createElement("span", {className: "input-group-addon"}, this.props.title), 
          field
        )
      )
    }
  });

  return React.createClass({
    componentDidMount: function () {
      this.props.contact.on('change', this.forceUpdate.bind(this, null));
    },
    handleEdit: function(field, value) {
      this.props.contact.set(field, value);
    },
    render: function() {

      // Set title of modal
      var title = (this.props.action == 'new' ?
        'Add contact' : this.props.action == 'edit' ?
          'Edit contact' : 'Contact');

      // Get fields from contact model
      var items = this.props.contact.fields.map(function(field) {
        var value = this.props.contact.attributes[field.val];

        // Hide empty fields if show mode of modal
        return (this.props.action != 'show' || value ?
          React.createElement(Field, {id:  field.title, 
            title:  field.title, 
            param:  field.val, 
            value:  value || '', 
            action:  this.props.action, 
            onEdit:  this.handleEdit}
          ) : '')
      }, this);

      // Put fields of contact in form as content of modal
      var content = (
        React.createElement("form", {id: "contact-form"}, 
          items
        )
      );

      var isSubmit = this.props.contact.get('first_name').length > 0;

      return (
        React.createElement(Modal, {
          title:  title, 
          content:  content, 
          action:  this.props.action, 
          isSubmit:  isSubmit, 
          onSubmit:  this.props.onSubmit}
        )
      );
    }
  });
});