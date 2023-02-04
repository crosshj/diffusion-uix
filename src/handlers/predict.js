const modifyResponse = require("../utils/proxy-response-rewrite.js");

const handler = (proxyRes, req, res) => {
	const { path } = req;
	const encoding = proxyRes.headers["content-encoding"];
	modifyResponse(res, encoding, function (body) {
		if (!body) return body;
		const parsedBody = JSON.parse(body);
		//console.log(parsedBody);

		const resBody = JSON.stringify(parsedBody);
		if (resBody.length !== body.length) {
			console.log("\n" + path);
			console.log(`length changed from ${body.length} to ${resBody.length}`);
			console.log(encoding + " encoding");
		}
		// TODO: enable this when content length header is set properly
		// return resBody;
		return body;
	});
};
module.exports = handler;
