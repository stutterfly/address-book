define([
  'react',
  './actions',
  './sort'
], function (React, Actions, Sort) {
  return React.createClass({
    render: function() {
      return (
        React.createElement("nav", {id: "navbar", className: "navbar navbar-default"}, 
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: "navbar-header"}, 
              React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1"}, 
                React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
                React.createElement("span", {className: "icon-bar"}), 
                React.createElement("span", {className: "icon-bar"}), 
                React.createElement("span", {className: "icon-bar"})
              ), 
              React.createElement("a", {className: "navbar-brand", href: "#"}, 
                React.createElement("button", {onClick:  this.props.onShowModal, 
                type: "button", className: "btn btn-default btn-navbar"
                }, 
                  React.createElement("span", {className: "glyphicon glyphicon-plus", "aria-hidden": "true"})
                )
              )
            ), 

            React.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, 
              React.createElement("ul", {className: "nav navbar-nav"}, 
                React.createElement("li", {className:  this.props.filter == 'all' ? 'active' : ''}, 
                  React.createElement("a", {onClick:  this.props.onFilterSet.bind(null, 'all'), href: "#"}, "All")
                )
              ), 
              React.createElement("ul", {className: "nav navbar-nav"}, 
                React.createElement("li", {className:  this.props.filter == 'fav' ? 'active' : ''}, 
                  React.createElement("a", {onClick:  this.props.onFilterSet.bind(null, 'fav'), href: "#"}, "Favourite")
                )
              ), 

              React.createElement(Sort, {
              onSort:  this.props.contacts.sortChange.bind(this.props.contacts), 
              sortParam:  this.props.contacts.comparator}
              ), 

              this.props.selectedItems.length > 0 ?
                React.createElement(Actions, {
                items:  this.props.selectedItems, 
                onFavSet:  this.props.contacts.favSet.bind(this.props.contacts), 
                onRemoveSelected:  this.props.contacts.removeSelected.bind(this.props.contacts, this.props.selectedItems.pluck('id')) }
                ) : ''

            )
          )
        )
      )

    }
  });
});