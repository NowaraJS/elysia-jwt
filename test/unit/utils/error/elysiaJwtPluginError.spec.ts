import { describe, expect, test } from 'bun:test';

import { ElysiaJwtPluginError } from '#/utils/error/elysiaJwtPluginError';

describe('ElysiaJwtPluginError', () => {
	describe('constructor', () => {
		test('should create a new ElysiaJwtPluginError instance with specific properties when valid options are provided', () => {
			const elysiaJwtPluginError = new ElysiaJwtPluginError<{ details: string }>({
				message: 'JWT validation failed',
				key: 'error.jwt.validation',
				httpStatusCode: 401,
				cause: { details: 'Invalid token signature' }
			});

			expect(elysiaJwtPluginError).toBeInstanceOf(ElysiaJwtPluginError);
			expect(elysiaJwtPluginError).toBeInstanceOf(Error);
			expect(elysiaJwtPluginError.uuid).toBeTypeOf('string');
			expect(elysiaJwtPluginError.uuid).toHaveLength(36); // UUID v7 length
			expect(elysiaJwtPluginError.date).toBeInstanceOf(Date);
			expect(elysiaJwtPluginError.key).toBe('error.jwt.validation');
			expect(elysiaJwtPluginError.httpStatusCode).toBe(401);
			expect(elysiaJwtPluginError.cause).toEqual({ details: 'Invalid token signature' });
			expect(elysiaJwtPluginError.message).toBe('JWT validation failed');
			expect(elysiaJwtPluginError.name).toBe('ElysiaJwtPluginError');
			expect(elysiaJwtPluginError.stack).toBeTypeOf('string');
		});

		test('should create a new ElysiaJwtPluginError instance with default properties when no options are provided', () => {
			const elysiaJwtPluginError = new ElysiaJwtPluginError();

			expect(elysiaJwtPluginError).toBeInstanceOf(ElysiaJwtPluginError);
			expect(elysiaJwtPluginError).toBeInstanceOf(Error);
			expect(elysiaJwtPluginError.uuid).toBeTypeOf('string');
			expect(elysiaJwtPluginError.uuid).toHaveLength(36); // UUID v7 length
			expect(elysiaJwtPluginError.date).toBeInstanceOf(Date);
			expect(elysiaJwtPluginError.key).toBe('');
			expect(elysiaJwtPluginError.httpStatusCode).toBe(500);
			expect(elysiaJwtPluginError.cause).toBeUndefined();
			expect(elysiaJwtPluginError.message).toBe('');
			expect(elysiaJwtPluginError.name).toBe('ElysiaJwtPluginError');
			expect(elysiaJwtPluginError.stack).toBeTypeOf('string');
		});

		test('should create a new ElysiaJwtPluginError instance with partial options', () => {
			const elysiaJwtPluginError = new ElysiaJwtPluginError({
				message: 'Token expired',
				httpStatusCode: 403
			});

			expect(elysiaJwtPluginError).toBeInstanceOf(ElysiaJwtPluginError);
			expect(elysiaJwtPluginError.message).toBe('Token expired');
			expect(elysiaJwtPluginError.key).toBe('');
			expect(elysiaJwtPluginError.httpStatusCode).toBe(403);
			expect(elysiaJwtPluginError.cause).toBeUndefined();
		});

		test('should generate unique UUIDs for different instances', () => {
			const error1 = new ElysiaJwtPluginError({ message: 'Error 1' });
			const error2 = new ElysiaJwtPluginError({ message: 'Error 2' });

			expect(error1.uuid).not.toBe(error2.uuid);
		});

		test('should generate different dates for instances created at different times', async () => {
			const error1 = new ElysiaJwtPluginError({ message: 'Error 1' });

			// Wait a small amount of time to ensure different timestamps
			await new Promise((resolve) => setTimeout(resolve, 1));

			const error2 = new ElysiaJwtPluginError({ message: 'Error 2' });

			expect(error1.date.getTime()).not.toBe(error2.date.getTime());
		});

		test('should preserve the original Error properties', () => {
			const originalError = new Error('Original error');
			const elysiaJwtPluginError = new ElysiaJwtPluginError({
				message: 'Wrapped error',
				cause: originalError
			});

			expect(elysiaJwtPluginError.cause).toBe(originalError);
			expect(elysiaJwtPluginError.stack).toContain('ElysiaJwtPluginError');
		});
	});

	describe('getters', () => {
		test('should return correct values from getters', () => {
			const elysiaJwtPluginError = new ElysiaJwtPluginError({
				message: 'Test message',
				key: 'test.key',
				httpStatusCode: 400,
				cause: 'test cause'
			});

			expect(elysiaJwtPluginError.uuid).toBeTypeOf('string');
			expect(elysiaJwtPluginError.date).toBeInstanceOf(Date);
			expect(elysiaJwtPluginError.key).toBe('test.key');
			expect(elysiaJwtPluginError.httpStatusCode).toBe(400);
		});

		test('should return immutable values', () => {
			const elysiaJwtPluginError = new ElysiaJwtPluginError({
				message: 'Test message',
				key: 'test.key',
				httpStatusCode: 400
			});

			const originalUuid = elysiaJwtPluginError.uuid;
			const originalDate = elysiaJwtPluginError.date;
			const originalKey = elysiaJwtPluginError.key;
			const originalHttpStatusCode = elysiaJwtPluginError.httpStatusCode;

			// Verify that getters return the same values
			expect(elysiaJwtPluginError.uuid).toBe(originalUuid);
			expect(elysiaJwtPluginError.date).toBe(originalDate);
			expect(elysiaJwtPluginError.key).toBe(originalKey);
			expect(elysiaJwtPluginError.httpStatusCode).toBe(originalHttpStatusCode);
		});
	});
});
