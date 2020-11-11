import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

type ToolbarProps = {
  className?: string;
  resourceName: string;
  resourceCreateLink: string;
};

const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  className,
  resourceName,
  resourceCreateLink,
}: ToolbarProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const gotoAddResource = () => {
    navigate(resourceCreateLink);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={gotoAddResource}>
          Add {resourceName}
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder={`Search ${resourceName}`}
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.defaultProps = {
  className: '',
};

export default Toolbar;
