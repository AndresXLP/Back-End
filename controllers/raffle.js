const { StatusCodes } = require('http-status-codes');
const Raffle = require('../models/raffle');

const createRaffleCardborad = async (req, res) => {
  const { _id: createdBy } = req.user;
  const { productRaffle, price, descriptionRaffle, date, lottery, image } =
    req.body;
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
    image,
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
  try {
    const raffle = await Raffle.findById(id);
    res.status(StatusCodes.OK).json({ raffle });
  } catch (error) {
    console.log(error);
  }
};

const getAllRaffleCardboard = async (req, res) => {
  const raffles = await Raffle.find({});
  res.status(StatusCodes.OK).json({ raffles });
};

const getRaffleCreatedBy = async (req, res) => {
  const { _id } = req.user;
  try {
    const raffles = await Raffle.find({ createdBy: _id });
    res.status(StatusCodes.OK).json(raffles);
  } catch (error) {
    console.log(error);
  }
};

const updateNumberRaffle = async (req, res) => {
  const { id, name, lastName, email, phone, number, payment, selected } =
    req.body;
  try {
    const response = await Raffle.updateOne(
      { _id: id, 'numbers.raffleNumber': number },
      {
        $set: {
          'numbers.$[num].selected': selected,
          'numbers.$[num].email': email,
          'numbers.$[num].phone': phone,
          'numbers.$[num].name': name,
          'numbers.$[num].lastName': lastName,
          'numbers.$[num].payment': payment || false,
        },
      },
      { arrayFilters: [{ 'num.raffleNumber': number }] }
    );
    console.log(
      `🤖 ~ file: raffle.js ~ line 82 ~ updateNumberRaffle ~ response`,
      response
    );
    if (response.matchedCount === 1) {
      res
        .status(StatusCodes.OK)
        .json({ msg: 'Numero Actualizado Exitosamente ✔' });
    }
  } catch (error) {
    console.log(error.response);
  }
};
const deleteRaffle = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await Raffle.findById(id);
    if (!response) {
      res
        .status(StatusCodes.BAD_GATEWAY)
        .json({ msg: 'No existe una rifa con este ID' });
      return;
    }
    response.numbers.map((isSelected) => {
      if (isSelected.selected) {
        res.status(StatusCodes.BAD_REQUEST).json({
          msg: 'No se puede eliminar la rifa porque hay numeros reservados',
        });
        return;
      }
    });

    const deletedRaffle = await Raffle.findByIdAndDelete(id);
    res.status(StatusCodes.ACCEPTED).json({ msg: 'Rifa eliminada con exito' });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createRaffleCardborad,
  getRaffleCardboard,
  getAllRaffleCardboard,
  updateNumberRaffle,
  getRaffleCreatedBy,
  deleteRaffle,
};
