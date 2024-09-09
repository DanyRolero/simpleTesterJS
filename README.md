# simpleTesterJS

`simpleTesterJS` is a small application for performing unit tests in JavaScript. It allows various assertions and provides detailed results for each test.

## Features

- Basic assertions: `assertTrue`, `assertFalse`, `assertEqual`, `assertError`
- Custom error handling
- Detailed test results
- Color-coded output messages for better clarity

## Installation

To use simpleTesterJS, simply clone this repository to your local machine:

```bash
git clone https://github.com/DanyRolero/simpleTesterJS
```

## Usage

### 1. Create a Tester Class
Create a class that extends `Tester` and define your test methods.  
Test methods should start with the word `test`.

```javascript
class MyTest extends Tester {
    test_example() {
        this.assertTrue("Example check", true);
    }
    
    test_example2() {
        this.assertTrue("Example check 2", true);
    }

    test_error() {
        this.assertError("Error check", new Error("Test error"), () => { throw new Error("Test error"); });
    }
}
```

### 2. Run the Tests
Create an instance of your test class and run the tests.

```javascript
const tests = new MyTest();
tests.startAllTest(true); // 'true' to show details of each test
```

### 3. Assertion Methods

- `assertTrue(label, actual)`: Verifies that the actual value is true.
- `assertFalse(label, actual)`: Verifies that the actual value is false.
- `assertEqual(label, actual, expected)`: Verifies that the actual value is equal to the expected value.
- `assertError(label, errorExpected, func, ...args)`: Verifies that the function `func` throws the expected error `errorExpected`.

### 4. Complete Example
```javascript
class MyTest extends Tester {
    test_example() {
        this.assertTrue("Example check", true);
    }
    
    test_example2() {
        this.assertTrue("Example check 2", true);
    }

    test_error() {
        this.assertError("Error check", new Error("Test error"), () => { throw new Error("Test error"); });
    }
}

const tests = new MyTest();
tests.startAllTest(true);
```

## API

### Class `Tester`

Public Methods
- `startTest(testMethod, details = false)`: Starts a specific test.
- `startAllTest(details = false)`: Starts all tests defined in the class.

Assertion Methods
- `assertTrue(label, actual)`: Verifies that `actual` is true.
- `assertFalse(label, actual)`: Verifies that `actual` is false.
- `assertEqual(label, actual, expected)`: Verifies that `actual` is equal to `expected`.
- `assertError(label, errorExpected, func, ...args)`: Verifies that a function throws a specific error.

---

### Class `TestCheck`

Constructor
- `TestCheck(label, actual, expected)`: Creates a new instance of `TestCheck`.

---

### Class `UnitTest`

Public Methods
- `addCheck(check)`: Adds a check to the list of checks.
- `setResult()`: Sets the result of the unit test.

---

### Class `TestetMessageWriter`

Public Methods
- `setTesterHeader()`: Generates the header message for the start of the tests.
- `setUnitTestMessage(unitTest)`: Generates the message for the result of a unit test.
- `showAllChecksOnConsole(unitTest)`: Displays all checks of a unit test on the console.

## Contributions

Contributions are welcome. If you find a bug or have an improvement, feel free to open an issue or submit a pull request.