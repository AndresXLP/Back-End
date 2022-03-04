const mongoose = require('mongoose');

const numbersRaffle = new mongoose.Schema(
  {
    raffleNumber: {
      type: String,
      require: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      default: 'example@rifalo.com',
    },
    phone: {
      type: Number,
      minlength: 10,
      maxlength: 10,
      default: 300000000,
    },
  },
  { _id: false }
);
const raffleSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  productRaffle: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  descriptionRaffle: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 255,
  },
  lottery: { type: String, required: true },
  numbers: [numbersRaffle],
});

module.exports = mongoose.model('Raffle', raffleSchema);
