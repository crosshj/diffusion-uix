const SD_UI_URL = "http://127.0.0.1:7860/";

const express = require("express");
const httpProxy = require("http-proxy");

const predictHandler = require("./handlers/predict.js");
const configHandler = require("./handlers/config.js");

const app = express();
const proxy = httpProxy.createProxyServer();

// proxy.listen(8001);
// proxy.on("error", (err, req, res) => {
// 	res.writeHead(500, {
// 		"Content-Type": "text/plain",
// 	});
// });

proxy.on("proxyRes", (proxyRes, req, res) => {
	const { path } = req;
	if (path.includes("/run/predict/")) {
		predictHandler(proxyRes, req, res);
	}
	if (path.includes("/config")) {
		configHandler(proxyRes, req, res);
	}
	//proxyRes.setHeader("X-Special-Proxy-Header", "foobar");
});

app.all("/*", (req, res) => proxy.web(req, res, { target: SD_UI_URL }));

app.listen(3000, () => {
	console.log("Listening on: http://localhost:3000");
});
