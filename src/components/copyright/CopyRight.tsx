import { Link, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Copyright() {
  const { t } = useTranslation();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {t('copyright')}
      {' © '}
      <Link color="inherit" href="/">
        {t('application name')}
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
