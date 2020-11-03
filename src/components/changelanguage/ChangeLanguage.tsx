import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import i18n from '../../i18n/i18n';

export default function ChangeLanguage() {
  const [lang, setLang] = useState('bn');
  const langItems = [
    {
      display: 'বাংলা',
      value: 'bn',
    },
    {
      display: 'English',
      value: 'en',
    },
  ];

  const changeLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string);
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <FormControl>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={lang}
        onChange={changeLanguage}
      >
        {langItems.map(({ value, display }) => (
          <MenuItem key={value} value={value}>
            {display}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
