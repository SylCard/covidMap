import React from 'react';
import { createStyles, makeStyles, Theme, WithStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    select: {
    '&:before': {
        borderColor: 'white',
    },
    '&:after': {
        borderColor: 'white',
    }
    }
  }),
);

type SelectProps = {
  data: string[],
  handleCountryChange(country: string): void,
  country: string
}

export default function CountrySelect(props:SelectProps) {
  const classes = useStyles();
  // const [country, setCountry] = React.useState('United Kingdom');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
   // setCountry(event.target.value as string);
   props.handleCountryChange(event.target.value as string);
  };

  return (
    <FormControl className={classes.formControl}>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            className={classes.select}
            labelId="country-label"
            id="country-simple-select"
            value={props.country}
            onChange={handleChange}
          >
          {props.data.map((i) => <MenuItem value={i}>{i}</MenuItem>)}
          </Select>
    </FormControl>
  );
}
