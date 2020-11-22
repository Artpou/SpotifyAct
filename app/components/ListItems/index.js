/**
 *
 * ListItems
 *
 */
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import GridIcon from '@material-ui/icons/Apps';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { Link } from 'react-router-dom';
import ListCards from '../ListItemsCard';
import ListRows from '../ListItemsRow';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
  },
  list: {
    paddingBottom: theme.spacing(8),
  },
  footer: {
    padding: theme.spacing(4),
    textAlign: 'center',
    background: '#121212',
  },
  toggleButton: {
    color: '#fff',
  },
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
    <div className={classes.list} maxWidth="md">
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          {props.link ? (
            <Link to={props.link} className={classes.link}>
              <h2>
                Nouveaux {props.name} ({props.list.length})
              </h2>
            </Link>
          ) : (
            <h2>
              Nouveaux {props.name} ({props.list.length})
            </h2>
          )}
        </div>
        {resultList}
      </div>
      <hr />
      {displayList === 'grid' ? (
        <ListCards list={props.list} datas={props.datas} reduced={props.reduced} />
      ) : (
        <ListRows list={props.list} datas={props.datas} reduced={props.reduced} />
      )}
      {props.reduced && (
        <div className={classes.footer}>
          <Link to={props.link}>
            <h3>Voir les {props.list.length} nouveaux {props.name}</h3>
          </Link>
        </div>
      )}
    </div>
  );
}
