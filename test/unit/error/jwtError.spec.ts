import { describe, expect, test } from 'bun:test';

import { JwtError } from '#/error/jwtError';

describe('JwtPluginError', () => {
	describe('constructor', () => {
		test('should create a new JwtPluginError instance with specific properties when valid options are provided', () => {
			const jwtPluginError = new JwtError<{ details: string }>({
				message: 'error.jwt.validation',
				httpStatusCode: 401,
				cause: { details: 'Invalid token signature' }
			});

			expect(jwtPluginError).toBeInstanceOf(JwtError);
			expect(jwtPluginError).toBeInstanceOf(Error);
			expect(jwtPluginError.uuid).toBeTypeOf('string');
			expect(jwtPluginError.uuid).toHaveLength(36); // UUID v7 length
			expect(jwtPluginError.date).toBeInstanceOf(Date);
			expect(jwtPluginError.httpStatusCode).toBe(401);
			expect(jwtPluginError.cause).toEqual({ details: 'Invalid token signature' });
			expect(jwtPluginError.message).toBe('error.jwt.validation');
			expect(jwtPluginError.name).toBe('JwtError');
			expect(jwtPluginError.stack).toBeTypeOf('string');
		});

		test('should create a new JwtPluginError instance with default properties when no options are provided', () => {
			const jwtPluginError = new JwtError();

			expect(jwtPluginError).toBeInstanceOf(JwtError);
			expect(jwtPluginError).toBeInstanceOf(Error);
			expect(jwtPluginError.uuid).toBeTypeOf('string');
			expect(jwtPluginError.uuid).toHaveLength(36); // UUID v7 length
			expect(jwtPluginError.date).toBeInstanceOf(Date);
			expect(jwtPluginError.httpStatusCode).toBe(500);
			expect(jwtPluginError.cause).toBeUndefined();
			expect(jwtPluginError.message).toBe('');
			expect(jwtPluginError.name).toBe('JwtError');
			expect(jwtPluginError.stack).toBeTypeOf('string');
		});

		test('should create a new JwtPluginError instance with partial options', () => {
			const jwtPluginError = new JwtError({
				message: 'Token expired',
				httpStatusCode: 403
			});

			expect(jwtPluginError).toBeInstanceOf(JwtError);
			expect(jwtPluginError.message).toBe('Token expired');
			expect(jwtPluginError.httpStatusCode).toBe(403);
			expect(jwtPluginError.cause).toBeUndefined();
		});

		test('should generate unique UUIDs for different instances', () => {
			const error1 = new JwtError({ message: 'Error 1' });
			const error2 = new JwtError({ message: 'Error 2' });

			expect(error1.uuid).not.toBe(error2.uuid);
		});

		test('should generate different dates for instances created at different times', async () => {
			const error1 = new JwtError({ message: 'Error 1' });

			// Wait a small amount of time to ensure different timestamps
			await new Promise((resolve) => setTimeout(resolve, 1));

			const error2 = new JwtError({ message: 'Error 2' });

			expect(error1.date.getTime()).not.toBe(error2.date.getTime());
		});

		test('should preserve the original Error properties', () => {
			const originalError = new Error('Original error');
			const jwtPluginError = new JwtError({
				message: 'Wrapped error',
				cause: originalError
			});

			expect(jwtPluginError.cause).toBe(originalError);
			expect(jwtPluginError.stack).toContain('JwtError');
		});
	});

	describe('getters', () => {
		test('should return correct values from getters', () => {
			const jwtPluginError = new JwtError({
				message: 'test.key',

				httpStatusCode: 400,
				cause: 'test cause'
			});

			expect(jwtPluginError.uuid).toBeTypeOf('string');
			expect(jwtPluginError.date).toBeInstanceOf(Date);
			expect(jwtPluginError.httpStatusCode).toBe(400);
		});

		test('should return immutable values', () => {
			const jwtPluginError = new JwtError({
				message: 'test.key',
				httpStatusCode: 400
			});

			const originalUuid = jwtPluginError.uuid;
			const originalDate = jwtPluginError.date;
			const originalHttpStatusCode = jwtPluginError.httpStatusCode;

			// Verify that getters return the same values
			expect(jwtPluginError.uuid).toBe(originalUuid);
			expect(jwtPluginError.date).toBe(originalDate);
			expect(jwtPluginError.httpStatusCode).toBe(originalHttpStatusCode);
		});
	});
});
