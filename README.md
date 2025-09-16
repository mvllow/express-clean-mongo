# express-clean-mongo

> Express middleware to clean MongoDB requests

## Install

```sh
npm install express-clean-mongo
```

## Usage

```js
import express from "express";
import { cleanMongoMiddleware } from "express-clean-mongo";

const app = express();

app.use(express.json());
app.use(cleanMongoMiddleware);

app.post("/submit", (req, res) => {
	res.json({ cleaned: req.body });
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
```
