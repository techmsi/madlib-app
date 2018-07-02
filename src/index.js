import React from 'react';
import { render } from 'react-dom';

import Story from 'components/Story';

const appContainer = document.getElementById('react-container');

render(<Story />, appContainer);
