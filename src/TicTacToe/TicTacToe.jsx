import React from "react";
import styled from "styled-components";
import color from "./color";

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
  color: ${color.shadow};
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
      tiles: [],
      turn: 0,
    };
  }

  componentDidMount() {
    this.setState(() => {
      const tiles = [];
      for (let i = 0; i < 9; i++) {
        tiles.push({ isActive: false, symbol: null });
      }
      return { tiles };
    });
  }

  addTile = (key) => {
    this.setState((prev, props) => {
      const newTiles = [...prev.tiles];
      newTiles[key].isActive = true;
      if (prev.turn === 0) {
        newTiles[key].symbol = 0;
      } else {
        newTiles[key].symbol = 1;
      }
      return { tiles: newTiles, turn: prev.turn ? 0 : 1 };
    });
  };

  render() {
    return (
      <Game>
        <Turn>{`${this.state.turn === 0 ? "X" : "O"} TURN`}</Turn>
        <Board>
          <Grid>
            {this.state.tiles.map((tile, idx) => {
              if (tile.isActive) {
                return <Tile key={idx} symbol={tile.symbol}></Tile>;
              } else {
                return <div key={idx}></div>;
              }
            })}
          </Grid>
          <Grid>
            {this.state.tiles.map((tile, idx) => (
              <BaseTile key={idx} addTile={() => this.addTile(idx)}></BaseTile>
            ))}
          </Grid>
        </Board>
      </Game>
    );
  }
}
