class ExampleTester extends Tester {
    test_example() {
        this._assertTrue("Check de ejemplo", true);
        this._assertFalse("Test de prueba", false);
        this._assertEqual('Salida cácluclo', (2 + 4), 6);
        this._assertError('Error esperado', new Error('Error normalito'), this._errorMethod.bind(this));
    }
    
    //-----------------------------------------------------------------------------
    test_example2() {
        this._assertTrue("Check de ejemplo 2", true);
        this._assertFalse("Test de prueba", false);
        this._assertEqual('Salida cálculo', (2 + 4), 6);
        this._assertError('Error esperado', new Error('Error normalito'), this._errorMethod.bind(this));
    }

    _errorMethod() {
        throw new Error('Error normalito');
    }

    
    _errorMethod() {
        throw new Error('Error normalito');
    }
}