const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NjY5NTc1MzMyODcyODQ3Mzcw.Xih1lQ.7rtbXwdGkQn7azWt-V8BsukhkgQ';
const ytdl = require("ytdl-core");

var servers = {};

const PREFIX = '!';
const textCommands = ['commands', 'poouta', 'hecarim'];
const audioCommands = ['commands', 'yt'];

client.once('ready', () => {
	console.log('Ready!');
});
client.login(token);

client.on('message', message => {
    let commandType = message.content[0];
    let rootCommand = message.content.substring(PREFIX.length);
    
    if(commandType == '_') {
        // Text message command
        switch(rootCommand) {
            case textCommands[0].toString(): // commands
                let codeMessage = "```Lista de comandos:```";
                textCommands.forEach((rootCommand) => {
                    codeMessage += "```" + rootCommand.toString() + "```";
                });
                message.channel.send(codeMessage);
                break;
            case textCommands[1].toString(): // poouta
                message.channel.send('Poouta!');
                break;
            case textCommands[2].toString(): // hecarim
                message.channel.send('Runa errada, errada runa erraruna errada') ;
                break;
            default:
                message.channel.send('POOOUTA! Parece que eu ainda não aprendi todos os comandos... tururu.');
                break;
        }
        return;
    } else if(commandType == '!') {
        // Audio message/output command rootCommand
        // console.log(command, command.split(" ")[0], command.split(" ")[1]);
        let command = rootCommand.split(" ");
        console.log(command[1]);
        switch(command[0]) {
            case audioCommands[0].toString(): // commands
                let codeMessage = "```Lista de comandos:```";
                audioCommands.forEach((command) => {
                    codeMessage += "```" + command.toString() + "```";
                });
                message.channel.send(codeMessage);
                break;
            case audioCommands[1].toString(): // yt
                function play(connection, message) {
                    var server = servers[message.guild.id];

                    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
                    server.queue.shift();
                    server.dispatcher.on("end", function() {
                        if(server.queue[0]){
                            play(connection, message);
                        } else {
                            connection.disconnect();
                        }
                    });
                }

                if(!command[1]) {
                    message.channel.send('Utilize: !yt link_do_youtube');
                    return;
                }

                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                }
            
                var server = servers[message.guild.id];
                server.queue.push(command[1]);

                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                    play(connection, message);
                })
                break;
            default:
                message.channel.send('POOOUTA! Parece que eu ainda não aprendi todos os comandos... tururu.');
                break;
        }
    }
});