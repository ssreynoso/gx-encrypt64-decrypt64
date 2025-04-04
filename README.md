# gx-encrypt64-decrypt64

Encriptación y desencriptación compatible con GeneXus usando el algoritmo **Twofish** y codificación **Base64**.

Este paquete reproduce la lógica de `Encrypt64` y `Decrypt64` usada en GeneXus, permitiendo interoperabilidad con sistemas desarrollados en esa plataforma.

## Instalación

```bash
npm install gx-encrypt64-decrypt64
```

# Uso

```ts
import { encrypt64, decrypt64 } from 'gx-encrypt64-decrypt64'

const text = 'Hola mundo'
const hexKey = '21972247ba570855360dbf70c8fa2e0e' // Clave hexadecimal válida (32 chars para 128 bits)

const encrypted = encrypt64(text, hexKey)
console.log('Encriptado:', encrypted)

const decrypted = decrypt64(encrypted, hexKey)
console.log('Desencriptado:', decrypted)
```

# API

### `encrypt64(text: string, hexKey: string): string`

-   `text`: Texto plano a encriptar.
-   `hexKey`: Clave en formato hexadecimal. Debe tener 16 bytes (32 caracteres hex).
-   Devuelve: Texto encriptado como Base64.

### `decrypt64(base64Text: string, hexKey: string): string`

-   `base64Text`: Texto encriptado en Base64.
-   `hexKey`: Clave en formato hexadecimal (misma que la usada para encriptar).
-   Devuelve: Texto desencriptado.

# Detalles técnicos

-   Algoritmo: Twofish en modo ECB.
-   Tamaño de bloque: 16 bytes.
-   Padding: Se utiliza padding con espacio (0x20) como hace GeneXus.
-   Codificación: Base64.

# Compatibilidad

✔ Compatible con valores generados por `Encrypt64()` y `Decrypt64()` de GeneXus.
