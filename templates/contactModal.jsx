define([
  'react',
  'jquery',
  'bootstrap'
], function (React, $) {

  var Modal = React.createClass({
    componentDidMount: function () {
    },
    render: function() {
      // Show submit button if new contact
      var submitButton = (
        this.props.action == 'new' && this.props.isSubmit ?
          <button onClick= { this.props.onSubmit } type="button" className="btn btn-primary">Add</button> : ''
      );

      return (
        <div id="contact-modal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" onClick = { this.props.onClose } className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title"> { this.props.title } </h4>
              </div>
              <div className="modal-body">
                {this.props.content}
              </div>
              <div className="modal-footer">
                <button onClick = { this.props.onClose } type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                {submitButton}
              </div>
            </div>
          </div>
        </div>
      )
    }
  });

  var Field = React.createClass({
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
          <input className="form-control" onChange={ this.handleEdit } name={ this.props.param } value={ this.state.value } /> :
          <span className="form-control" aria-describedby="basic-addon1">{ this.state.value }</span>
      );

      return (
        <div className={"input-group" + (!isValid ? ' has-error' : '')}>
          <span className="input-group-addon">{this.props.title}</span>
          {field}
        </div>
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
          <Field id = { field.title }
            title = { field.title }
            param = { field.val }
            value = { value || '' }
            action = { this.props.action }
            onEdit = { this.handleEdit }
          /> : '')
      }, this);

      // Put fields of contact in form as content of modal
      var content = (
        <form id="contact-form">
          {items}
        </form>
      );

      var isSubmit = this.props.contact.get('first_name').length > 0;

      return (
        <Modal
          title = { title }
          content = { content }
          action = { this.props.action }
          isSubmit = { isSubmit }
          onSubmit = { this.props.onSubmit }
        />
      );
    }
  });
});