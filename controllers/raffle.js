const { StatusCodes } = require('http-status-codes');
const Raffle = require('../models/raffle');

const createRaffleCardborad = async (req, res) => {
  const { _id: createdBy } = req.user;
  const { productRaffle, price, descriptionRaffle, date, lottery } = req.body;
  console.log(req.body);
  const numbers = [];
  for (let i = 0; i <= 99; i++) {
    if (i.toString().length < 2) {
      numbers.push({
        raffleNumber: i.toString().padStart(2, '0'),
      });
    } else {
      numbers.push({
        raffleNumber: i.toString(),
      });
    }
  }
  const dataRaffle = {
    createdBy,
    date,
    lottery,
    productRaffle,
    price: new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    })
      .format(price)
      .slice(0, -3),
    descriptionRaffle,
    numbers,
  };
  const raffle = await Raffle.create(dataRaffle);
  res.status(StatusCodes.OK).json(raffle);
};

const getRaffleCardboard = async (req, res) => {
  const { id } = req.params;
  const raffle = await Raffle.findById(id);
  res.status(StatusCodes.OK).json({ raffle });
};

const getAllRaffleCardboard = async (req, res) => {
  const raffles = await Raffle.find({});
  res.status(StatusCodes.OK).json({ raffles });
};
module.exports = {
  createRaffleCardborad,
  getRaffleCardboard,
  getAllRaffleCardboard,
};
