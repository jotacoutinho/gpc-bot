const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NjY5NTc1MzMyODcyODQ3Mzcw.XimV5g.jiHCw3g9CKw30gtWR2oaKb2bkiM';
var lock = false;

const PREFIX = '!';

const textCommands = [
    'commands', 
    'poouta', 
    'hecarim'];

const audioCommands = [
    'commands',
    'poouta',
    '14dias', 
    'futurodoesporte', 
    'noitinha',
    'tainha', 
    'viradamagica', 
    'vitorkley', 
    'linharauter', 
    'galera', 
    'ratiou', 
    'inferno', 
    'escalacao', 
    'whey', 
    'miranha',
    'troll',
    'segundafeira',
    'quintafeira', 
    'quintafeira2',
    'everybody',
];

client.once('ready', () => {
	console.log('Ready!');
});
client.login(token);

client.on('message', message => {
    if(!lock) {
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
            let command = rootCommand.split(" ");

            function play(connection, command) {
                const path = './audios/' + command + '.ogg';
                const dispatcher = connection.playFile(path);
                dispatcher.on("end", function() {
                    connection.disconnect();
                });
            }
            
            switch(command[0]) {
                case audioCommands[0].toString(): // commands
                    let codeMessage = "```Lista de comandos:```";
                    audioCommands.forEach((command) => {
                        codeMessage += "```" + command.toString() + "```";
                    });
                    message.channel.send(codeMessage);
                    break;
                default:
                    if(audioCommands.includes(command[0])) {
                        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection => {
                            play(connection, command[0]);
                        }).catch(err => console.log(err));
                    } else {
                        message.channel.send('POOOUTA! Parece que eu ainda não aprendi todos os comandos... tururu.');
                    }
                    break;
            }
        }
    } else {
        message.channel.send('Da uma segurada aí, parceria.');
    }
});