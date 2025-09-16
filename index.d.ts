declare module "index" {
    /**
     * Recursively removes unsafe MongoDB keys from objects and arrays.
     *
     * @param {any} value - Input data (object, array, or primitive)
     * @returns {any} - Cleaned copy with unsafe keys removed
     */
    export function cleanMongoKeys(value: any): any;
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
    export function cleanMongoMiddleware(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): void;
}
