module.exports = {
  name: "hello",
  category: "test",
  description: "Replies with 'Hello world'.",
  run: async(client, message, args, guild) => {
      message.channel.send("Hello world!");
  }
};
