import React from 'react';
import { connect } from 'dva';


@connect((state) => ({
  star: state.star,
  test: state.test,
}))

class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'test/getStar',
      payload: {},
      callback: (response) => {
        console.log('response', response);
      },
    });
  }

  componentWillUnmount() {

  }

  componentDidUpdate() {

  }

  render() {
    console.log(this.props);
    debugger;
    return (
      <div>
        <div>Hello, world!</div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Test;
