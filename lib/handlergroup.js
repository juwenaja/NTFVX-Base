const { MessageType } = require('@adiwajshing/baileys');

module.exports = async(ntfvx, zxc) => {
    try {
        const setmessage = require('./setmessage')
        const from = zxc.key.remoteJid
        const mdata = await ntfvx.groupMetadata(from)
        const groupName = mdata.subject
        const conts = ntfvx.contacts[zxc.messageStubParameters[0]] || { notify: jid.replace(/@.+/, '') }
        const pushname = conts.notify || conts.vname || conts.name || '-'

        // WELCOME
        const welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
        const isWelcome = welcome.includes(from)
        const setwelcome = JSON.parse(fs.readFileSync('./database/group/setwelcome.json'))
        const isSetWelcome = setwelcome.includes(from)

        //ADD
        const add = JSON.parse(fs.readFileSync('./database/group/add.json'))
        const iSAdd = add.includes(from)
        const setadd = JSON.parse(fs.readFileSync('./database/group/setadd.json'))
        const isSetAdd = setadd.includes(from)

        //LEFT
        const left = JSON.parse(fs.readFileSync('./database/group/left.json'))
        const isLeft = left.includes(from)
        const setleft = JSON.parse(fs.readFileSync('./database/group/setleft.json'))
        const isSetLeft = setleft.includes(from)

        // KICK
        const kick = JSON.parse(fs.readFileSync('./database/group/kick.json'))
        const isKick = kick.includes(from)
        const setkick = JSON.parse(fs.readFileSync('./database/group/setkick.json'))
        const isSetKick = setkick.includes(from)
        
switch (zxc.messageStubType){
    
    //-------------------- | STATUS NAMA GROUP DIUBAH
    case 21:{ 
        await ntfvx.sendMessage(from, `Nama group diubah oleh @${zxc.participant.split("@")[0]}`, MessageType.extendedText, 
            { contextInfo: { mentionedJid: [zxc.participant] }})
    }
    break
    //-------------------- | STATUS PP GROUP DIUBAH
    case 22:{ 
        await ntfvx.sendMessage(from, `PP Group diubah oleh @${zxc.participant.split("@")[0]}`, MessageType.extendedText, 
            { contextInfo: { mentionedJid: [zxc.participant] }})
    }
    break
    //-------------------- | STATUS LINK GROUP DI RESET
    case 23:{ 
        await ntfvx.sendMessage(from, `Link group di reset oleh @${zxc.participant.split("@")[0]}`, MessageType.extendedText, 
            { contextInfo: { mentionedJid: [zxc.participant] }})
    }
    break
    //-------------------- | STATUS DESKRIPSI GROUP DIUBAH
    case 24:{ 
        await ntfvx.sendMessage(from, `Deskripsi group diubah oleh @${zxc.participant.split("@")[0]}`, MessageType.extendedText, 
            { contextInfo: { mentionedJid: [zxc.participant] }})
    }
    break
    //-------------------- | STATUS OPEN / CLOSE GROUP
    case 26:{
        if (zxc.messageStubParameters[0] == 'on'){ 
        await ntfvx.sendMessage(from, `Group telah ditutup oleh @${zxc.participant.split("@")[0]}`, MessageType.extendedText, 
        { contextInfo: { mentionedJid: [zxc.participant] }})
        } else if (zxc.messageStubParameters[0] == 'off'){
            await ntfvx.sendMessage(from, `Group telah dibuka oleh @${zxc.participant.split("@")[0]}`, MessageType.extendedText, 
            { contextInfo: { mentionedJid: [zxc.participant] }})
        }
     }
        break
    //-------------------- | STATUS ADD ORANG
    case 27:{
        const datanya = `Haii @${zxc.messageStubParameters[0].split('@')[0]} selamat datang di ${groupName}\nSelalu taati peraturan yaaa.\n\nStatus Join: Add`
        ntfvx.sendMessage(from, datanya, MessageType.extendedText,{ contextInfo: { mentionedJid: [zxc.messageStubParameters[0]]
            }})
        }
    break
    //-------------------- | STATUS KICK ORANG
    case 28:{
        const datanya = `@${zxc.messageStubParameters[0].split('@')[0]} terkick`
        ntfvx.sendMessage(from, datanya, MessageType.extendedText,{ contextInfo: { mentionedJid: [zxc.messageStubParameters[0]]
            }})
        }
    break
     //-------------------- | STATUS SESORANG MASUK VIA TAUTAN
    case 31:{
        if (isWelcome) {
            if (isSetWelcome) {
                const pesannya = setmessage.getwelcome(from, setwelcome)
                const pesannyu = `${pesannya}`
                const pesannyo = (pesannyu.replace(/@nama/gi, `@${zxc.messageStubParameters[0].split('@')[0]}`))
                const pesannyi = (pesannyo.replace(/@grup/gi, groupName))
                await ntfvx.sendMessage(from, pesannyi, MessageType.extendedText,{contextInfo: { mentionedJid: [zxc.messageStubParameters[0]]}})
            } else {
                const datanya = `Haii @${zxc.messageStubParameters[0].split('@')[0]} selamat datang di ${groupName}.\nSelalu taati peraturan yaaa.\n\nStatus Join: Link Group`
                ntfvx.sendMessage(from, datanya, MessageType.extendedText,{ contextInfo: { mentionedJid: [zxc.messageStubParameters[0]]
                }})
            }
        }
    }
    break
    //-------------------- | STATUS SESORANG KELUAR DARI GRUP
    case 32:{
        const datanya = `@${zxc.messageStubParameters[0].split('@')[0]} telah keluar dari group`
        ntfvx.sendMessage(from, datanya, MessageType.extendedText,{ contextInfo: { mentionedJid: [zxc.messageStubParameters[0]]
        }})
    }
    break
  
        }
} catch (err) {
    console.log(color('[ERROR]', 'red'), err)
        }
}
