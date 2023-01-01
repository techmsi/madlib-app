export const getComputedProperty = (property) => ($el) => {
  const container = window.getComputedStyle($el[0]);
  return container[property];
};

const toRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgb(${[r, g, b].join(', ')})`;
};

const getDuration = (performance) => {
  performance.measure('pageLoad', 'start-loading', 'end-loading');
  const measure = performance.getEntriesByName('pageLoad')[0];
  const duration = measure.duration;
  return { ms: duration, s: (duration / 1000).toFixed(3) };
};

const spinnerEl = '.spinner';
const appEl = '[data-cy-root]';
const API_ENDPOINT_LOCAL = 'http://localhost:3000/api/story';
const darkColor = toRGB('#171b38');
const lightColor = toRGB('#FFFFFF');

describe('Story E2E', () => {
  let data = {
    totalWords: 0,
    totalBlanks: 0,
    status: null,
    response: null,
  };

  const apiSetup = () => {
    cy.request({
      method: 'GET',
      url: API_ENDPOINT_LOCAL,
    }).then(({ status, body: { words, blanks } = {} }) => {
      data = {
        totalWords: words?.length,
        totalBlanks: blanks?.length,
        status,
        response: { words, blanks },
      };

      cy.log(`Words: ${data.totalWords} | Blanks: ${data.totalBlanks}`);
    });
  };

  before(() => {
    Cypress.env('API_ENDPOINT', API_ENDPOINT_LOCAL);
    apiSetup();
  });

  context('[FUNCTIONAL]', () => {
    it('api loads with specified word blanks.', () => {
      expect(data.status).to.eq(200);
    });

    it('page loads with specified word blanks.', () => {
      cy.visit('/');
      cy.get(spinnerEl).should('be.visible');
      cy.intercept(API_ENDPOINT_LOCAL).as('madLibsStory');
      cy.visit('/');
      cy.wait('@madLibsStory', { timeout: 5000 });
      cy.get(spinnerEl).should('not.exist');

      cy.get('[data-testid="missing"]').should(
        'contain.text',
        data.totalBlanks
      );
      const inputs = cy.get(appEl).children('[data-type]');
      inputs.should('have.length', data.totalBlanks);
    });
  });

  context('[ACCESSIBILITY]', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.injectAxe();
    });

    it('has no detectable a11y violations on load', () => {
      cy.checkA11y();
    });

    it('has valid inputs based on blanks specified', function () {
      const blanks = data.response.words.filter(({ blank }) => !!blank);

      cy.get(appEl)
        .children('[data-type]')
        .each(($span, index, collection) => {
          const input = cy.wrap($span).get('input');
          const partOfSpeech = blanks[index].strippedWord;
          input.invoke('attr', 'placeholder').should('to.be', partOfSpeech);
        });
      cy.checkA11y();
    });

    it('should be accessible for "dark" theme', () => {
      cy.prefersColorScheme('dark');
      cy.get(appEl)
        .then(getComputedProperty('background-color'))
        .should('equal', darkColor);

      cy.injectAxe();
      cy.checkA11y();
    });

    it('should be accessible for "light" theme', () => {
      cy.prefersColorScheme('light');
      cy.get(appEl)
        .then(getComputedProperty('background-color'))
        .should('equal', lightColor);
      cy.injectAxe();
      cy.checkA11y();
    });
  });

  context('[PERFORMANCE]', () => {
    it('measures page load on the home page', () => {
      cy.visit('/', {
        onBeforeLoad: (win) => {
          win.performance.mark('start-loading');
        },
      })
        .its('performance')
        .then((performance) => {
          cy.get('.hint')
            .should('contain.text', 'Hint')
            .then(() => performance.mark('end-loading'))
            .then(() => {
              const { ms, s } = getDuration(performance);
              assert.isAtMost(ms, 5000);
              cy.log(`[PERFORMANCE] Page load duration for HOME: ${s} seconds`);
            });
        });
    });
  });
});
