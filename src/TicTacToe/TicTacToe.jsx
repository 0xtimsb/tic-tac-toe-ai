import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import color from "./color";
import minMax, { giveCopy } from "./algorithm";

import Tile from "./components/Tile";
import BaseTile from "./components/BaseTile";

const Game = styled.div`
  background-color: ${color.background};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Turn = styled.div`
  position: absolute;
  transform: translateY(290px);
  font-size: 30px;
  font-weight: 600;
  color: #000000;
`;

const Board = styled.div`
  background-color: ${color.background};
  width: 460px;
  height: 460px;
  box-shadow: 10px 10px 10px ${color.shadow}, -10px -10px 10px ${color.light};
  border-radius: 10px;
`;

const Grid = styled.div`
  position: absolute;
  width: 460px;
  height: 460px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 140px 140px 140px;
  grid-template-rows: 140px 140px 140px;
  grid-gap: 10px;
  padding: 10px;
`;

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [],
      turn: 0,
    };
  }

  componentDidMount() {
    this.setState(() => {
      const matrix = [];
      for (let i = 0; i < 3; i++) {
        matrix.push([]);
        for (let j = 0; j < 3; j++) {
          matrix[i].push({ key: uuidv4(), isActive: false, symbol: null });
        }
      }
      return { matrix };
    });
  }

  addTile = (i, j) => {
    this.setState(
      (prev, props) => {
        // To get deep copy! Instead of shallow.
        const newMatrix = JSON.parse(JSON.stringify(prev.matrix));
        newMatrix[j][i].isActive = true;
        if (prev.turn === 0) {
          newMatrix[j][i].symbol = 0;
        } else {
          newMatrix[j][i].symbol = 1;
        }
        return { matrix: newMatrix, turn: prev.turn ? 0 : 1 };
      },
      () => {
        if (this.state.turn === 1) {
          //console.log(minMax(this.state.matrix, Infinity, 0));
        }
      }
    );
  };

  render() {
    return (
      <Game>
        <Turn>{`${this.state.turn === 0 ? "X" : "O"} TURN`}</Turn>
        <Board>
          <Grid>
            {this.state.matrix.map((rows, j) =>
              rows.map((tile, i) => {
                if (tile.isActive) {
                  return <Tile key={tile.key} symbol={tile.symbol}></Tile>;
                } else {
                  return <div key={tile.key}></div>;
                }
              })
            )}
          </Grid>
          <Grid>
            {this.state.matrix.map((rows, j) =>
              rows.map((tile, i) => (
                <BaseTile
                  key={tile.key}
                  addTile={() => this.addTile(i, j)}
                ></BaseTile>
              ))
            )}
          </Grid>
        </Board>
      </Game>
    );
  }
}
