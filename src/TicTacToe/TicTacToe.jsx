import React from "react";
import Tile from "./components/Tile";

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [],
    };
  }

  componentDidMount() {
    const matrix = [];
    for (let i = 0; i < 3; i++) {
      const matrixRow = [];
      for (let j = 0; j < 3; j++) {
        matrixRow.push({
          isEnabled,
          symbol,
          pos: [i, j],
        });
      }
      matrix.push(matrixRow);
    }
    this.setState({ matrix });
  }

  render() {
    const { matrix } = this.state;
    return (
      <div>
        <div className="board">
          {matrix.map((row, rowIdx) => {
            row.map((tile, tileIdx) => (
              <Tile
                key={tileIdx}
                type="active"
                pos={tile.pos}
                isEnabled={tile.isEnabled}
                symbol={tile.symbol}
              ></Tile>
            ));
          })}
        </div>
        <div className="board">
          {matrix.map((row, rowIdx) => {
            row.map((tile, tileIdx) => (
              <Tile key={tileIdx} type="base" pos={tile.pos}></Tile>
            ));
          })}
        </div>
      </div>
    );
  }
}
