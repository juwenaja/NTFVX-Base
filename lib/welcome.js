const {
	MessageType,
	Presence
} = require("@adiwajshing/baileys");
const fs = require('fs')
const _welkom = require('./welcomeleft')

module.exports = welcome = async (ntfvx, anj) => {
    //console.log(event.action)
    const welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))
    const isWelkom = welkom.includes(anj.jid)
    const setwelkom = JSON.parse(fs.readFileSync('./database/setwelkom.json'))
    const isSetWelkom = _welkom.cekwelkom(anj.jid, setwelkom)
    const { getBuffer, sleep } = require("../lib/myfunc");

    try {
        if (anj.action === 'add'){
            if (anj.participants[0] === ntfvx.user.jid){
                ntfvx.updatePresence(anj.jid, Presence.composing)
                await sleep(2500)
                ntfvx.sendMessage(anj.jid, `Haii aku NTFVX - BOT!\n\nUntuk melihat menu dari NTFVX - BOT kalian bisa ketik #menu`, MessageType.text)}
        if (isWelkom) {
            const mdata = await ntfvx.groupMetadata(anj.jid)
            const conts = ntfvx.contacts[anj.participants[0]] || { notify: jid.replace(/@.+/, '') }
			const pushname = conts.notify || conts.vname || conts.name || '-'
            const name = mdata.subject
            if (isSetWelkom){
                const pesannya = _welkom.getwelkom(anj.jid, setwelkom)
                const pesannyu = `${pesannya}`
                const pesannyo = (pesannyu.replace(/@nama/gi, `@${anj.participants[0].split('@')[0]}`))
                const pesannyi1 = (pesannyo.replace(/@grup/gi, pushname))
                const pesannyi2 = (pesannyi1.replace(/@grup/gi, name))
                await ntfvx.sendMessage(mdata.id, pesannyi2, MessageType.extendedText,{contextInfo: { mentionedJid: [anj.participants[0]]}})
            } else {
                const datanya = `Hai @${anj.participants[0].split('@')[0]}, Selamat datang di ${name}`
                await ntfvx.sendMessage(mdata.id, datanya, MessageType.extendedText,{contextInfo: { mentionedJid: [anj.participants[0]]}})
            } }
        }
    } catch (err) {
        console.log(err)
    }
}