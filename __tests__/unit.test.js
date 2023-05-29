// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

test('checks for valid phone numbers', () => {
    expect(functions.isPhoneNumber('(858)319-5642')).toBe(true);
    expect(functions.isPhoneNumber('(858)999-4010')).toBe(true);
    expect(functions.isPhoneNumber('(858)abc')).toBe(false);
    expect(functions.isPhoneNumber('(858)674-abcd')).toBe(false);
})

test('checks for valid email id', () => {
    expect(functions.isEmail('anvimittal26@gmail.com')).toBe(true);
    expect(functions.isEmail('mittal@cse.edu')).toBe(true);
    expect(functions.isEmail('hey.gmail.com')).toBe(false);
    expect(functions.isEmail('hey.com')).toBe(false);
})

test('checks if password is strong', () => {
    expect(functions.isStrongPassword('Anvimittal8')).toBe(true);
    expect(functions.isStrongPassword('esfjndhf2635')).toBe(true);
    expect(functions.isStrongPassword('34gfsjfhud')).toBe(false);
    expect(functions.isStrongPassword('atfbsu@675')).toBe(false);
})

test('checks for the correct date format', () => {
    expect(functions.isDate('05/28/2023')).toBe(true);
    expect(functions.isDate('8/26/2003')).toBe(true);
    expect(functions.isDate('5/05/20023')).toBe(false);
    expect(functions.isDate('056/657/2023')).toBe(false);
})

test('checks for valid hex colour', () => {
    expect(functions.isHexColor('FFFFFF')).toBe(true);
    expect(functions.isHexColor('000000')).toBe(true);
    expect(functions.isHexColor('12')).toBe(false);
    expect(functions.isHexColor('ABCD')).toBe(false);
})