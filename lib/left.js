const {
	MessageType,
	Mimetype,
    WAConnection
} = require("@adiwajshing/baileys");
const fs = require('fs')
const _left = require('./welcomeleft')

module.exports = left = async (ntfvx, anj) => {
    //console.log(event.action)
    const left = JSON.parse(fs.readFileSync('./database/left.json'))
    const isLeft = left.includes(anj.jid)
    const setleft = JSON.parse(fs.readFileSync('./database/setleft.json'))
    const isSetLeft = _left.cekleft(anj.jid, setleft)

    try {
        if (anj.action == 'remove' && isLeft) {
            const mdata = await ntfvx.groupMetadata(anj.jid)
            const conts = ntfvx.contacts[anj.participants[0]] || { notify: jid.replace(/@.+/, '') }
			const pushname = conts.notify || conts.vname || conts.name || '-'
            const name = mdata.subject
            if (isSetLeft){
                const pesannya = _left.getleft(anj.jid, setleft)
                const pesannyu = `${pesannya}`
                const pesannyo = (pesannyu.replace(/@nama/gi, `@${anj.participants[0].split('@')[0]}`))
                const pesannyi1 = (pesannyo.replace(/@grup/gi, pushname))
                const pesannyi2 = (pesannyi1.replace(/@grup/gi, name))
                await ntfvx.sendMessage(mdata.id, pesannyi2, MessageType.extendedText,{contextInfo: { mentionedJid: [anj.participants[0]]}})
            } else {
                const datanya = `Babay @${anj.participants[0].split('@')[0]}, selamat tinggal dari ${name}`
                await ntfvx.sendMessage(mdata.id, datanya, MessageType.extendedText,{contextInfo: { mentionedJid: [anj.participants[0]]}})
            }
        }
    } catch (err) {
        console.log(err)
    }
}