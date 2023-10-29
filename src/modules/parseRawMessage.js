export const parseRawMessage = ({ type, eventMessage, timeStamp }) => {
  // eslint-disable-next-line
  const [host, id, user] = eventMessage.split(" ", 3);
  // eslint-disable-next-line
  const message = eventMessage.split(" ").slice(3).join(" ").substring(1);

  return {
    type: "raw",
    eventMessage,
    timeStamp
  };
};
