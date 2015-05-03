define([
  'react'
], function (React) {
  return React.createClass({
    getInitialState: function() {
      return {
        isFav: false
      }
    },
    handleFavSet: function() {
      this.setState({isFav: !this.state.isFav}, function() {
        this.props.onFavSet(this.props.items.pluck('id'), this.state.isFav);
      });
    },
    render: function() {
      return (
        React.createElement("form", {className: "navbar-form navbar-right"}, 
          React.createElement("div", {className: "btn-group btn-group-right", role: "group"}, 
            React.createElement("button", {onClick:  this.handleFavSet, type: "button", className: "btn btn-default"}, 
              React.createElement("span", {className: "glyphicon glyphicon-star", "aria-hidden": "true"})
            ), 
            React.createElement("button", {onClick:  this.props.onRemoveSelected, type: "button", className: "btn btn-default"}, 
              React.createElement("span", {className: "glyphicon glyphicon-remove", "aria-hidden": "true"})
            )
          )
        )
        )
    }
  });
});