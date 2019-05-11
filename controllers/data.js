
var express = require('express');
var router = express.Router();

var Fire = require('../models/FIRE');
var Ems = require('../models/EMS');
var Devs = require('../models/devs');

router.get('/data/fire', function(req, res){
  console.log("Request-get /data/fire");

  Devs.getDev(req.params.APIkey,function(){
    Fire.getData(req.params.search,function(datum){
      res.status(200);
      res.setHeader('Content-Type', 'text/html');
      res.send(JSON.stringify(datum));
    });
  });
});

router.get('/data/ems', function(req, res){
  console.log("Request-get /data/ems");

  Devs.getDev(req.query.APIkey,function(){
    Ems.getData(req.query.search,function(datum){
      res.status(200);
      res.setHeader('Content-Type', 'text/html');
      res.send(JSON.stringify(datum));
    });
  });
});

module.exports = router;
