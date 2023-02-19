var express = require('express');
var router = express.Router();
const { create, findAll, update, findOne } = require('../actions/member.actions');
const deleteMember = require("../services/deleteMember");
const schemas = require('../models/memberSchema');
const validation = require('../middleware');
/* GET users listing. */

//create member

router.post('/add',validation(schemas.memberSchema),create);

// Retrieve all Member
router.get("/get/:id", findOne);

// Retrieve all Member
router.get("/getAll", findAll);

// Update a Member with id
router.put("/update/:id", update);

router.post("/deleteMember", deleteMember);

module.exports = router;
