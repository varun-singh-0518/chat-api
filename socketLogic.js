export const handleConnection = (io) => {
  // Create a global map to store online users
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    // Set the global chatSocket to the current socket
    global.chatSocket = socket;

    // Event handler for adding a user to the onlineUsers map
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    // Event handler for sending a message
    socket.on("send-msg", (data) => {
      // Retrieve the socket ID of the recipient user
      const sendUserSocket = onlineUsers.get(data.to);

      // If the recipient user is online, emit a "msg-receive" event to their socket
      if (sendUserSocket) {
        io.to(sendUserSocket).emit("msg-receive", data.message);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      // Remove the user from the onlineUsers map
      onlineUsers.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
        }
      });
    });
  });
};
