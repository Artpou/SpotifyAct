/**
 *
 * ListItems
 *
 */
import React, { useState } from 'react';
import { Container } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import GridIcon from '@material-ui/icons/Apps';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import ListCards from '../ListItemsCard';
import ListRows from '../ListItemsRow';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  toggleButton: {
    color: '#fff',
  }
}));

export default function ListItems(props) {
  const classes = useStyles();
  const [displayList, setDisplayList] = useState('grid');

  const handleDisplayList = (event, value) => {
    if (value) {
      setDisplayList(value);
    }
  };

  const resultList = (
    <ToggleButtonGroup
      value={displayList}
      exclusive
      onChange={handleDisplayList}
      aria-label="text alignment"
    >
      <ToggleButton
        className={classes.toggleButton}
        value="list"
        checked={displayList === 'list'}
      >
        <ListIcon className={classes.icon} />
      </ToggleButton>
      <ToggleButton
        className={classes.toggleButton}
        value="grid"
        checked={displayList === 'grid'}
      >
        <GridIcon className={classes.icon} />
      </ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <div className={classes.cardGrid} maxWidth="md">
      <div className={classes.header}>
        <h2>Nouveaux {props.name} ({props.list.length})</h2>
        {resultList}
      </div>
      <hr />
      {displayList === 'grid' ? (
        <ListCards list={props.list} max={props.max} reduced={props.reduced} />
      ) : (
        <ListRows list={props.list} max={props.max} reduced={props.reduced} />
      )}
    </div>
  );
}
