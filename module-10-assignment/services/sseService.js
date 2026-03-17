let clients = [];

export const addClient = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  clients.push(res);
  req.on("close", () => (clients = clients.filter((c) => c !== res)));
};

export const broadcast = (filename) => {
  const data = JSON.stringify({ message: "New upload!", file: filename });
  clients.forEach((c) => c.write(`data: ${data}\n\n`));
};
