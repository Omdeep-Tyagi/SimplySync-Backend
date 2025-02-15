const asyncHandler= require("express-async-handler");
const Contact=require("../models/contactModel");


//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts=asyncHandler(async(req,res)=>{
    console.log(req.user);
    const contacts= await Contact.find({ user_id: req.user._id });//find all personal contact of loggedin user
    // res.status(200).json({message: "Get all contacts"});
    res.status(200).json(contacts);
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContact=asyncHandler(async(req,res)=>{
    //console.log(req.body);
    //from client side we are getting name , email,phone no.
    const {name,email,phone}=req.body; //destructure
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    
    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id: req.user._id, // associating user_id also with contact //loggedin user
    });
    // res.status(200).json({message: "Create Contact"});
    res.status(201).json(contact);

});

//@desc Get contacts //here we are not sending loggedin user id but sending id of particular conatct of loggedin user that we want as an output
//@route GET /api/contacts/:id
//@access private
const getContact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    //res.status(200).json({message: `Get contact for ${req.params.id} `});
    res.status(200).json(contact);
 });


//@desc Update contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact=asyncHandler(async(req,res)=>{
    //to update , first fetch the contact
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString()!== req.user._id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}//query option to return updated document
    );
   // res.status(200).json({message: `Update contact for ${req.params.id} `});
   res.status(200).json(updatedContact);
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req,res)=>{
     //to delete , first fetch the contact
     const contact= await Contact.findById(req.params.id);
     if(!contact){
         res.status(404);
         throw new Error("Contact not found");
     }

     if(contact.user_id.toString()!== req.user._id){
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts");
     }

    await contact.deleteOne({_id: req.params.id}); // or you can use Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({message: `Delete contact for ${req.params.id} `, contact});
   // res.status(200).json(contact);
});

module.exports={getContact,createContact,getContacts,updateContact,deleteContact};