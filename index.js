const {Client, Attachment} = require('discord.js');
const client = new Client();
const token = 'NjY5NTc1MzMyODcyODQ3Mzcw.Xiss7Q.pxiCO7IVFxGih-Oe6i4HTbA0HLo';
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
    'sextafeira',
    'everybody',
    'tweetmelao',
    'videogame',
    'bambole',
    'tejuro',
];

const imageCommands = [
    'commands', 
    'academia', 
    'barba',
    'baron',
    'belo',
    'bigo',
    'cabecao',
    'cabra',
    'cafe',
    'careca',
    'cauduro',
    'ceva',
    'chombeats',
    'engenheiro',
    'fausto',
    'florzinha',
    'fome',
    'freezer',
    'god',
    'hanglose',
    'hohoho',
    'iguana',
    'jutsu',
    'malucaw',
    'mascara',
    'mascara2',
    'morto',
    'morto2',
    'morto3',
    'natacao',
    'oldrauter',
    'ovelha',
    'peace',
    'peruca',
    'pikachu',
    'poker',
    'pontual',
    'pradola',
    'praia',
    'putasso',
    'raul',
    'sextou',
    'soneca',
    'soninho',
    'soninho2',
    'soninho3',
    'soninho4',
    'surf',
    'teddy',
    'temaki',
    'teta',
    'udyr',
    'vianinha',
    'votui',
    'wow',
    'youdabest',
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
            function play(connection, command) {
                const path = './audios/' + command + '.ogg';
                const dispatcher = connection.playFile(path);
                dispatcher.on("end", function() {
                    connection.disconnect();
                });
            }
            
            switch(rootCommand) {
                case audioCommands[0].toString(): // commands
                    let codeMessage = "```Lista de comandos:```";
                    audioCommands.forEach((command) => {
                        codeMessage += "```" + command.toString() + "```";
                    });
                    message.channel.send(codeMessage);
                    break;
                default:
                    if(audioCommands.includes(rootCommand)) {
                        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection => {
                            play(connection, rootCommand);
                        }).catch(err => console.log(err));
                    } else {
                        message.channel.send('POOOUTA! Parece que eu ainda não aprendi todos os comandos... tururu.');
                    }
                    break;
            }
        } else if(commandType =='$') {
            switch(rootCommand) {
                case imageCommands[0].toString(): // commands
                    let codeMessage = "```Lista de comandos:```";
                    imageCommands.forEach((command) => {
                        codeMessage += "```" + command.toString() + "```";
                    });
                    message.channel.send(codeMessage);
                    break;
                default:
                    if(imageCommands.includes(rootCommand)) {
                        const path = './images/' + rootCommand + '.png';
                        const attachment = new Attachment(path);
                        message.channel.send(attachment);
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