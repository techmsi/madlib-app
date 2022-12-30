import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

import Story from 'components/Story';
import Api from 'utils/Api';

const appContainer = document.getElementById('react-container');
const root = createRoot(appContainer);
const api = new Api('http://localhost:3000/api');

root.render(
  <React.StrictMode>
    <Story api={api} />
  </React.StrictMode>
);
