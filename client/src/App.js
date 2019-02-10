import React, { Component, Fragment } from 'react';
import './App.scss';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({ uri: 'http://localhost:8000/graphql' });

class App extends Component {
  constructor() {
    super();
    this.state = {
      id_or_name: '',
      result: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      id_or_name: e.target.value
    })
  }
  onSubmit(e) {
    const query = this.state.id_or_name.toLowerCase();
    if (e.keyCode === 13) {
      if (query.length > 0) {
        client.query({
          query: gql`
          {
              pokemon(id_or_name: "${query}") {
                  id
                  name
                  sprites {
                      front_default
                  }
              }
          }
          `
      })
      .then(result => this.setState({ result: result.data }))
      .catch(err => console.log(err));
      }
    }
  }
  render() {
    return (
      <div id="App">
        <h1>React Pokedex</h1>
        <input ref="input" onFocus={() => this.refs.input.placeholder = ''} placeholder="ID or Name:" value={this.state.id_or_name} onChange={this.onChange} onKeyDown={this.onSubmit}></input>
        <div id="output">
        {
          Reflect.ownKeys(this.state.result).length > 0 ? (
            <Fragment>
              <h4>Name: {this.state.result.pokemon.name.charAt(0).toUpperCase()}{this.state.result.pokemon.name.slice(1)}</h4>
              <h4>ID: {this.state.result.pokemon.id}</h4>
              <img src={this.state.result.pokemon.sprites.front_default} alt={this.state.result.pokemon.name}/>
            </Fragment>
          ) : <Fragment><h4>No Pokemon.</h4></Fragment>
        }
        </div>
      </div>
    );
  }
}

export default App;
