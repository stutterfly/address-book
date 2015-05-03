define([
  'react'
], function (React) {
  return React.createClass({
    render: function() {
      var id = this.props.contact.get('id'),
        fav = this.props.contact.get('fav');

      return (
        <tr>
            <td><input type="checkbox" checked= { this.props.selected } onClick={this.props.onSelect.bind(null, id, !this.props.selected) } /></td>
            <td onClick= { this.props.onShowFull } > { this.props.contact.get('first_name') + ' ' + (this.props.contact.get('last_name') || '') } </td>
            <td onClick= { this.props.onShowFull } > { this.props.contact.get('phone') } </td>
          <td>
            <span className={"glyphicon glyphicon-star" + (fav ? '' : '-empty')} aria-hidden="true" onClick={this.props.onFavToggle}></span>
            <span
              className="glyphicon glyphicon-pencil"
              aria-hidden="true"
              onClick = { this.props.onEdit } >
            </span>
            <span
              className="glyphicon glyphicon-remove"
              aria-hidden="true"
              onClick = { this.props.onDestroy }
            >
            </span>
          </td>
        </tr>
      );
    }
  });
});