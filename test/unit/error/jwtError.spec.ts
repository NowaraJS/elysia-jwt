import { describe, expect, test } from 'bun:test';

import { JwtError } from '#/error/jwtError';

describe('JwtError', () => {
	describe('constructor', () => {
		test('should create a new JwtError instance with specific properties when valid options are provided', () => {
			const jwtError = new JwtError<{ details: string }>({
				message: 'error.jwt.validation',
				httpStatusCode: 401,
				cause: { details: 'Invalid token signature' }
			});

			expect(jwtError).toBeInstanceOf(JwtError);
			expect(jwtError).toBeInstanceOf(Error);
			expect(jwtError.uuid).toBeTypeOf('string');
			expect(jwtError.uuid).toHaveLength(36); // UUID v7 length
			expect(jwtError.date).toBeInstanceOf(Date);
			expect(jwtError.httpStatusCode).toBe(401);
			expect(jwtError.cause).toEqual({ details: 'Invalid token signature' });
			expect(jwtError.message).toBe('error.jwt.validation');
			expect(jwtError.name).toBe('JwtError');
			expect(jwtError.stack).toBeTypeOf('string');
		});

		test('should create a new JwtError instance with default properties when no options are provided', () => {
			const jwtError = new JwtError();

			expect(jwtError).toBeInstanceOf(JwtError);
			expect(jwtError).toBeInstanceOf(Error);
			expect(jwtError.uuid).toBeTypeOf('string');
			expect(jwtError.uuid).toHaveLength(36); // UUID v7 length
			expect(jwtError.date).toBeInstanceOf(Date);
			expect(jwtError.httpStatusCode).toBe(500);
			expect(jwtError.cause).toBeUndefined();
			expect(jwtError.message).toBe('');
			expect(jwtError.name).toBe('JwtError');
			expect(jwtError.stack).toBeTypeOf('string');
		});

		test('should create a new JwtError instance with partial options', () => {
			const jwtError = new JwtError({
				message: 'Token expired',
				httpStatusCode: 403
			});

			expect(jwtError).toBeInstanceOf(JwtError);
			expect(jwtError.message).toBe('Token expired');
			expect(jwtError.httpStatusCode).toBe(403);
			expect(jwtError.cause).toBeUndefined();
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
			const jwtError = new JwtError({
				message: 'Wrapped error',
				cause: originalError
			});

			expect(jwtError.cause).toBe(originalError);
			expect(jwtError.stack).toContain('JwtError');
		});
	});

	describe('getters', () => {
		test('should return correct values from getters', () => {
			const jwtError = new JwtError({
				message: 'test.key',

				httpStatusCode: 400,
				cause: 'test cause'
			});

			expect(jwtError.uuid).toBeTypeOf('string');
			expect(jwtError.date).toBeInstanceOf(Date);
			expect(jwtError.httpStatusCode).toBe(400);
		});

		test('should return immutable values', () => {
			const jwtError = new JwtError({
				message: 'test.key',
				httpStatusCode: 400
			});

			const originalUuid = jwtError.uuid;
			const originalDate = jwtError.date;
			const originalHttpStatusCode = jwtError.httpStatusCode;

			// Verify that getters return the same values
			expect(jwtError.uuid).toBe(originalUuid);
			expect(jwtError.date).toBe(originalDate);
			expect(jwtError.httpStatusCode).toBe(originalHttpStatusCode);
		});
	});
});
