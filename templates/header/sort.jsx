define([
  'react'
], function (React) {
  return React.createClass({
    render: function() {
      return (
        <form className="navbar-form navbar-right">
          <div className="btn-group btn-group-right" role="group">
            <button onClick={this.props.onSort.bind(null, 'first_name')} type="button" className={"btn btn-default" + (this.props.sortParam == 'first_name' ? ' active' : '')}>
              <span className="glyphicon glyphicon-font" aria-hidden="true"></span>
            </button>
            <button onClick={this.props.onSort.bind(null, 'birthday')} type="button" className={"btn btn-default" + (this.props.sortParam == 'birthday' ? ' active' : '')}>
              <span className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
            </button>
            <button onClick={this.props.onSort.bind(null, 'phone')} type="button" className={"btn btn-default" + (this.props.sortParam == 'phone' ? ' active' : '')}>
              <span className="glyphicon glyphicon-earphone" aria-hidden="true"></span>
            </button>
          </div>
        </form>
        )
    }
  });
});