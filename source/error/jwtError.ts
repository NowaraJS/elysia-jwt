import { randomUUIDv7 } from 'bun';

import type { JwtErrorOptions } from './types/JwtErrorOptions';

export class JwtError<const T = unknown> extends Error {
	public override readonly cause: T | undefined;

	private readonly _uuid: string = randomUUIDv7();

	private readonly _date: Date = new Date();

	private readonly _httpStatusCode: number;

	public constructor(jwtErrorOptions?: Readonly<JwtErrorOptions<T>>) {
		super(jwtErrorOptions?.message);
		super.name = 'JwtError';
		this.cause = jwtErrorOptions?.cause;
		this._httpStatusCode = jwtErrorOptions?.httpStatusCode || 500;
	}

	public get uuid(): string {
		return this._uuid;
	}

	public get date(): Date {
		return this._date;
	}

	public get httpStatusCode(): number {
		return this._httpStatusCode;
	}
}
