const Day = require("../model/Day");

// module.exports.createDayStart = async (req, res) => {
//   try {
//     const newDate = new Date();
//     const date = await new Day({
//       date: {
//         start: newDate,
//       },
//     });
//     date.save();
//     return res.status(200).json({
//       date: date,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// module.exports.createDayEnd = async (req, res) => {
//   try {
//     const newDate = new Date();
//     const id = req.body.id;
//     const dateStart = await Day.findById(id).date?.start;
//     const date = await Day.findByIdAndUpdate(id, {
//       date: { start: dateStart, end: newDate },
//     });
//     date.save();
//     return res.status(200).json({
//       date: date,
//       dateStart: dateStart,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

module.exports.createDay = async (req, res) => {
  try {
    const date = await new Day({
      date: {
        start: req.body.start,
        end: req.body.end,
      },
    });
    date.save();
    return res.status(200).json({
      date: date,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
