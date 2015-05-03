define([
  'react'
], function (React) {
  return React.createClass({
    render: function() {
      var id = this.props.contact.get('id'),
        fav = this.props.contact.get('fav');

      return (
        React.createElement("tr", null, 
            React.createElement("td", null, React.createElement("input", {type: "checkbox", checked:  this.props.selected, onClick: this.props.onSelect.bind(null, id, !this.props.selected) })), 
            React.createElement("td", {onClick:  this.props.onShowFull}, " ",  this.props.contact.get('first_name') + ' ' + (this.props.contact.get('last_name') || ''), " "), 
            React.createElement("td", {onClick:  this.props.onShowFull}, " ",  this.props.contact.get('phone'), " "), 
          React.createElement("td", null, 
            React.createElement("span", {className: "glyphicon glyphicon-star" + (fav ? '' : '-empty'), "aria-hidden": "true", onClick: this.props.onFavToggle}), 
            React.createElement("span", {
              className: "glyphicon glyphicon-pencil", 
              "aria-hidden": "true", 
              onClick:  this.props.onEdit}
            ), 
            React.createElement("span", {
              className: "glyphicon glyphicon-remove", 
              "aria-hidden": "true", 
              onClick:  this.props.onDestroy
            }
            )
          )
        )
      );
    }
  });
});