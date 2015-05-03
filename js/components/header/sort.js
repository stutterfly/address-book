define([
  'react'
], function (React) {
  return React.createClass({
    render: function() {
      return (
        React.createElement("form", {className: "navbar-form navbar-right"}, 
          React.createElement("div", {className: "btn-group btn-group-right", role: "group"}, 
            React.createElement("button", {onClick: this.props.onSort.bind(null, 'first_name'), type: "button", className: "btn btn-default" + (this.props.sortParam == 'first_name' ? ' active' : '')}, 
              React.createElement("span", {className: "glyphicon glyphicon-font", "aria-hidden": "true"})
            ), 
            React.createElement("button", {onClick: this.props.onSort.bind(null, 'birthday'), type: "button", className: "btn btn-default" + (this.props.sortParam == 'birthday' ? ' active' : '')}, 
              React.createElement("span", {className: "glyphicon glyphicon-calendar", "aria-hidden": "true"})
            ), 
            React.createElement("button", {onClick: this.props.onSort.bind(null, 'phone'), type: "button", className: "btn btn-default" + (this.props.sortParam == 'phone' ? ' active' : '')}, 
              React.createElement("span", {className: "glyphicon glyphicon-earphone", "aria-hidden": "true"})
            )
          )
        )
        )
    }
  });
});