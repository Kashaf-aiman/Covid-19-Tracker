import React,{useEffect,useState} from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import styles from './CountryPicker.module.css'

import {countries} from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
  const[fetchedCountries,setFetchedCountries] = useState([]);

  useEffect(() => {

    const fetchCountries = async() => {
        setFetchedCountries(await countries());
    }
    fetchCountries();
  },[setFetchedCountries]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect default=""  onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="" >Global</option>
        {fetchedCountries.map((country, i )=> <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker;