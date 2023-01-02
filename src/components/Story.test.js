import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Story from 'components/Story';
import Api from 'utils/Api';

import userEvent from '@testing-library/user-event';
const user = userEvent.setup();

const api = new Api('http://localhost:3000');
const apiFailingRoute = new Api('http://localhost:3000/apis');

describe('<Story>', () => {
  const mockVerb = 'play';
  const partOfSpeech = 'verb';

  const consoleLog = console.log;
  const consoleError = console.error;

  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
  });
  afterEach(() => {
    console.log = consoleLog;
    console.error = consoleError;
  });
  it('fails to call API', async () => {
    const { container } = render(<Story api={apiFailingRoute} />);

    try {
      const spinner = await container.querySelector('.spinner');
      const errorBoundary = await screen.findByTestId('errorboundary');

      expect(spinner).toHaveClass('spinner');
      expect(errorBoundary).toBeVisible();
    } catch (error) {
      expect(() =>
        container.toThrow(/Error\: Uncaught \[Error: Unhandled request/)
      );
    }
  });

  it('renders after successful call to API', async () => {
    const { container } = render(<Story api={api} />);
    const input = await screen.findByPlaceholderText(partOfSpeech);
    const missing = await screen.findByTestId('missing');
    const dataType = container
      .querySelector('[data-type]')
      .getAttribute('data-type');

    expect(dataType).toBe(partOfSpeech);
    expect(missing).toHaveTextContent('1');
    expect(input).toBeInTheDocument();
  });

  it('[add word] renders entire story when user inputs all missing words.', async () => {
    const { container } = render(<Story api={api} />);
    const input = await screen.findByPlaceholderText(partOfSpeech);
    const missing = await screen.findByTestId('missing');

    await user.type(input, mockVerb);
    await fireEvent.keyDown(input, { keyCode: 13 });
    const word = screen.getByText('Do');

    expect(input).toHaveValue(mockVerb);
    expect(missing).not.toBeVisible();
    expect(word).toBeInTheDocument();
    expect(word).toHaveClass('word');
  });

  it('[delete word] renders missing count if user deletes an existing word.', async () => {
    const { container } = render(<Story api={api} />);
    const input = await screen.findByPlaceholderText(partOfSpeech);
    const missing = await screen.findByTestId('missing');

    await user.type(input, mockVerb);
    await fireEvent.keyDown(input, { keyCode: 13 });
    expect(screen.getByText(mockVerb)).toBeInTheDocument();
    expect(missing).not.toBeVisible();

    const filled = container.querySelector('[data-type=verb] em.blank');
    await fireEvent.click(filled);

    const unfilled = await screen.findByPlaceholderText(partOfSpeech);
    await user.clear(unfilled);
    await fireEvent.keyDown(unfilled, { keyCode: 13 });
    expect(missing).toHaveTextContent('1');
  });

  it('[update word] renders updated missing words.', async () => {
    const { container } = render(<Story api={api} />);
    const input = await screen.findByPlaceholderText(partOfSpeech);

    await user.type(input, mockVerb);
    await fireEvent.keyDown(input, { keyCode: 13 });
    expect(screen.getByText(mockVerb)).toBeInTheDocument();

    const filled = container.querySelector(
      `[data-type=${partOfSpeech}] em.blank`
    );
    await fireEvent.click(filled);

    const unfilled = await screen.findByPlaceholderText(partOfSpeech);
    await user.type(unfilled, 's');
    await fireEvent.keyDown(unfilled, { keyCode: 13 });

    expect(screen.getByText(mockVerb + 's')).toBeInTheDocument();
  });
});
