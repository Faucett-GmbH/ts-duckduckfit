import { Encoder, decode as cborXdecode } from "cbor-x"

export function toArrayBuffer(bytes: Uint8Array) {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

const ENCODER = new Encoder({ tagUint8Array: false, useRecords: false });

export function encode(obj: unknown): Buffer {
  return ENCODER.encode(obj)
}

export function decode<T = unknown>(buf: Buffer | Uint8Array): T {
  return cborXdecode(buf)
}