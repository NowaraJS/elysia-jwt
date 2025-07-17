import { randomUUIDv7 } from 'bun';

import type { ElysiaJwtPluginErrorOptions } from './types/elysiaJwtPluginErrorOptions';

export class ElysiaJwtPluginError<const T = unknown> extends Error {
	public override readonly cause: T | undefined;

	private readonly _uuid: string = randomUUIDv7();

	private readonly _date: Date = new Date();

	private readonly _key: string;

	private readonly _httpStatusCode: number;

	public constructor(elysiaJwtPluginErrorOptions?: Readonly<ElysiaJwtPluginErrorOptions<T>>) {
		super(elysiaJwtPluginErrorOptions?.message);
		super.name = 'ElysiaJwtPluginError';
		this.cause = elysiaJwtPluginErrorOptions?.cause;
		this._key = elysiaJwtPluginErrorOptions?.key || '';
		this._httpStatusCode = elysiaJwtPluginErrorOptions?.httpStatusCode || 500;
	}

	public get uuid(): string {
		return this._uuid;
	}

	public get date(): Date {
		return this._date;
	}

	public get key(): string {
		return this._key;
	}

	public get httpStatusCode(): number {
		return this._httpStatusCode;
	}
}
