// import * as weechat from "weechat";
// import * as util from "util";
// import { createServer } from "http";
// import { Server } from "socket.io";

// import express from "express";
// import { setTimeout } from "timers/promises";
// const app = express();

const express = require("express");
const app = express();
require('dotenv').config()

app.use(express.static("./public"));
app.use(express.json());

app.listen(3000, () => {
  console.log('listening on *:3000');
});