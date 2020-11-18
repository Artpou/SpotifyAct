/*
 * TestButton Messages
 *
 * This contains all the text for the TestButton component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.TestButton';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TestButton component!',
  },
});
