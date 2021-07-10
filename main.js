"use strict";
let { WAConnection : _WAConnection } = require("@adiwajshing/baileys");
let { MessageType } = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal");
const figlet = require("figlet");
const fs = require("fs");
const lolcatjs = require('lolcatjs');
const { color, ZXCLOG } = require("./lib/ZXCLOG");
const { serialize, sleep } = require("./lib/myfunc");
const myfunc = require("./lib/myfunc");
const role = require('./lib/role');
const afk = require("./lib/afk");
const sessionName = '_ntfvx';

let WAConnection = myfunc.WAConnection(_WAConnection)

let _afk = JSON.parse(fs.readFileSync('./database/afk.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
let { ownerNumber } = setting
let blocked = [];

global.ntfvx = new WAConnection()

ntfvx.mode = 'public'
ntfvx.baterai = {
    baterai: 0,
    cas: false
};
ntfvx.multi = true
ntfvx.nopref = false
ntfvx.prefa = 'anjing'

require('./ntfvx.js')
nocache('./ntfvx.js', module => console.log(color(`'${module}' Telah berubah!`)))
require('./lib/antidelete.js')
nocache('./lib/antidelete.js', module => console.log(color(`'${module}' Telah berubah!`)))
require('./config.json')
nocache('./config.json', module => console.log(color(`'${module}' Telah berubah!`)))

const start = async(sesion) => {
    ntfvx.logger.level = 'warn'
    ntfvx.browserDescription = ['NTFVX!~/@ZXC', 'Desktop', '3.0']

    // Loading
    console.log(color(figlet.textSync('loading...', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[ WELCOME TO NTFVX BOT ]'))

    // Waiting QR
    ntfvx.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(ZXCLOG('QR Ready to scan!'))
    })

    // Restore Sesion
    fs.existsSync(sesion) && ntfvx.loadAuthInfo(sesion)

    // Connecting
    ntfvx.on('connecting', () => {
		console.log(ZXCLOG('Connecting...'))
	})

    // Connected
    ntfvx.on('open', () => {
		console.log('')
        console.log('')
        console.log(color(figlet.textSync('NTFVX', 'Big Money-ne'), 'limegreen'))
        console.log('')
        console.log(color(figlet.textSync('> BOT', 'Big Money-ne'), 'limegreen'))
        console.log('')
        lolcatjs.fromString('Welcome Back Owner!')
        console.log('')
        console.log('')
        })

    // Write Sesion
    await ntfvx.connect({timeoutMs: 30*1000})
    fs.writeFileSync(sesion, JSON.stringify(ntfvx.base64EncodedAuthInfo(), null, '\t'))

    // Reconnecting
    ntfvx.on('ws-close', () => {
        console.log(ZXCLOG('Koneksi terputus, mencoba menghubungkan kembali..'))
    })

    // Timeout
    ntfvx.on('close', async ({ reason, isReconnecting }) => {
        console.log(ZXCLOG('Terputus, Alasan :' + reason + '\nMencoba mengkoneksi ulang :' + isReconnecting))
        if (!isReconnecting) {
            console.log(ZXCLOG('Connect To Phone Rejected and Shutting Down.'))
        }
    })

    // Block
    ntfvx.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
        for (let i of json[1].blocklist) {
            blocked.push(i.replace('c.us','s.whatsapp.net'))
        }
    })

    // Action Call
    ntfvx.on('CB:action,,call', async json => {
        const callerid = json[2][0][1].from;
        ntfvx.sendMessage(callerid, `Maaf bot tidak menerima call`, MessageType.text)
        await ntfvx.blockUser(callerid, "add")
    })

    // Action Battery
    ntfvx.on('CB:action,,battery', json => {
        const a = json[2][0][1].value
        const b = json[2][0][1].live
        ntfvx.baterai.baterai = a
        ntfvx.baterai.cas = b
    })

    // Anti delete
    ntfvx.on('message-delete', async(json) => {
        require('./lib/antidelete')(ntfvx, json)
    })

    // Chat
    ntfvx.on('chat-update', async (zxc) => {
        // Presence
        if(zxc.presences){
			for(let key in zxc.presences){
				if(zxc.presences[key].lastKnownPresence === "composing" || zxc.presences[key].lastKnownPresence === "recording"){
					const from = zxc.jid
					const isGroup = from.endsWith("@g.us")
					const groupMetadata = isGroup ? await ntfvx.groupMetadata(from) : ''
					const name = isGroup ? groupMetadata.subject : ''
					const conts = ntfvx.contacts[key] || { notify: key.replace(/@.+/, '') }
					const pushname = conts.notify || conts.vname || conts.name || 'Unknown'
					const statusKontak = zxc.presences[key].lastKnownPresence === "composing" ? "mengetik" : "merekam";
					//console.log(color(`${pushname} sekarang ${statusKontak} ${isGroup ? `di ${name}` : ''}`));
					if(isGroup){
						for(let i = 0; i < _afk.length; i++){
							if(from == _afk[i].group){
								if(key == _afk[i].id){
									console.log(color(`[AFK] ${pushname} sekarang ${statusKontak} ${isGroup ? `di ${name}` : ''}`));
									ntfvx.sendMessage(from, `*@${key.split('@')[0]} berhenti AFK!~*\nKarena dia sedang *${statusKontak}*`, MessageType.text, {
										contextInfo:{ 
											participant: key, 
											mentionedJid: [key], 
											quotedMessage:{ 
												extendedTextMessage: { 
													text: `*「 AWAY FROM KEYBOARD 」*` 
												}
											}}})
									_afk.splice(afk.afkposition(key, from, _afk), 1)
									fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
								}
							}
						}
					}
				}
			};
		}
		if (!zxc.hasNewMessage) return
        zxc = zxc.messages.all()[0]

		if (zxc.messageStubType && !zxc.message){ 
			require('./lib/handlergroup')(ntfvx, zxc)
			}

        if (!zxc.message) return
        const { isGroup } = zxc
        const groupMetadata = isGroup ? await ntfvx.groupMetadata(from) : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        if(zxc.message.ephemeralMessage){
			const from = zxc.key.remoteJid;
			const TypePsn = MessageType;
			const self = zxc.key.fromMe;
			const isGroup = from.endsWith("@g.us");
			let adminGroups = [];
			const metadata = isGroup ? await ntfvx.groupMetadata(from) : "";
			const partc = metadata.participants ? metadata.participants : [];
			for (let adm of partc) {
				 if (adm.isAdmin) {
					  adminGroups.push(adm.jid);
				 }
			}
			   const sender = self ?
				 ntfvx.user.jid :
				 isGroup ?
					  zxc.participant :
					  zxc.key.remoteJid;
                const nomerOwner = ownerNumber
				const isOwner = nomerOwner.includes(sender);
				const isAdmin = groupAdmins.includes(sender);
				const groupName = isGroup ? metadata.subject : "";
				const jid = sender;
				const conts = zxc.key.fromMe ?
				 ntfvx.user.jid :
				 ntfvx.contacts[sender] || {
					  notify: jid.replace(/@.+/, ""),
				 };
				const pushname = zxc.key.fromMe ?
				 ntfvx.user.name :
				 conts.notify || conts.vname || conts.name || "-";
				const botNumber = ntfvx.user.jid
				const isBotAdmin = adminGroups.includes(botNumber);
				let antiBug = JSON.parse(fs.readFileSync("./database/antibug.json"));
				let antiBugON = antiBug.includes(from)
				const x = zxc.message.ephemeralMessage.message.protocolMessage ? zxc.message.ephemeralMessage.message.protocolMessage : zxc
				if(x.type == 3 && antiBugON && x.ephemeralExpiration == 0){
					if(isOwner){
						console.log(' '+pushname+' [OWNER] Bot is sending bug at '+groupName+' ID :'+from)
                        ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
                        ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
                        ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
                        ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
                        ntfvx.sendMessage(from, '```Tolong tandai telah dibaca```', TypePsn.text)
					} else if(isAdmin){
						 console.log(' '+pushname+' [ADMIN] is sending bug at '+groupName+' ID :'+from)
                         ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
                        ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
                        ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
                        ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
                        ntfvx.sendMessage(from, '```Tolong tandai telah dibaca```', TypePsn.text)
					} else if(!isBotAdmin){
						return console.log(' I\'m not admin')
					} else {
						if (sender == ntfvx.user.jid) return
					  console.log(' '+pushname+' [MEMBER] is sending a bugs at '+groupName+' ID :'+from)
					  ntfvx.sendMessage(from, '```@'+sender.replace(/@s.whatsapp.net/gi, '')+' are detected sending bugs```', TypePsn.text, {contextInfo: {mentionedJid: [sender]}, quoted: { 
					  key: { fromMe: false,  remoteJid: sender, },  message: { conversation: '```Bugs Detected\nYou will be kicked in 2 seconds for sending bugs```' }} })
						 await sleep(2000)
						   await ntfvx.groupRemove(from, [sender])
						   ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
						   ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
						   ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
						   ntfvx.sendMessage(from, '||\n'.repeat(20), TypePsn.text)
						   await sleep(2000)
						   ntfvx.sendMessage(from, '```Tolong tandai telah dibaca```', TypePsn.text)
						   const vcard =
						   "BEGIN:VCARD\n" + // metadata of the contact card
						   "VERSION:3.0\n" +
						   "FN:Bug sender\n" + // full name
						   "ORG:Bug sender;\n" + // the organization of the contact
						   "TEL;type=CELL;type=VOICE;waid="+zxc.participant.replace(/@s.whatsapp.net/gi, '')+":+"+zxc.participant.replace(/@s.whatsapp.net/gi, '')+"\n" + // WhatsApp ID + phone number
						   "END:VCARD";
					  await ntfvx.sendMessage(from, { displayname: "Jeff", vcard: vcard }, MessageType.contact, {quoted: zxc, });
					  }
				}
			}
		if (zxc.key && zxc.key.remoteJid == 'status@broadcast') return
        let wen = serialize(ntfvx, zxc)
		require('./ntfvx')(ntfvx, wen, blocked, _afk)
	})

   // Event Group --- Only Promote Demote
   ntfvx.on('group-participants-update', async (zxc) => {
	role(ntfvx, zxc)
})
}
/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
 function nocache(module, cb = () => { }) {
    console.log(color(`Module ${module} is now being watched for changes`))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

start('./' + `${process.argv.slice(2) || `${process.argv.slice(2)}`}` + `${sessionName}`+'.json')
.catch(err => console.log(err))
