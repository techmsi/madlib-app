import React from 'react';
import { BlankSpace } from './Blank';

describe('<BlankSpace>', () => {
  const partOfSpeech = 'verb';
  const mockVerb = 'play';
  const wordEl = `[data-type=${partOfSpeech}] em.blank`;
  const inputEl = 'input';
  const onEdit = () => {};

  beforeEach(() => {
    cy.mount(
      <BlankSpace
        partOfSpeech={partOfSpeech}
        id={`missing-${partOfSpeech}-1`}
        onEdit={onEdit}
      />
    );
  });

  it('[set] renders typed word when edited.', () => {
    cy.get(inputEl).type(mockVerb).type(`{enter}`);
    cy.get(wordEl).should('have.text', mockVerb);
  });

  it('[delete] renders empty text when word deleted.', () => {
    cy.get(inputEl).type(mockVerb).type(`{enter}`);
    cy.get(wordEl).click();

    cy.get(inputEl).type(`{del}{selectall}{backspace}{enter}`);
    cy.get(wordEl).invoke('text').invoke('trim').should('equal', '');
  });

  it('[update] renders updated word when edited.', () => {
    cy.get(inputEl).type(mockVerb).type(`{enter}`);
    cy.get(wordEl).click();
    cy.get(inputEl).type('s').type(`{enter}`);

    const word = cy.get(wordEl);
    word.should('have.text', mockVerb + 's');
  });
});
