/**
 * Standardized error keys for the Elysia JWT plugin.
 *
 * These keys provide consistent error identification across the plugin,
 * enabling better error handling, logging, and internationalization.
 */
export const jwtErrorKeys = {
	/** Error when JWT secret key is not provided or is empty */
	jwtSecretNotFound: 'elysia.jwt.error.secret_not_found',

	/** Error when JWT signing operation fails */
	jwtSignError: 'elysia.jwt.error.sign_failed',

	/** Error when JWT verification fails due to invalid token */
	jwtVerifyError: 'elysia.jwt.error.verify_failed',

	/** Error when JWT payload is invalid or malformed */
	jwtInvalidPayload: 'elysia.jwt.error.invalid_payload',

	/** Error when JWT configuration is invalid */
	jwtInvalidConfiguration: 'elysia.jwt.error.invalid_configuration'
} as const;

/**
 * Type for JWT error keys to ensure type safety when using error keys.
 */
export type JwtErrorKey = typeof jwtErrorKeys[keyof typeof jwtErrorKeys];