import { Personaje } from "./personaje.js";

export class Monstruo extends Personaje {
  constructor(id, nombre, miedo, alias, defensa, tipo, bosque,polar,oceano) {
    super(id, nombre, tipo);
    this.alias = alias;
    this.defensa = defensa;
    this.miedo = miedo;
    this.bosque = bosque;
    this.polar = polar;
    this.oceano = oceano;
  }
}
