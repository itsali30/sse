const messages = [];

exports.handler = async (event, context) => {
  const message = JSON.parse(event.body);
  messages.push(message);

  // Send the message to all clients
  sendEvent(message);

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Message sent successfully" }),
  };
};

function sendEvent(message) {
  // Send the message to all connected clients
  clients.forEach(client => client.write(`data: ${JSON.stringify(message)}\n\n`));
}
