import React, { Component } from "react";

class Panel extends Component {
 render() {
  const { label, value, onSelect } = this.props;
  //In the browser click on a panel. It should enlarge to take up the full viewport.
  return (
   <section className="dashboard__panel" onClick={onSelect}>
    <h1 className="dashboard__panel-header">{label}</h1>
    <p className="dashboard__panel-value">{value}</p>
   </section>
  );
 }
}

export default Panel;