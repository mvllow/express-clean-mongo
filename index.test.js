const test = require("node:test");
const assert = require("assert");
const { cleanMongoKeys, cleanMongoMiddleware } = require("./index.js");

test("cleanMongoKeys removes keys starting with $ and containing .", () => {
	const input = {
		safe: 1,
		$unsafe: 2,
		"dot.key": 3,
		nested: {
			$bad: "remove me",
			good: "keep me",
			arr: [{ $no: "no" }, { yes: "yes" }],
		},
	};

	const expected = {
		safe: 1,
		nested: {
			good: "keep me",
			arr: [{}, { yes: "yes" }],
		},
	};

	const result = cleanMongoKeys(input);
	assert.deepStrictEqual(result, expected);
});

test("cleanMongoMiddleware sanitises req properties", (_, done) => {
	const req = {
		body: { $bad: "bad", good: "ok" },
		query: { "bad.key": "remove", safe: "ok" },
		params: { $param: "bad", param: "good" },
		headers: { "x-header.bad": "no", "x-header-good": "yes" },
	};
	const res = {};
	function next() {
		assert.deepStrictEqual(req.body, { good: "ok" });
		assert.deepStrictEqual(req.query, { safe: "ok" });
		assert.deepStrictEqual(req.params, { param: "good" });
		assert.deepStrictEqual(req.headers, { "x-header-good": "yes" });
		done();
	}

	cleanMongoMiddleware(req, res, next);
});
