const express = require("express");
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} = require("../../controllers/notification/controllers");
const router = express.Router();

router.get("/", getNotifications);
router.get("/unread-count", getUnreadCount);
router.put("/mark-all-read", markAllAsRead);
router.put("/:notificationId/read", markAsRead);
router.delete("/:notificationId", deleteNotification);

module.exports = router;
