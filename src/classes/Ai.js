import Player from "./Player.js";

export default class Ai extends Player {
  constructor(name, mark, playFunction) {
    super(name, mark);
    this.play = playFunction;
  }
}
