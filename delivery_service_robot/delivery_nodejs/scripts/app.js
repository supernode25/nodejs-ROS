#!/usr/bin/env nodemon
// prepare for ROS
const rosnodejs = require('rosnodejs');
const { MenuSelector } = rosnodejs.require('delivery_topics').srv;

// init node and get node handle
rosnodejs.initNode('/menu_selector_client');
const nh = rosnodejs.nh;

// set menu file path
const template = __dirname + '/index.ejs';
const num = [1, 10, 100];

// make express app
const express = require('express');
const app = express();

// to show service response.message
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default page
app.get('/', (req, res) => {
  res.render(template, { num });
})

// to solve "Unhandled Promise Rejections"
const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

// menu requested, srv requested
app.post('/', doAsync(async(req, res) => {
  // set request message
  const srvReq = new MenuSelector.Request();
  srvReq.menu = req.body.menu;

  // check number
  if (num[srvReq.menu] == 0) {
    res.render(template, {
      num,
      message: "I'm sorry, but it's sold out...",
    });
    return;
  }

  // reduce number of selected menu
  num[srvReq.menu]--;

  // create the client and get return message
  const client = nh.serviceClient('/menu_selector', MenuSelector)
  const { message } = (await client.call(srvReq))

  // response message will be displayed
  res.render(template, {
    num,
    message,
  })
}));

// host web
app.listen(8080, (req, res) => {
  console.log('now runnig!');
})