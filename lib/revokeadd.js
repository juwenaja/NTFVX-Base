const {
	MessageType,
	} = require("@adiwajshing/baileys");
const fs = require("fs");
const { getBuffer, sleep } = require('./customfunct')
const moment = require("moment-timezone")

module.exports = revokeadd = async (ntfvx, wen) => {
    const revokeadd = JSON.parse(fs.readFileSync('./database/revokeadd.json'))
    const isRevoke = revokeadd.includes(wen.jid)
    try {
        if (wen.action == 'add' && isRevoke) {
            const mdata = await ntfvx.groupMetadata(wen.jid)
            const name = mdata.subject
            const member = mdata.participants.length
            const time = moment.tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')
        
            const revokeInvite = (jid) => {
            const json = ['action', 'inviteReset', jid];
            const response = ntfvx.query({ json, expect200: true });
            return response; }

            // Photo Profile Member
            try {
                pic = await ntfvx.getProfilePicture(`${wen.participants[0].split('@')[0]}@c.us`)
            } catch {
                pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            } 
                var thumb = await getBuffer(pic)
                const messagenya = 
`*Haii @${wen.participants[0].split('@')[0]}*
*Welcome To* ${name}

\`\`\`Joined On\`\`\`
*${time}*`
                const fakeya = { 
                        caption: messagenya, 
                        contextInfo: { 
                        participant: `0@s.whatsapp.net`, 
                        mentionedJid: [wen.participants[0]],
                         remoteJid: "status@broadcast", 
                         forwardingScore: 9999, 
                         isForwarded: true, 
                         'quotedMessage': 
                         { "locationMessage":
                          { "name": `Hello Newmem!`, 
                          'jpegThumbnail': fs.readFileSync('./media/image/ntfvx.jpeg')
                            }
                         }
                    }
                }
                
                //await ntfvx.sendMessage(mdata.id, messagenya, MessageType.extendedText, fakeya)
                await ntfvx.sendMessage(mdata.id, thumb, MessageType.image, fakeya)
                await sleep(500)
                await ntfvx.sendMessage(mdata.id, '```Revoke Link...```', MessageType.extendedText)
                await sleep(1000)
                await revokeInvite(mdata.id)
                await sleep(500)
                await ntfvx.sendMessage(mdata.id, '```Succsess!```', MessageType.extendedText)
                

            }
    } catch (err) {
        console.log(err)
    }
}
