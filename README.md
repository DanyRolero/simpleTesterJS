# simpleTesterJS

simpleTesterJS es una pequeña aplicación para realizar pruebas unitarias en JavaScript.
Permite realizar distintas aserciones y obtener resultados detallados de cada test.

## Características

- Aserciones básicas: `assertTrue`, `assertFalse`, `assertEqual`, `assertError`
- Gestión de errores personalizados
- Resultados detallados de pruebas
- Salida de mensajes de colores para mayor claridad  

## Instalación

Para usar TesterJS, simplemente clona este repositorio en tu máquina local:

```bash
git clone https://github.com/DanyRolero/simpleTesterJS
```

## Uso

### 1. Crear una clase de pruebas
Crea una clase que extienda `Tester` y define tus métodos de prueba.  
Los métodos de prueba deben comenzar con la palabra `test`.

``` javascript
class MiPrueba extends Tester {
    test_example() {
        this.assertTrue("Check de ejemplo", true);
    }
    
    test_example2() {
        this.assertTrue("Check de ejemplo 2", true);
    }

    test_error() {
        this.assertError("Check de error", new Error("Test error"), () => { throw new Error("Test error"); });
    }
}
```

### 2. Ejecutar las pruebas
Crea una instancia de tu clase de pruebas y ejecuta las pruebas

``` javascript
const pruebas = new MiPrueba();
pruebas.startAllTest(true); // 'true' para mostrar detalles de cada prueba

```

### 3. Métodos de Aserción

- `assertTrue(label, actual)`: Verifica que el valor actual sea true.
- `assertFalse(label, actual)`: Verifica que el valor actual sea false.
- `assertEqual(label, actual, expected)`: Verifica que el valor actual sea igual al valor expected.
- `assertError(label, errorExpected, func, ...args)`: Verifica que la función func lance el error errorExpected.

### 4. Ejemplo completo
``` javascript

class MiPrueba extends Tester {
    test_example() {
        this.assertTrue("Check de ejemplo", true);
    }
    
    test_example2() {
        this.assertTrue("Check de ejemplo 2", true);
    }

    test_error() {
        this.assertError("Check de error", new Error("Test error"), () => { throw new Error("Test error"); });
    }
}

const pruebas = new MiPrueba();
pruebas.startAllTest(true);

```

## API

### Clase `Tester`

Métodos Públicos
- `startTest(testMethod, details = false)`: Inicia un test específico.
- `startAllTest(details = false)`: Inicia todos los tests definidos en la clase.


Métodos de Aserción
- `assertTrue(label, actual)`: Verifica que `actual` sea verdadero.
- `assertFalse(label, actual)`: Verifica que `actual` sea falso.
- `assertEqual(label, actual, expected)`: Verifica que `actual` sea igual a `expected`.
- `assertError(label, errorExpected, func, ...args)`: Verifica que una función arroje un error específico.

---

### Clase `TestCheck`

Constructor
- TestCheck(label, actual, expected): Crea una nueva instancia de TestCheck.

---

### Clase `UnitTest`

Métodos Públicos
- `addCheck(check)`: Agrega un chequeo a la lista de chequeos.
- `setResult()`: Establece el resultado de la prueba unitaria.

---

### Clase TestetMessageWriter

Métodos Públicos
- `setTesterHeader()`: Genera el mensaje de cabecera para el inicio de las pruebas.
- `setUnitTestMessage(unitTest)`: Genera el mensaje para el resultado de una prueba unitaria.
- `showAllChecksOnConsole(unitTest)`: Muestra todos los chequeos de una prueba unitaria en la consola.


## Contribuciones
Las contribuciones son bienvenidas. Si encuentras un error o tienes una mejora no dudes en abrir un issue o enviar un pull request.