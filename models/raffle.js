import mongoose from 'mongoose'

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
    },
    phone: {
      type: Number,
      minlength: 10,
      maxlength: 10,
    },
    name: { type: String },
    lastName: { type: String },
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
    minlength: 25,
    maxlength: 255,
  },
  lottery: { type: String, required: true },
  numbers: [numbersRaffle],
});

export default mongoose.model('Raffle', raffleSchema);
