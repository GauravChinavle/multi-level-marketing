const validation = (memberSchema) => { 
  return (req, res, next) => { 
    const options = {
      id: 2,
      parentId: 2,
      firstName: "Ross",
      lastName: "Geller",
      email: "ross@xyz.com",
      password: "we were on a break",
      confirmPassword: "we were on a break",
      mobile: "1234567890",
      city: "new york city",
      state: "new york city",
      country : "USA",
      pincode : "123490",
      level: 0
    }
    const { error,value } = memberSchema.validate(req.body, options, { abortEarly: false }); 
    const valid = error == null; 
    if (valid) { next(); } 
    else { 
      const { details } = error; 
      const message = details.map(i => i.path).join(',')
      console.log("error", details); 
      res.status(422).json({ error: "Please check "+message }) 
    } 
  } 
} 
module.exports = validation;