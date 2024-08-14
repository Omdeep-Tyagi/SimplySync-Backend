const express=require("express");
const router=express.Router();
const {getContact,createContact,getContacts,updateContact,deleteContact} =require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken); // making all routes as protected routes
router.route("/")
    .get(getContact)
    .post(createContact);
  
router.route("/:id")
    .get(getContacts)
    .put(updateContact)
    .delete(deleteContact);    


module.exports=router;