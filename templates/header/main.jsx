define([
  'react',
  './actions',
  './sort'
], function (React, Actions, Sort) {
  return React.createClass({
    render: function() {
      return (
        <nav id="navbar" className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <button onClick={ this.props.onShowModal }
                type="button" className="btn btn-default btn-navbar"
                >
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
              </a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className= { this.props.filter == 'all' ? 'active' : '' } >
                  <a onClick= { this.props.onFilterSet.bind(null, 'all') } href="#">All</a>
                </li>
              </ul>
              <ul className="nav navbar-nav">
                <li className= { this.props.filter == 'fav' ? 'active' : '' }>
                  <a onClick= { this.props.onFilterSet.bind(null, 'fav') } href="#">Favourite</a>
                </li>
              </ul>

              <Sort
              onSort={ this.props.contacts.sortChange.bind(this.props.contacts) }
              sortParam={ this.props.contacts.comparator }
              />

              {this.props.selectedItems.length > 0 ?
                <Actions
                items = { this.props.selectedItems }
                onFavSet = { this.props.contacts.favSet.bind(this.props.contacts) }
                onRemoveSelected = { this.props.contacts.removeSelected.bind(this.props.contacts, this.props.selectedItems.pluck('id')) }
                /> : ''}

            </div>
          </div>
        </nav>
      )

    }
  });
});