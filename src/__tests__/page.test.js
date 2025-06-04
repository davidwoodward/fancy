const fs = require('fs');
const path = require('path');

describe('county list style', () => {
  test('page.tsx does not include overflow-y-auto on county list', () => {
    const content = fs.readFileSync(path.join(__dirname, '../app/page.tsx'), 'utf8');
    expect(content).not.toMatch(/overflow-y-auto/);
  });
});
