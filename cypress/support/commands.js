// https://on.cypress.io/custom-commands
Cypress.Commands.add('prefersColorScheme', (scheme = 'light') => {
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: {
        media: 'page',
        features: [
          {
            name: 'prefers-color-scheme',
            value: scheme,
          },
        ],
      },
    })
  );
});
