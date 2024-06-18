import React, { Component } from "react";
import Loading from "./Loading";
import Panel from "./Panel";
import classnames from "classnames";
import {
 getTotalPhotos,
 getTotalTopics,
 getUserWithMostUploads,
 getUserWithLeastUploads
} from "helpers/selectors";

const data = [
  {
    id: 1,
    label: "Total Photos",
    getValue: getTotalPhotos
  },
  {
    id: 2,
    label: "Total Topics",
    getValue: getTotalTopics
  },
  {
    id: 3,
    label: "User with the most uploads",
    getValue: getUserWithMostUploads
  },
  {
    id: 4,
    label: "User with the least uploads",
    getValue: getUserWithLeastUploads
  }

];

class Dashboard extends Component {
  state = {
    loading: true,
    focused: null,
    photos: [],
    topics: [],
  };

  //Change the selectPanel function to set the value of focused back to null if the value of focused is currently set to a panel.
  selectPanel(id) {
  this.setState(previousState => ({
    focused: previousState.focused !== null ? null : id
  }));
}

  handleFocus = (id) => {
    this.setState({ focused: id });
  };

  componentDidMount() {
    const urlsPromise = [
    "/api/photos",
    "/api/topics",
    ].map(url => fetch(url).then(response => response.json()));

    Promise.all(urlsPromise)
    .then(([photos, topics]) => {
    this.setState({
    loading: false,
    photos: photos,
    topics: topics
      });
    });


    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  render() {
    
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });


    if(this.state.loading) {
      return <Loading />;
    }
    console.log(this.state);
  //If this.state.focused is null then return true for every panel.
  //If this.state.focused is equal to the Panel, then let it through the filter.
   const panels = (this.state.focused ? data.filter(panel => this.state.focused === panel.id) : data)
   .map(panel => (
   <Panel
    key={panel.id}
    label={panel.label}
    value={panel.getValue(this.state)}
    onSelect={() => this.selectPanel(panel.id)}
    />
   ));
    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;

/*
React.Component
We inherit the behaviour from a base component class provided by React. Sometimes we would see React.Component instead, if we aren't using named imports.

render()
We must define a render method in our class. It is the only method that must exist for a component to work in React.

this.props
React attaches the props object to the component instance. We can access props using this.props.

Initial State
We can initialize the state in the constructor or using class property syntax. We have decided not to use constructors for this project.

this.state
Similar to how props are attached to the instance, the same is true for this.state. We can access the state for the instance of the component using this.state.

this.setState
To change the existing state, we need to call the setState instance method provided by React. A component will render when after we called setState.

Instance Methods
There are instance methods that we inherit from React.Component like this.setState. We also create our own to help organize our logic.

Binding Context
When we start to pass functions around, we need to be careful of maintaining the correct context.
*/