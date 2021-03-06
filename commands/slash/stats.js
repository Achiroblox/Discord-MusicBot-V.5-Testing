const SlashCommand = require("../../lib/SlashCommand");
const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
  .setName("stats")
  .setDescription("Get information about the bot")
  .setRun(async (client, interaction) => {
    // show lavalink uptime in a nice format
    const lavauptime = moment
      .duration(client.manager.nodes.values().next().value.stats.uptime)
      .format(" D[d], H[h], m[m]");
    // show lavalink memory usage in a nice format
    const lavaram = (
      client.manager.nodes.values().next().value.stats.memory.used /
      1024 /
      1024
    ).toFixed(2);
    // sow lavalink memory alocated in a nice format
    const lavamemalocated = (
      client.manager.nodes.values().next().value.stats.memory.allocated /
      1024 /
      1024
    ).toFixed(2);
    // show bot uptime
    const botuptime = moment
      .duration(client.uptime)
      .format(" D[d], H[h], m[m]");
    // calculate the average ping to lavalink server

    const embed = new MessageEmbed()
      .setTitle(`Stats from` + ` \`${client.user.username}\``)
      .setColor(client.config.embedColor)
      .setFields([
        {
          name: "**Bot Statistic**",
          value: `š¶ Ping ā¢ \`${
            client.ws.ping
          }ms\n\`:file_cabinet: Memory ā¢ \`${(
            process.memoryUsage().heapUsed /
            1024 /
            1024
          ).toFixed(2)}MB\`\n\nš Uptime ā¢ \`${botuptime}\`\nšØāš» Servers ā¢ \`${
            client.guilds.cache.size
          }\``,
          inline: true,
        },
        {
          name: "**Lavalink Statistic**",
          value: `š„ CPU Load ā¢ \`${
            client.manager.nodes
              .values()
              .next()
              .value.stats.cpu.lavalinkLoad.toFixed(2) * 100
          }%\`\n:file_cabinet: Memory ā¢ \`${lavaram}MB / ${lavamemalocated}MB\`\n\nš Uptime ā¢ \`${lavauptime}\`\nšµ Players ā¢ \`${
            client.manager.nodes.values().next().value.stats.playingPlayers
          } / ${
            client.manager.nodes.values().next().value.stats.players
          } playing\``,
          inline: true,
        },
      ])
      .setFooter({
        text: `Discord Music Bot Version: v${
          require("../../package.json").version
        }`,
      });
    return interaction.reply({ embeds: [embed] });
  });

module.exports = command;
