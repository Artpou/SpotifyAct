/**
 *
 * Separator
 *
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   separator: {
//     width: '100%',
//     height: '20px',
//     borderBottom: '1px solid black',
//     textAlign: 'center',
//   },
//   separatorContent: {
//     background: '#fff',
//     padding: '0 10px',
//   },
// }));

const useStyles = makeStyles(theme => ({
  separator: {
    '&::before': {
      content: 'some content',
      display: 'block',
      height: 60,
      marginTop: -60,
    }
  }
}));

function Separator(props) {
  const classes = useStyles();
  return (
    <div className={classes.separator}>Next section</div>
  );
}

Separator.propTypes = {};

export default Separator;
