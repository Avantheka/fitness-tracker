import db from "../db/db.js";

export const getProgressSummary = async (req, res) => {
  try {
    const { email, range, start, end } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    await db.read();
    const allData = db.data.tracking || [];

    const userRecords = allData.filter(entry => entry.email === email);
    let filteredRecords = [];

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      filteredRecords = userRecords.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endDate;
      });
    } else if (range === "weekly") {
      const today = new Date();
      const pastWeek = new Date();
      pastWeek.setDate(today.getDate() - 7);
      filteredRecords = userRecords.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= pastWeek && entryDate <= today;
      });
    } else if (range === "monthly") {
      const today = new Date();
      const pastMonth = new Date();
      pastMonth.setMonth(today.getMonth() - 1);
      filteredRecords = userRecords.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= pastMonth && entryDate <= today;
      });
    } else {
      filteredRecords = userRecords;
    }

    // 🧮 Summarize Data
    let cardioTotal = 0;
    let cyclingTotal = 0;
    let waterTotal = 0;
    let waterCount = 0;
    let weightTrend = [];
    let waistTrend = [];

    filteredRecords.forEach(entry => {
      if (entry.cardioDuration) {
        const min = parseInt(entry.cardioDuration);
        if (!isNaN(min)) cardioTotal += min;
      }

      if (entry.cyclingDistance) {
        const km = parseFloat(entry.cyclingDistance);
        if (!isNaN(km)) cyclingTotal += km;
      }

      if (entry.waterIntake) {
        const litres = parseFloat(entry.waterIntake);
        if (!isNaN(litres)) {
          waterTotal += litres;
          waterCount += 1;
        }
      }

      if (entry.weight) weightTrend.push(entry.weight);
      if (entry.waist) waistTrend.push(entry.waist);
    });

    const result = {
      cardioTotal: `${cardioTotal} min`,
      cyclingTotal: `${cyclingTotal} km`,
      averageWater: waterCount ? `${(waterTotal / waterCount).toFixed(1)} L` : "0 L",
      weightTrend,
      waistTrend
    };

    return res.json(result);

  } catch (err) {
    console.error("Error in getProgressSummary:", err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
