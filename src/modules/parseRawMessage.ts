export const parseRawMessage = ({ eventMessage } : any) => {
  // eslint-disable-next-line
  const [host, id, user] = eventMessage.split(" ", 3);
  // eslint-disable-next-line
  const message = eventMessage.split(" ").slice(3).join(" ").substring(1);

  console.log("RAW: ", eventMessage);

  return {
    type: "raw",
    raw: eventMessage
  };
};
