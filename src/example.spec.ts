function addNumbers(num1, num2) {
  return num1 + num2;
}

describe('Example test', () => {
  it('should equals true', () => {
    expect(true).toEqual(true);
    expect('Yuri').toEqual('Yuri');
  });
});

describe('addNumbers', () => {
  it('adds two numbers', () => {
    expect(addNumbers(2, 2)).toEqual(4);
  });
});
