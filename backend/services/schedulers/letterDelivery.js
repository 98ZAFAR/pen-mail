const crons = require("node-cron");
const Letter = require("../../models/letter/model");
const sendGeneralMail = require("../emails/sendGeneralMail");

// Scheduler to deliver letters every minute
crons.schedule("* * * * *", async () => {
  try {
    const pendingLetters = await Letter.find({
      status: "sent",
      deliveredAt: { $lte: new Date() },
    }).populate("sender recipient");

    const letters = await Letter.updateMany(
      { status: "sent", deliveredAt: { $lte: new Date() } },
      { $set: { status: "received" } }
    );
    if (letters.modifiedCount === 0) {
      console.log("No letters to deliver at this time.");
      return;
    }

    pendingLetters.forEach(async (letter) => {
      const { sender, recipient, subject, body } = letter;
      try {
        await sendGeneralMail({
          to: recipient.email,
          subject: `Letter from ${sender.nickName}: ${subject}`,
          title: `New Letter from ${sender.nickName}`,
          body: body,
        });
        console.log(`Letter delivered to ${recipient.email}`);
      } catch (error) {
        console.error(`Failed to deliver letter to ${recipient.email}:`, error);
      }
    });
    
    console.log(`${letters.modifiedCount} letters delivered.`);
  } catch (error) {
    console.error("Error delivering letters:", error);
  }
});


