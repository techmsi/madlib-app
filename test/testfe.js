import { Selector } from 'testcafe';

const url = 'http://localhost:3000/';

fixture`Getting Started testing "Madlib App"`
    .page(url);

test('Enter value for #missing-verb-2', async t => {
  const missingVerbEl = Selector('#missing-verb-2');

  const filename = 'missing-verb-2';
  const phrase = 'play';

  await t
        .typeText(missingVerbEl, phrase)
        .pressKey('enter')
        .takeScreenshot(filename);
});
