var express = require("express");
var app = express();
var bodyParser = require('body-parser');
const users = require('./lib/users')
const eggtracker = require('./lib/eggtrackers')

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.post("/enrolladmin", (req, res, next) => {
    users.enrollAdmin()
    res.send("Done")
});

app.post("/registeruser", (req, res, next) => {
    var name = req.body.name;
    users.registerUser(name)
    res.send("Done")
});

app.post("/eggboxes/pack", (req, res, next) => {
    var request = new Object()
    request.quantity = req.body.quantity
    request.farmer = req.body.farmer
    request.user = req.body.user
    var results = eggtracker.packEggs(request)
    res.send(results)
});
app.post("/eggboxes/report-damage", (req, res, next) => {
    var request = new Object()
    request.user = req.body.user    
    request.eggbox = req.body.eggbox
    eggtracker.reportDamage(request)
    res.send("Reported")
});

app.post("/createshipment", (req, res, next) => {
    var user = req.body.user;
    var request = new Object()
    request.user = user
    request.from = req.body.from
    request.to = req.body.to
    request.shipper = req.body.shipper
    eggtracker.createShipment(request)
    res.send("Done")
});


app.post("/load-truck", (req, res, next) => {
    var user = req.body.user;
    var request = new Object()
    request.user = user
    request.shipment = req.body.shipment
    eggtracker.loadTruck(request)
    res.send("Done")
});