const {
	MessageType,
	Mimetype,
    WAConnection
} = require("@adiwajshing/baileys");
const fs = require('fs')
const setrole = require("./setmessage")

module.exports = role = async (ntfvx, wen) => {
    try {
    //console.log(event.action)
    const demote = JSON.parse(fs.readFileSync('./database/group/demote.json'))
    const isDemote = demote.includes(wen.jid)
    const setDemote = JSON.parse(fs.readFileSync('./database/group/setdemote.json'))
    const isSetDemote = setrole.cekdemote(wen.jid, setDemote)

    const promote = JSON.parse(fs.readFileSync('./database/group/promote.json'))
    const isPromote = promote.includes(wen.jid)
    const setpromote = JSON.parse(fs.readFileSync('./database/group/setpromote.json'))
    const isSetPromote = setrole.cekpromote(wen.jid, setpromote)

        if (wen.action == 'promote' && isPromote) {
            const mdata = await ntfvx.groupMetadata(wen.jid)
            const conts = ntfvx.contacts[wen.participants[0]] || { notify: jid.replace(/@.+/, '') }
			const pushname = conts.notify || conts.vname || conts.name || '-'
            const name = mdata.subject
            if (isSetPromote){
                const pesannya = setrole.getpromote(wen.jid, setpromote)
                const pesannyu = `${pesannya}`
                const pesannyo = (pesannyu.replace(/@nama/gi, `@${wen.participants[0].split('@')[0]}`))
                const pesannyi1 = (pesannyo.replace(/@grup/gi, pushname))
                const pesannyi2 = (pesannyi1.replace(/@grup/gi, name))
                await ntfvx.sendMessage(mdata.id, pesannyi2, MessageType.extendedText,{contextInfo: { mentionedJid: [wen.participants[0]]}})
            } else {
                const datanya = `Selamat @${wen.participants[0].split('@')[0]} di promote dari ${name}`
                await ntfvx.sendMessage(mdata.id, datanya, MessageType.extendedText,{contextInfo: { mentionedJid: [wen.participants[0]]}})
            }
        } else if (wen.action == 'demote' && isDemote) {
            const mdata = await ntfvx.groupMetadata(wen.jid)
            const conts = ntfvx.contacts[wen.participants[0]] || { notify: jid.replace(/@.+/, '') }
			const pushname = conts.notify || conts.vname || conts.name || '-'
            const name = mdata.subject
            if (isSetDemote){
                const pesannya = setrole.getdemote(wen.jid, setDemote)
                const pesannyu = `${pesannya}`
                const pesannyo = (pesannyu.replace(/@nama/gi, `@${wen.participants[0].split('@')[0]}`))
                const pesannyi1 = (pesannyo.replace(/@grup/gi, pushname))
                const pesannyi2 = (pesannyi1.replace(/@grup/gi, name))
                await ntfvx.sendMessage(mdata.id, pesannyi2, MessageType.extendedText,{contextInfo: { mentionedJid: [wen.participants[0]]}})
            } else {
                const datanya = `Yahh @${wen.participants[0].split('@')[0]} di udm dari ${name} xixixi`
                await ntfvx.sendMessage(mdata.id, datanya, MessageType.extendedText,{contextInfo: { mentionedJid: [wen.participants[0]]}})
            }
        }
    } catch (err) {
        console.log(err)
    }
}