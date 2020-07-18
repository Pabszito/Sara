module.exports = client => {
    console.log(`[INFO] Logged in as ${client.user.tag}`);
    client.user.setActivity("Hello world!");
};
