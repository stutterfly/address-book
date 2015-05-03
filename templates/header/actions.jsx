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
        <form className="navbar-form navbar-right">
          <div className="btn-group btn-group-right" role="group">
            <button onClick={ this.handleFavSet } type="button" className={"btn btn-default"}>
              <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
            </button>
            <button onClick={ this.props.onRemoveSelected } type="button" className={"btn btn-default"}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </div>
        </form>
        )
    }
  });
});