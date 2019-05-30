import React from '../react'

class Counter extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
        num: 1
    }
}

  componentWillUpdate() {
    console.log('update');
  }

  componentWillMount() {
    console.log('mount');
  }

  onClick() {
    this.setState({ num: this.state.num + 1 });
  }

  render() {
    return (
      <div className="test" style="color: red;">
        <h1>count: {this.state.num }</h1>
        <button onClick={() => this.onClick()}>add</button>
        haha
      </div>
    )
  }
}
export default Counter;