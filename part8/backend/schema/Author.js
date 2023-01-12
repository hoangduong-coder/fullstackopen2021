const mongoose = require ('mongoose');

const schema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});

schema.set ('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString ();
    delete returnedObject._id;
  },
});

module.exports = mongoose.model ('Author', schema);
