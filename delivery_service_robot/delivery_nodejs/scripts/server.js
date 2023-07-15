#!/usr/bin/env nodemon
// prepare for ROS and get custom message
const rosnodejs = require('rosnodejs');
const { MenuSelector } = rosnodejs.require('delivery_topics').srv;

// init node and get node handle
rosnodejs.initNode('/menu_selector_server');
const nh = rosnodejs.nh;

// define callback
const cbSelectMenuRtnMessage = (req, res) => {
  const menu = ['salad', 'fried potatoes', 'drinks'];
  res.message = 'You just selected ' + menu[req.menu] + '!';
  rosnodejs.log.info('menu type: ', req.menu);
  rosnodejs.log.info(res.message);
  return true;
}

// create the service
const service = nh.advertiseService('/menu_selector', MenuSelector, cbSelectMenuRtnMessage);