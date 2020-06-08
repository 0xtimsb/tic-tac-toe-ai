import React from "react";
import Tile from "./components/Tile";

import "./TicTacToe.css";

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
          isEnabled: false,
          symbol: null,
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
      <div className="tictactoe">
        <div className="board">
          <div className="grid">
            {matrix.map((row, rowIdx) =>
              row.map((tile, tileIdx) => (
                <Tile
                  key={tileIdx}
                  type="active"
                  pos={tile.pos}
                  isEnabled={tile.isEnabled}
                  symbol={tile.symbol}
                ></Tile>
              ))
            )}
          </div>
          <div className="grid">
            {matrix.map((row, rowIdx) =>
              row.map((tile, tileIdx) => (
                <Tile key={tileIdx} type="base" pos={tile.pos}></Tile>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
