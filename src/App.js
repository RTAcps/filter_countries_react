import React, { Component } from 'react';
import Countries from './components/Countries/Countries';
import Header from './components/Header/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '',
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allCountries = json.map(
      ({ name, capital, population, numericCode, flag }) => {
        return {
          id: numericCode,
          name,
          filterName: name.toLowerCase(),
          capital,
          flag,
          population,
        };
      }
    );

    const filteredPopulation = this.calculateTotalPopulationFrom(allCountries);

    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation,
    });
  }

  calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);

    return totalPopulation;
  };

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(
      filteredCountries
    );

    this.setState({
      filteredCountries,
      filteredPopulation,
    });
  };

  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;

    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>Filtro de Países</h1>
        <h5 style={styles.centeredSubTitle}>Nomes estão em inglês</h5>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          totalPopulation={filteredPopulation}
          onChangeFilter={this.handleChangeFilter}
        />

        <Countries countries={filteredCountries} />
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
    fontFamily: 'fantasy',
    color: 'white',
  },
  centeredSubTitle: {
    textAlign: 'center',
    fontFamily: 'fantasy',
    padding: '30px',
    color: '#f03434',
    fontVariant: 'small-caps',
  },
};
