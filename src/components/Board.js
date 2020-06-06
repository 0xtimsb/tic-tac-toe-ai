import React from 'react';
import ActiveTile from './ActiveTile';
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
        <div className="Board__Grid">
          <ActiveTile />
          <ActiveTile />
          <ActiveTile />
          <ActiveTile />
          <ActiveTile />
          <ActiveTile />
          <ActiveTile />
          <ActiveTile />
          <ActiveTile />
        </div>
        <div className="Board__Grid">
          {this.state.baseTiles}
        </div>    
      </div>
    );
  }
}

export default Board;
