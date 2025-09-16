/**
 * Recursively removes unsafe MongoDB keys from objects and arrays.
 *
 * @param {any} value - Input data (object, array, or primitive)
 * @returns {any} - Cleaned copy with unsafe keys removed
 */
function cleanMongoKeys(value) {
	if (Array.isArray(value)) {
		return value.map(cleanMongoKeys);
	}

	if (value !== null && typeof value === "object") {
		/** @type {Record<string, any>} */
		const cleaned = {};

		for (const [key, val] of Object.entries(value)) {
			if (!key.startsWith("$") && !key.includes(".")) {
				cleaned[key] = cleanMongoKeys(val);
			}
		}

		return cleaned;
	}

	return value;
}

/**
 * Express middleware that removes unsafe MongoDB keys from incoming requests.
 *
 * Strips keys that:
 *   - Start with `$` (e.g., `$gt`, `$ne`)
 *   - Contain `.` (MongoDB does not allow dots in keys)
 *
 * Applies cleaning to:
 *   - `req.body`
 *   - `req.query`
 *   - `req.params`
 *   - `req.headers`
 *
 * Helps prevent MongoDB operator injection attacks.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function cleanMongoMiddleware(req, res, next) {
	req.body = cleanMongoKeys(req.body);
	req.query = cleanMongoKeys(req.query);
	req.params = cleanMongoKeys(req.params);
	req.headers = cleanMongoKeys(req.headers);

	next();
}

module.exports = {
	cleanMongoKeys,
	cleanMongoMiddleware,
};
