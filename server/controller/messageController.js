const Message = require("../models/Message");

// @desc    Submit a contact message (from portfolio frontend)
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Name, email, and message are required");
    }

    const newMessage = await Message.create({ name, email, message });

    res.status(201).json({
      success: true,
      data: newMessage,
      message: "Message sent successfully!",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages (for admin)
// @route   GET /api/messages
// @access  Private (Admin)
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle read status of a message
// @route   PATCH /api/messages/:id/read
// @access  Private (Admin)
const toggleReadMessage = async (req, res, next) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) {
      res.status(404);
      throw new Error("Message not found");
    }

    msg.read = !msg.read;
    await msg.save();

    res.status(200).json({
      success: true,
      data: msg,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private (Admin)
const deleteMessage = async (req, res, next) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) {
      res.status(404);
      throw new Error("Message not found");
    }

    await msg.deleteOne();

    res.status(200).json({
      success: true,
      data: { id: req.params.id },
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  toggleReadMessage,
  deleteMessage,
};
