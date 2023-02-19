const db = require("../models"); 
const Member = db.members;
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
    return;
  }

  const member = { 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    pincode: req.body.pincode,
    parentId: req.body.parentId,
    level:  req.body.level,
    active: 1
  }

  Member.create(member)
    .then(data => {
      res.send({
        success: true,
        message: "Member created successfully",
        data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Member."
      });
    });
};


//Retrive all members
exports.findAll = (req, res) => {
  Member.findAll({ 
    where : {
      active: 1
    },
     order: [
    ['parentId', 'ASC']
], })
    .then(data => {
      res.status(200).json({
        success: true,
        data
      });
      return
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving member."
      });
    });
};


//To find a single Member with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Member.findByPk(id)
    .then(data => {
      if(data){
        res.send({
          success: true,
          data
        })
      }
      else{
        res.send({
          success: false,
          message: "No Member with id=" + id
        });
      };
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: "Error retrieving Member with id=" + id
      });
    });
};

//To update a Member identified by its id
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req);
  Member.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success: true,
          message: "Member was updated successfully."
        });
      } else {
        res.send({
          success: false,
          message: `Cannot update Member with id=${id}. Maybe Member was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: "Error updating Member with id=" + id
      });
    });
};
