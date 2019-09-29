import React from "react";
import "./App.css";
import Buttons from "./components/Buttons";
//import CallApi, { numero } from "./components/CallApi";

const numeroPokemons = 807;

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espalda: "null",
      frente: "null",
      numero: 1,
      tipos: [],
      listapokemon: []
    };
  }

  callAPI(numero) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${numero}/`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          espalda: res.sprites.back_default,
          frente: res.sprites.front_default,
          name: res.name,
          tipos: res.types,
          numero: res.id
        })
      );
  }

  random = () => {
    let numero = Math.ceil(Math.random() * numeroPokemons);
    this.callAPI(numero);
  };

  back = async () => {
    let next = this.state.numero - 1;
    this.callAPI(next);
  };

  next = () => {
    let next = this.state.numero + 1;
    this.callAPI(next);
  };

  search() {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${numeroPokemons}/`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          listapokemon: res.results
        })
      );
  }

  buscar = e => {
    this.callAPI(e.target.id);
  };

  handleChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });

    let termino = this.state.buscar;
    this.callAPI(termino);
    this.search();
  };

  componentDidMount() {
    this.callAPI(this.state.numero);
    this.search();
  }

  render() {
    let array = [];
    let typelist;

    let array2 = [];
    let pokelist;
    for (let i = 0; i < this.state.listapokemon.length; i++) {
      if (this.state.listapokemon[i].name.indexOf(this.state.buscar) !== -1) {
        array2.push(this.state.listapokemon[i].name);
      }
    }

    pokelist = array2.map(nombre => (
      <li onClick={this.buscar} id={nombre} key={nombre.toString()}>
        {nombre}
      </li>
    ));

    for (let i = 0; i < this.state.tipos.length; i++) {
      array.push(this.state.tipos[i].type.name);

      //define el tipo de pokemon con switch
      switch (array[i]) {
        case array[i]:
          typelist = array.map(tipo => (
            <li className={tipo} key={tipo.toString()}>
              {tipo}
            </li>
          ));
          break;
        default:
          break;
      }
    }

    return (
      <div className="pokedex">
        <img src={this.state.frente} alt="pokemon" />
        <h1>{this.state.name}</h1>
        <ul className="tipos">{typelist}</ul>
        <div className="buttons">
          <button type="button" onClick={this.back} className="button btn">
            Pokemon Anterior
          </button>
          <button type="button" onClick={this.random} className="button btn">
            Pokemon Random
          </button>
          <button type="button" onClick={this.next} className="button btn">
            Siguiente Pokemon
          </button>
        </div>
        <input onChange={this.handleChange} name="buscar" />{" "}
        <button type="button" onClick={this.buscar} className="button btn">
          Buscar
        </button>
        <ul>{pokelist}</ul>
      </div>
    );
  }
}

export default Pokedex;
