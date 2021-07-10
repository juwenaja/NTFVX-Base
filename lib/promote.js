const {
	MessageType,
	Mimetype,
    WAConnection
} = require("@adiwajshing/baileys");
const fs = require('fs')
const _promote = require('./promotedemote')

module.exports = promote = async (ntfvx, anj) => {
    //console.log(event.action)
    const promote = JSON.parse(fs.readFileSync('./database/promote.json'))
    const isPromote = promote.includes(anj.jid)
    const setpromote = JSON.parse(fs.readFileSync('./database/setpromote.json'))
    const isSetPromote = _promote.cekpromote(anj.jid, setpromote)

    try {
        if (anj.action == 'promote' && isPromote) {
            const mdata = await ntfvx.groupMetadata(anj.jid)
            const conts = ntfvx.contacts[anj.participants[0]] || { notify: jid.replace(/@.+/, '') }
			const pushname = conts.notify || conts.vname || conts.name || '-'
            const name = mdata.subject
            if (isSetPromote){
                const pesannya = _promote.getpromote(anj.jid, setpromote)
                const pesannyu = `${pesannya}`
                const pesannyo = (pesannyu.replace(/@nama/gi, `@${anj.participants[0].split('@')[0]}`))
                const pesannyi1 = (pesannyo.replace(/@grup/gi, pushname))
                const pesannyi2 = (pesannyi1.replace(/@grup/gi, name))
                await ntfvx.sendMessage(mdata.id, pesannyi2, MessageType.extendedText,{contextInfo: { mentionedJid: [anj.participants[0]]}})
            } else {
                const datanya = `Selamat @${anj.participants[0].split('@')[0]} di promote dari ${name}`
                await ntfvx.sendMessage(mdata.id, datanya, MessageType.extendedText,{contextInfo: { mentionedJid: [anj.participants[0]]}})
            }
        }
    } catch (err) {
        console.log(err)
    }
}