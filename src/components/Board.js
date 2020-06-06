import React from 'react';
import Tile from './Tile';
import BaseTile from './BaseTile';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseTiles: [],
      activeTiles: []
    };
  }

  componentDidMount() {
    this.setState((prev, props) => {
      let temp = [];
      for(let i = 0; i < 9; i++) {
        temp.push(<BaseTile />);
      }
      return ({
        baseTiles: temp
      });
    });
  }

  render() {
    return(
      <div className="Board">
        {this.state.baseTiles}
      </div>
    );
  }
}

export default Board;
