"use strict";

//---------------------------------------------------------------------------------
// CLASS TESTER
//---------------------------------------------------------------------------------
class Tester {

    _unitTestList = [];
    _messageWriter = new TesterMessageWriter(this);
    _testOutputHandler = new TestOutputHandler(this._messageWriter);
    
    //-----------------------------------------------------------------------------
    // 2. ASSERT METHODS
    //-----------------------------------------------------------------------------
    _assertTrue(label, actual) {
        this._assert(label, actual, true);
    }
    
    //-----------------------------------------------------------------------------
    _assertFalse(label, actual) {
        this._assert(label, actual, false);
    }
    
    //-----------------------------------------------------------------------------
    _assertEqual(label, actual, expected) {
        this._assert(label, actual, expected);
    }
    
    //-----------------------------------------------------------------------------
    _assertError(label, errorExpected, func, ...args) {
        let actual;
        let expected = this._comparableErrorString(errorExpected);
        
        try {
            func(...args);
            actual = "No Error Thrown";
        } catch (error) {
            actual = this._comparableErrorString(error);
        }
        
        this._assert(label, actual, expected);
    }

    
    //-----------------------------------------------------------------------------
    _assert(label, actual, expected) {    
        this._currentUnitTest().addCheck(new TestCheck(label, actual, expected));
    }



    //-----------------------------------------------------------------------------
    // 2. TEST METHODS
    //-----------------------------------------------------------------------------
    startTest(testName, details = false) {
        this._unitTestList = [];
        this._testOutputHandler.outputHeader();

        let testNamesList = this._getTestMethodNamesList();
        
        if(!testNamesList.includes(testName, 0)) {
            this._testOutputHandler.outputNotTestFound();
            this._testOutputHandler.outputclose();
            return;
        }
        
        this._addNewUnitTest(testName);
        this._resolveTest(testName);

        this._testOutputHandler.outputTestResult(this._currentUnitTest());
        if(details) this._testOutputHandler.outputAllChecksResults(this._currentUnitTest());
        this._testOutputHandler.outputclose();
    }

    //-----------------------------------------------------------------------------
    startAllTest(details = false) {
        this._unitTestList = [];
        this._testOutputHandler.outputHeader();

        let testNamesList = this._getTestMethodNamesList();

        if(testNamesList.length == 0) {
            this._testOutputHandler.outputNotTestFound();
            this._testOutputHandler.outputclose();
            return;
        }
    
        testNamesList.forEach((test) => { 
            this._addNewUnitTest(test);
            this._resolveTest(test);
            this._testOutputHandler.outputTestResult(this._currentUnitTest());
            if(details) {
                this._testOutputHandler.outputAllChecksResults(this._currentUnitTest());
                this._testOutputHandler.outputBreakLine();
            }
        });

        if(details) this._testOutputHandler.outputSummaryTest();
        this._testOutputHandler.outputclose();
    }

    //-----------------------------------------------------------------------------
    getUnitTestList() {
        return this._unitTestList;
    }

    

    //-----------------------------------------------------------------------------
    // AUX METHODS
    //-----------------------------------------------------------------------------
    _comparableErrorString(error) {
        return error.constructor.name + " => " + error.name + ": " + error.message;
    }

    _getTestMethodNamesList() {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter((name) => name.startsWith("test"));
    }

    _currentUnitTest() {
        return this._unitTestList.at(-1);
    }

    _addNewUnitTest(testName) {
        this._unitTestList.push(new UnitTest(testName));
    }

    //-----------------------------------------------------------------------------
    _resolveTest(testName) {
        this[testName]();
        this._currentUnitTest().setResult();
    }
}

//---------------------------------------------------------------------------------
// CLASS TEST CHECK
//---------------------------------------------------------------------------------
class TestCheck {
    constructor(label, actual, expected) {
        this.label = label;
        this.actual = actual;
        this.expected = expected;
        this.result = (actual === expected);
    }
}

//---------------------------------------------------------------------------------
// CLASS UNIT TEST
//---------------------------------------------------------------------------------
class UnitTest {
    checkList = [];
    result = false;
    
    constructor(testName) {
        this.name = testName;
    }

    //-----------------------------------------------------------------------------
    addCheck(check) {
        this.checkList.push(check);
    }

