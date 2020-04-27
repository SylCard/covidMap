import {ResponsiveLine, Serie } from '@nivo/line';
import LineGraph from './LineGraph';
import CountrySelect from './CountrySelect';
import React, { useEffect, useState } from 'react';

function getCountries(): string[] {
  return ['United Kingdom','United States','China','France'] ;
}




export default function GraphView() {
  const [country, setCountry] = React.useState('United Kingdom');
  const [countries, setCountries] = React.useState<string[]>([]);


  useEffect(() => {
    fetch('/api/countries').then(res => res.json()).then(data => {
      setCountries(data.countries);
    });
  }, []);

  return (
    <React.Fragment>
      <LineGraph selectedCountry={country} />
      <CountrySelect data={countries} country={country} handleCountryChange={setCountry}/>
    </React.Fragment>
  );
}
