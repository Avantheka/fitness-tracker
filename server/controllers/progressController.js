import db from "../db/db.js";

export const getProgressSummary = async (req, res) => {
  try {
    const { range, start, end } = req.query;
    const email = req.user?.email; 

    if (!email) {
      return res.status(401).json({ message: "Unauthorized. Email not found in token." });
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

    // Summarize Data
    let cardioTotal = 0;
    let cyclingTotal = 0;
    let waterTotal = 0;
    let waterCount = 0;
    let weightTrend = [];
    let waistTrend = [];
    let dailyData = [];

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

      // For daily breakdown chart
      dailyData.push({
        date: entry.date,
        cardio: parseInt(entry.cardioDuration) || 0,
        cycling: parseFloat(entry.cyclingDistance) || 0,
        water: parseFloat(entry.waterIntake) || 0,
      });
    });

    const result = {
      cardioTotal: cardioTotal,
      cyclingTotal: cyclingTotal,
      averageWater: waterCount ? (waterTotal / waterCount).toFixed(1) : 0,
      weightTrend,
      waistTrend,
      dailyData,
    };

    return res.json(result);

  } catch (err) {
    console.error("Error in getProgressSummary:", err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
