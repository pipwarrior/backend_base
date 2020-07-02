var db = require('../models');

exports.createInventory = function(req,res){
  db.Inventory.create(req.body)
  .then(function(newInventory){
    res.status(201).json(newInventory);
  })
  .catch(function(err){
    res.send(err);
  })
}

exports.getInventorys = function(req,res){
  db.Inventory.find().sort({createdOn: -1})
  .then(function(posts){
    res.json(posts);
  })
  .catch(function(err){
    res.send(err);
  })
}

exports.patchInventory = function(req,res){
  db.Inventory.findOneAndUpdate(
    {_id: req.body._id},
    {
      $set: {
        'partNumber': req.body.partNumber,
        'description': req.body.description,
        'category': req.body.category,
        'brand': req.body.brand,
        'updatedOn': Date.now() 
      }
    },
    {new: true}
  ).then(function(updatedInventory){
    res.status(201).json(updatedInventory);
  }).catch(function(err){
    res.send(err);
  })
}

exports.deleteInventory = function(req,res){
  db.Inventory.findByIdAndDelete({_id: req.body._id})
  .then(function(deletedInventory){
    res.status(201).json({message: 'Successfully deleted'});
  }).catch(function(err){
    console.log(err)
    res.send(err);
  })
}
