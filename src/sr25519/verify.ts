// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { u8aToU8a } from '@polkadot/util';
import { sr25519Verify as wasmVerify } from '@polkadot/wasm-crypto';

/**
 * @name sr25519Verify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export function sr25519Verify (message: HexString | Uint8Array | string, signature: HexString | Uint8Array | string, publicKey: HexString | Uint8Array | string): boolean {
  const publicKeyU8a = u8aToU8a(publicKey);
  const signatureU8a = u8aToU8a(signature);

  if (publicKeyU8a.length !== 32) {
    throw new Error(`Invalid publicKey, received ${publicKeyU8a.length} bytes, expected 32`);
  } else if (signatureU8a.length !== 64) {
    throw new Error(`Invalid signature, received ${signatureU8a.length} bytes, expected 64`);
  }

  return wasmVerify(signatureU8a, u8aToU8a(message), publicKeyU8a);
}
