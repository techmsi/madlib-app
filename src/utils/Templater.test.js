const { Templater } = require('./Templater');
import { mockApiResponse } from 'mocks/mockApiResponse';

describe('Templater', () => {
  const mockStory = 'Do you {verb}?';
  it('parses given text', () => {
    const parser = new Templater(mockStory);
    expect(parser.text).toEqual(mockStory);
    expect(parser.getTemplateRegex()).toEqual(parser.blankRegex);
    expect(parser.countBlanks()).toEqual(1);
    expect(parser.getBlanks()).toEqual(mockApiResponse.blanks);
    expect(parser.isBlank('{verb}')).toEqual(true);
    expect(parser.wordArray()).toEqual(mockApiResponse.words);
  });
});
