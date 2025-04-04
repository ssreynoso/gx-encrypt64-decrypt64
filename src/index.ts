import { twofish as createTwofish } from 'twofish'
const twofish = createTwofish()

// ==================== Helpers ====================

function padToBlockSize(text: string): Uint8Array {
    const blockSize = 16
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    const paddingNeeded = blockSize - (bytes.length % blockSize)
    const paddedBytes = new Uint8Array(bytes.length + paddingNeeded)
    paddedBytes.set(bytes)
    for (let i = bytes.length; i < paddedBytes.length; i++) {
        paddedBytes[i] = 32 // espacio (0x20), igual a GX
    }
    return paddedBytes
}

function unpadText(buffer: Uint8Array): string {
    const decoder = new TextDecoder('utf-8')
    return decoder.decode(buffer).trimEnd()
}

function hexToBytes(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) throw new Error('Clave inválida')
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
    }
    return bytes
}

// ==================== Twofish Wrapper ====================

export function encrypt64(text: string, hexKey: string): string {
    const key = hexToBytes(hexKey)
    const input = padToBlockSize(text)

    const encrypted = new Uint8Array(input.length)
    for (let i = 0; i < input.length; i += 16) {
        const block = input.subarray(i, i + 16)
        const encryptedBlock = twofish.encrypt(key, block)
        encrypted.set(encryptedBlock, i)
    }

    return Buffer.from(encrypted).toString('base64')
}

export function decrypt64(base64Text: string, hexKey: string): string {
    const key = hexToBytes(hexKey)
    const input = Buffer.from(base64Text, 'base64')

    const decrypted = new Uint8Array(input.length)
    for (let i = 0; i < input.length; i += 16) {
        const block = input.subarray(i, i + 16)
        const decryptedBlock = twofish.decrypt(key, block)
        decrypted.set(decryptedBlock, i)
    }

    return unpadText(decrypted)
}
