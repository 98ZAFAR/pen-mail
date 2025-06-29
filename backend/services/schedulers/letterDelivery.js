const crons = require("node-cron");
const Letter = require("../../models/letter/model");

// Scheduler to deliver letters every minute
crons.schedule("* * * * *", async () => {
  try {
    const letters = await Letter.updateMany(
      { status: "sent", deliveredAt: { $lte: new Date() } },
      { $set: { status: "received" } }
    );
    if (letters.modifiedCount === 0) {
      console.log("No letters to deliver at this time.");
      return;
    }
    console.log(`${letters.modifiedCount} letters delivered.`);
  } catch (error) {
    console.error("Error delivering letters:", error);
  }
});


