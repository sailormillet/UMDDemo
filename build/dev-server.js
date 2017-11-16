'use strict'
const webpack = require("webpack");
const express = require('express');//路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求
const fs = require('fs');//Node.js内置的fs模块就是文件系统模块，负责读写文件。
const app = express()
// const port;
const webpackconfig = require('./webpack.dev.config');
webpackconfig(app);

app.use(express.static('./static'));