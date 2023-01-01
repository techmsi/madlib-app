import './commands';

import { mount } from 'cypress/react18';
import '../../src/style.css';
Cypress.Commands.add('mount', mount);
