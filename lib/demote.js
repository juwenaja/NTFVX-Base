const {
	MessageType,
	Mimetype,
    WAConnection
} = require("@adiwajshing/baileys");
const fs = require('fs')
const _demote = require('./promotedemote')

module.exports = demote = async (ntfvx, anj) => {
    //console.log(event.action)
    const demote = JSON.parse(fs.readFileSync('./database/demote.json'))
    const isDemote = demote.includes(anj.jid)
    const setDemote = JSON.parse(fs.readFileSync('./database/setdemote.json'))
    const isSetDemote = _demote.cekdemote(anj.jid, setDemote)

    try {
        if (anj.action == 'demote' && isDemote) {
            const mdata = await ntfvx.groupMetadata(anj.jid)
            const conts = ntfvx.contacts[anj.participants[0]] || { notify: jid.replace(/@.+/, '') }
			const pushname = conts.notify || conts.vname || conts.name || '-'
            const name = mdata.subject
            if (isSetDemote){
                const pesannya = _demote.getdemote(anj.jid, setDemote)
                const pesannyu = `${pesannya}`
                const pesannyo = (pesannyu.replace(/@nama/gi, `@${anj.participants[0].split('@')[0]}`))
                const pesannyi1 = (pesannyo.replace(/@grup/gi, pushname))
                const pesannyi2 = (pesannyi1.replace(/@grup/gi, name))
                await ntfvx.sendMessage(mdata.id, pesannyi2, MessageType.extendedText,{contextInfo: { mentionedJid: [anj.participants[0]]}})
            } else {
                const datanya = `Yahh @${anj.participants[0].split('@')[0]} di udm dari ${name} xixixi`
                await ntfvx.sendMessage(mdata.id, datanya, MessageType.extendedText,{contextInfo: { mentionedJid: [anj.participants[0]]}})
            }
        }
    } catch (err) {
        console.log(err)
    }
}