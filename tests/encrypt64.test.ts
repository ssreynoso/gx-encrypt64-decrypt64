// tests/encrypt64.test.ts
import { describe, expect, it } from 'vitest'
import { encrypt64, decrypt64 } from '../src/index'

describe('encrypt64 / decrypt64', () => {
    const key = '21972247ba444455360dbf70c8fa2e0e'

    it('debe encriptar y desencriptar correctamente una cadena simple', () => {
        const original = 'Hola mundo'
        const encrypted = encrypt64(original, key)
        const decrypted = decrypt64(encrypted, key)
        expect(decrypted).toBe(original)
    })

    it('debe funcionar con texto vacío', () => {
        const original = ''
        const encrypted = encrypt64(original, key)
        const decrypted = decrypt64(encrypted, key)
        expect(decrypted).toBe(original)
    })

    it('debe lanzar error si la clave es inválida', () => {
        expect(() => encrypt64('Hola', 'claveinvalida')).toThrow()
    })
})
