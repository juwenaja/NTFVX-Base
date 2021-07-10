const { MessageType } = require("@adiwajshing/baileys")
const moment = require("moment-timezone")
const fs = require("fs")
const chalk = require('chalk')
const { serialize } = require("./customfunct")
moment.tz.setDefault('Asia/Jakarta').locale('id')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}
const NTFVXLOG = (text, color) => {
	return !color ? chalk.yellow('[ANTI DELETE] ') + chalk.green(text) : chalk.yellow('[ANTI DELETE] ') + chalk.keyword(color)(text)
}

module.exports = async(ntfvx, wen) => {
    try {
        wen = serialize(ntfvx, wen.message)
        const { type, quotedMsg, isGroup, isQuotedMsg, mentioned, sender, from, fromMe, pushname, chats, isBaileys } = wen
        const dataRevoke = JSON.parse(fs.readFileSync('./database/antidelete/gc-revoked.json'))
        const dataCtRevoke = JSON.parse(fs.readFileSync('./database/antidelete/ct-revoked.json'))
        const dataBanCtRevoke = JSON.parse(fs.readFileSync('./database/antidelete/ct-revoked-banlist.json'))
        const isRevoke = !isGroup ? true : isGroup ? dataRevoke.includes(from) : false
		const isCtRevoke = isGroup ? true : dataCtRevoke.data ? true : false
		const isBanCtRevoke = isGroup ? true : !dataBanCtRevoke.includes(sender) ? true : false
        const time = moment.tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')
        console.log(NTFVXLOG(`Deleting message from ${pushname} in ${isGroup ? from : 'Private Chat'}`))
        let pengirim = wen.participants === "status_me" ? ntfvx.user.jid : wen.participant
        if (fromMe) return
        if (!isRevoke) return
		if (!isCtRevoke) return
		if (!isBanCtRevoke) return
        let msgOpt = wen.message[type]
        let options = {
            contextInfo: msgOpt.contextInfo ? msgOpt.contextInfo : '',
            thumbnail: msgOpt.jpegThumbnail ? msgOpt.jpegThumbnail : '',
            mimetype: msgOpt.mimetype ? msgOpt.mimetype : '',
            caption: chats,
            filename: msgOpt.fileName ? msgOpt.fileName : '',
            ptt: msgOpt.ptt ? msgOpt.ptt : '',
            duration: msgOpt.seconds ? msgOpt.seconds : ''
        }
        var fakeandel = {
            contextInfo: {
                participant: sender,
                mentionedJid: [sender],
                quotedMessage: {
                    extendedTextMessage: {
                        text: `*just deleted message...*`,
                    }
                }
            }
        }

let tmxt = 
`\`\`\`ANTI DELETE\`\`\`
\`\`\`TIPE:\`\`\` ${type === 'conversation' ? '*TEXT* '+chats : ''}

\`\`\`PENGIRIM\`\`\` 
*@${sender.replace('@s.whatsapp.net', '')}*

\`\`\`WAKTU DIKIRIM\`\`\`
*${moment.unix(wen.messageTimestamp).format('DD/MM/YYYY HH:mm:ss')}*

\`\`\`WAKTU DIHAPUS\`\`\`
*${time}*`

        if (type === 'conversation'){
            ntfvx.reply(from, tmxt, wen)

        } else if (type === 'stickerMessage') {
            let media = await ntfvx.downloadMediaMessage(wen)
let type_stk = 
`\`\`\`ANTI DELETE\`\`\`
\`\`\`TIPE:\`\`\` *STIKER*

\`\`\`PENGIRIM\`\`\` 
*@${sender.replace('@s.whatsapp.net', '')}*

\`\`\`WAKTU DIKIRIM\`\`\`
*${moment.unix(wen.messageTimestamp).format('DD/MM/YYYY HH:mm:ss')}*

\`\`\`WAKTU DIHAPUS\`\`\`
*${time}*`
            ntfvx.sendMessage(from, type_stk, MessageType.text, fakeandel)
            ntfvx.sendMessage(from, media, type, options)

        } else if (type === 'imageMessage') { 
            let media = await ntfvx.downloadMediaMessage(wen)
           let type_img = 
`\`\`\`ANTI DELETE\`\`\`
\`\`\`TIPE:\`\`\` *GAMBAR*

\`\`\`PENGIRIM\`\`\` 
*@${sender.replace('@s.whatsapp.net', '')}*

\`\`\`WAKTU DIKIRIM\`\`\`
*${moment.unix(wen.messageTimestamp).format('DD/MM/YYYY HH:mm:ss')}*

\`\`\`WAKTU DIHAPUS\`\`\`
*${time}*`
            ntfvx.sendMessage(from, type_img, MessageType.text, fakeandel)
            ntfvx.sendMessage(from, media, type, options)

        } else if (type === 'videoMessage'){ 
            let media = await ntfvx.downloadMediaMessage(wen)
           let type_vid = 
`\`\`\`ANTI DELETE\`\`\`
\`\`\`TIPE:\`\`\` *VIDEO*

\`\`\`PENGIRIM\`\`\` 
*@${sender.replace('@s.whatsapp.net', '')}*

\`\`\`WAKTU DIKIRIM\`\`\`
*${moment.unix(wen.messageTimestamp).format('DD/MM/YYYY HH:mm:ss')}*

\`\`\`WAKTU DIHAPUS\`\`\`
*${time}*`
            ntfvx.sendMessage(from, type_vid, MessageType.text, fakeandel)
            ntfvx.sendMessage(from, media, type, options)

        } else if  (type === 'audioMessage'){ 
            let media = await ntfvx.downloadMediaMessage(wen)
           let type_aud = 
`\`\`\`ANTI DELETE\`\`\`
\`\`\`TIPE:\`\`\` *AUDIO/VN*

\`\`\`PENGIRIM\`\`\` 
*@${sender.replace('@s.whatsapp.net', '')}*

\`\`\`WAKTU DIKIRIM\`\`\`
*${moment.unix(wen.messageTimestamp).format('DD/MM/YYYY HH:mm:ss')}*

\`\`\`WAKTU DIHAPUS\`\`\`
*${time}*`
            ntfvx.sendMessage(from, type_aud, MessageType.text, fakeandel)
            ntfvx.sendMessage(from, media, type, options)

        } else if (type === 'documentMessage'){ 
            let media = await ntfvx.downloadMediaMessage(wen)
           let type_doc = 
`\`\`\`ANTI DELETE\`\`\`
\`\`\`TIPE:\`\`\` *DOKUMEN*

\`\`\`PENGIRIM\`\`\` 
*@${sender.replace('@s.whatsapp.net', '')}*

\`\`\`WAKTU DIKIRIM\`\`\`
*${moment.unix(wen.messageTimestamp).format('DD/MM/YYYY HH:mm:ss')}*

\`\`\`WAKTU DIHAPUS\`\`\`
*${time}*`
            ntfvx.sendMessage(from, type_doc, MessageType.text, fakeandel)
            ntfvx.sendMessage(from, media, type, options)

        } else if (type === 'locationMessage'){ 
            let media = await ntfvx.downloadMediaMessage(wen)
           let type_loc = 
`\`\`\`ANTI DELETE\`\`\`
\`\`\`TIPE:\`\`\` *LOKASI*

\`\`\`PENGIRIM\`\`\` 
*@${sender.replace('@s.whatsapp.net', '')}*

\`\`\`WAKTU DIKIRIM\`\`\`
*${moment.unix(wen.messageTimestamp).format('DD/MM/YYYY HH:mm:ss')}*

\`\`\`WAKTU DIHAPUS\`\`\`
*${time}*`
            ntfvx.sendMessage(from, type_loc, MessageType.text, fakeandel)
            ntfvx.sendMessage(from, msgOpt, type, options)

        } else {
            ntfvx.reply(from, tmxt, wen)
            ntfvx.sendMessage(from, msgOpt, type, options)
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}