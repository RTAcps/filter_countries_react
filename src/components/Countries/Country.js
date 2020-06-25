import React, { Component } from 'react';
import { formatNumber } from '../../components/helpers/formatHelpers';

import css from './countries.module.css';

export default class Country extends Component {
  render() {
    const { country } = this.props;
    const { name, flag, capital, population } = country;

    return (
      <div className={`${css.country} ${css.border}`}>
        <img className={css.flag} src={flag} alt={name} />
        <span className={css.countryName}>{name}</span>
        <span className={css.countryName}>{capital}</span>
        <span className={css.countryName}>{formatNumber(population)}</span>
      </div>
    );
  }
}
