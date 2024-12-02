let clients = [];

exports.handler = async (event, context) => {
  const { headers } = event;
  const res = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
    body: "",
  };

  const pushClient = (eventSource) => {
    clients.push(eventSource);
    eventSource.on('close', () => {
      clients = clients.filter((client) => client !== eventSource);
    });
  };

  const sendEvent = (message) => {
    clients.forEach((client) => {
      client.write(`data: ${JSON.stringify(message)}\n\n`);
    });
  };

  if (headers["x-sse"] === "true") {
    const eventSource = new EventSource();
    pushClient(eventSource);

    res.body = "";
    return res;
  } else {
    // If not an SSE request, return an empty response
    return res;
  }
};