    //-----------------------------------------------------------------------------
    setResult() {
        for (let i = 0; i < this.checkList.length; i++) {
            if (!this.checkList[i].result) {
                this.result = false;
                return;
            }
        }

        this.result = true;
    }

}


//---------------------------------------------------------------------------------
//CLASS TEST LOGGER
//---------------------------------------------------------------------------------
class TesterMessageWriter {
    constructor(tester) {
        this.tester = tester;
    }

    //-----------------------------------------------------------------------------
    header() {
        let message = "";
        message += "-----------------------------------------------------------------------------\n";
        message += "Starting testing from " + this.tester.constructor.name + "\n";
        message += "-----------------------------------------------------------------------------\n";
        return message;
    }

    //-----------------------------------------------------------------------------
    close() {
        let message = "";
        message += "-----------------------------------------------------------------------------\n";
        return message;
    }

    //-----------------------------------------------------------------------------
    notTestFound() {
        return this._redMessage('NOT TEST FOUND');
    }

    //-----------------------------------------------------------------------------
    summaryTest() {
        let amountPassTest = this.tester.getUnitTestList().filter((test) => test.result == true).length;

        let message = "";
        message += "-----------------------------------------------------------------------------\n";
        message += 'Test Summary: ';
        message += amountPassTest;
        message += '/';
        message += this.tester.getUnitTestList().length;
        message += ' TOTAL: ';
        message += (Math.round(amountPassTest/this.tester.getUnitTestList().length * 100)) + '%\n';
        message += "-----------------------------------------------------------------------------\n";
        return this._colorMessage("\x1b[33m" ,message);
    }

    //-----------------------------------------------------------------------------
    testResult(unitTest) {
        let message = unitTest.result
            ? this._greenMessage("[PASS] ")
            : this._redMessage("[FAIL] ");
        message += unitTest.name + "()";
        return message
    }

    //-----------------------------------------------------------------------------
    allChecksResults(unitTest) {
        let message = '';
        for (let i = 0; i < unitTest.checkList.length; i++) {
            message += "\t" + this.checkResult(unitTest.checkList[i]) + '\n';
        }
        return message;
    }

    //-----------------------------------------------------------------------------
    checkResult(checkTest) {
        let message = '';
        message += checkTest.result? this._greenMessage('[PASS] ') : this._redMessage('[FAIL] ')
        message += checkTest.label + ' => result ' 
        message += checkTest.result
            ? this._greenMessage(checkTest.actual)
            : this._redMessage(checkTest.actual);
        message += ' expected ';
        message += this._greenMessage(checkTest.expected);
        return message;
    }

    //-----------------------------------------------------------------------------
    _colorMessage(color, message) {
        return color + message + "\x1b[0m";
    }

    //-----------------------------------------------------------------------------
    _greenMessage(message) {
        return this._colorMessage("\x1b[32m",  message);
    }

    //-----------------------------------------------------------------------------
    _redMessage(message) {
        return this._colorMessage("\x1b[31m",  message);
    }
}

//---------------------------------------------------------------------------------
//CLASS TestOutputHandler
//---------------------------------------------------------------------------------
class TestOutputHandler {
    constructor(testerMessageWriter) {
        this.messageWriter = testerMessageWriter;
    }

    //-----------------------------------------------------------------------------
    outputHeader() {
        console.clear();
        console.time('Time test');
        console.log(this.messageWriter.header());
    }

    //-----------------------------------------------------------------------------
    outputNotTestFound() {
        console.log(this.messageWriter.notTestFound());
    }

    //-----------------------------------------------------------------------------
    outputclose() {
        console.log(this.messageWriter.close());
        console.timeEnd('Time test');
    }

    //-----------------------------------------------------------------------------
    outputTestResult(unitTest) {
        console.log(this.messageWriter.testResult(unitTest));
    }

    //-----------------------------------------------------------------------------
    outputSummaryTest() {
        console.log(this.messageWriter.summaryTest());
    }

    //-----------------------------------------------------------------------------
    outputAllChecksResults(unitTest) {
        console.log(this.messageWriter.allChecksResults(unitTest));
    }

    //-----------------------------------------------------------------------------
    outputBreakLine() {
        console.log('\n');
    }

}