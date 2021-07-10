"use strict";
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
    MessageOptions,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
    mentionedJid,
    WA_DEFAULT_EPHEMERAL
} = require("@adiwajshing/baileys");

const fs = require("fs")
const os = require('os')
const pm2 = require('pm2')
const toMs = require('ms')
const ms = require('parse-ms')
const qs = require("qs")
const axios = require("axios")
const qrcode = require("qrcode")
const yts = require( 'yt-search')
const request = require('request')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const google = require('google-it')
const canvas = require("canvacord")
const text2png = require("text2png")
const base64Img = require('base64-img')
const ffmpeg = require('fluent-ffmpeg')
const speed = require('performance-now')
const moment = require("moment-timezone")
const get = require('got');
const cron = require('node-cron');
const ocrtess = require('node-tesseract-ocr')
const { spawn, exec} = require("child_process")
const translate = require('@vitalets/google-translate-api')

//LIB
//LEVELING
const card = require('./lib/card')
const level = require('./lib/level')

// TICTACTOE
const tictac = require("./lib/tictac")
const { isTicTacToe, getPosTic } = require("./lib/tictactoe")

// EXIF
const Exif = require('./lib/exif')
const exif = new Exif()

// ALL LIB
const game = require("./lib/game");
const afk = require("./lib/afk");
const _sewa = require("./lib/sewa");
const _prem = require("./lib/premium");
const msgFilter = require('./lib/antispam');
const { yta, ytv } = require("./lib/ytdl");
const { uploadimg } = require("./lib/uploadimg")
const setmessage = require('./lib/setmessage')
const urlShortener = require('./lib/shortener')
const { webp2mp4File} = require('./lib/webp2mp4')
const { color, bgcolor } = require('./lib/color')
const { requestPay, checkPay } = require("./lib/saweria");
const { getUser, getPost, searchUser } = require('./lib/insta');
const { tamHari, tamWaktu, tamtanggal } = require('./lib/time');
const { addCtrlBot, unCtrlBot, CtrlBotExp, cekCtrlBot } = require('./lib/ctrlbot');
const { addBanned, unBanned, BannedExpired, cekBannedUser } = require("./lib/banned");
const { serialize, getBuffer, getRandom, getGroupAdmins, runtime } = require("./lib/myfunc");
const { addBadword, delBadword, isKasar, addCountKasar, isCountKasar, delCountKasar } = require("./lib/badword");
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("./lib/limit");

// SCRAPING
const { 
    wallpaper, 
    tebakgmbr, 
    musicallydown, 
    musix, 
    randcerpen, 
    stiksearch, 
    instagramDown, 
    SearchFilm, 
    ttdl, 
    igdl, 
    igstory, 
    twitter,
    ttdownlod } = require('./lib/helper');
const { reply } = require("canvacord/src/Canvacord");

let setting = JSON.parse(fs.readFileSync('./config.json'));
let mess = JSON.parse(fs.readFileSync('./database/mess.json'));
const ban = JSON.parse(fs.readFileSync('./database/ban.json'));
const sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
const mute = JSON.parse(fs.readFileSync('./database/mute.json'));
const limit = JSON.parse(fs.readFileSync('./database/limit.json'));
const glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
const balance = JSON.parse(fs.readFileSync('./database/balance.json'));
const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
const badword = JSON.parse(fs.readFileSync('./database/badword.json'));
const revokeadd = JSON.parse(fs.readFileSync('./database/revokeadd.json'))
const antiporn = JSON.parse(fs.readFileSync('./database/antiporn.json'));
const autostick = JSON.parse(fs.readFileSync('./database/autostick.json'))
const ctrlbot = JSON.parse(fs.readFileSync('./database/ctrlbot.json'));
const autodetect = JSON.parse(fs.readFileSync('./database/autodetect.json'))
const chatsimi = JSON.parse(fs.readFileSync('./database/chatsimi.json'))
const reminder = JSON.parse(fs.readFileSync('./database/reminder.json'))
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const pendaftar = JSON.parse(fs.readFileSync('./database/user.json'));
const senbadword = JSON.parse(fs.readFileSync('./database/senbadword.json'));
const grupbadword = JSON.parse(fs.readFileSync('./database/grupbadword.json'));

// DATABASE HANDLER GROUP
const welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const setwelcome = JSON.parse(fs.readFileSync('./database/group/setwelcome.json'))
const setinvite = JSON.parse(fs.readFileSync('./database/group/setinvite.json'))
const left = JSON.parse(fs.readFileSync('./database/group/left.json'))
const setleft = JSON.parse(fs.readFileSync('./database/group/setleft.json'))
const setkick = JSON.parse(fs.readFileSync('./database/group/setkick.json'))
const promote = JSON.parse(fs.readFileSync('./database/group/promote.json'))
const setpromote = JSON.parse(fs.readFileSync('./database/group/setpromote.json'))
const demote = JSON.parse(fs.readFileSync('./database/group/demote.json'))
const setdemote = JSON.parse(fs.readFileSync('./database/group/setdemote.json'))
const anounce = JSON.parse(fs.readFileSync('./database/group/announce.json'))

// LEVELING
const _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/level.json'))
const _bg = JSON.parse(fs.readFileSync('./database/background.json'))

// GLOBAL HIT
global.hit = {}

let tictactoe = [];
let tebakgambar = [];
let tebaklirik = [];
let caklontong = [];
let family100 = []; 
let multicasino = [];

// JADI BOT
if (global.conns instanceof Array) console.log()
else global.conns = []

// SETTING
let {
    prefa,
    multi,
    nopref,
    ownerNumber,
    limitCount,
    lolkey,
    fake,
    autodel,
    autodelmsg,
    timedel,
    gamewaktu
} = setting

const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async(ntfvx, wen, blocked, _afk) => {
    try {
        const { type, quotedMsg, isGroup, isQuotedMsg, mentioned, sender, from, fromMe, pushname, chats, isBaileys } = wen
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
        const budy =
        (type === 'conversation' && wen.message.conversation) 
        ? wen.message.conversation : (type == 'imageMessage') && wen.message.imageMessage.caption 
        ? wen.message.imageMessage.caption : (type == 'videoMessage') && wen.message.videoMessage.caption 
        ? wen.message.videoMessage.caption : (type == 'extendedTextMessage') && wen.message.extendedTextMessage.text 
        ? wen.message.extendedTextMessage.text  : (type == 'listResponseMessage') && wen.message.listResponseMessage.selectedDisplayText
        ? wen.message.listResponseMessage.selectedDisplayText : 'Unknown'
        const command = budy.toLowerCase().split(' ')[0] || ''
        if (multi){
            var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^z]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^z]/gi) : '#'
        } else {
            if (nopref){
                prefix = ''
            } else {
                prefix = prefa
            }
        }

        moment.tz.setDefault('Asia/Jakarta').locale('id')
        //const SN = GenerateSerialNumber("000000000000000000000000")
        const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
        const WaktuJKt = new Date().toLocaleString("en-US", {timeZone: 'Asia/Jakarta'})
        const args = budy.split(' ')
        const q = budy.slice(command.length + 1, budy.length)
        const arg = budy.slice(command.length + 1, budy.length)
        const cmsg = budy.slice(command.length + 0, budy.length)
        const body = budy.startsWith(prefix) ? budy : ''
        const isCmd = command.startsWith(prefix)
        
        const botNumber = ntfvx.user.jid
        const groupMetadata = isGroup ? await ntfvx.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
        const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const isOwner = ownerNumber.includes(sender)
        const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
        const isControlBot = cekCtrlBot(sender, ctrlbot)
        const isBan = cekBannedUser(sender, ban)
        const isSewa = _sewa.checkSewaGroup(from, sewa)
        //const isBanned = cekBannedUser(sender, ban)
        const isAntiPorn = isGroup ? antiporn.includes(from) : false
        const isAutoDetect = isGroup ? autodetect.includes(from) : false
        const isAntiLink = isGroup ? antilink.includes(from) : false
        const isAutoStick = isGroup ? autostick.includes(from) : false
        const welcomeon = isGroup ? welcome.includes(from) : false
		const isSimi = isGroup ? chatsimi.includes(from) : false
        const lefton = isGroup ? left.includes(from) : false
        const promoteon = isGroup ? promote.includes(from) : false
        const demoteon = isGroup ? demote.includes(from) : false
        const isSetWelcome = setmessage.cekwelcome(from, setwelcome)
        const isSetLeft = setmessage.cekleft(from, setleft)
        const isSetInvite = setmessage.cekadd(from, setinvite)
        const isSetKick = setmessage.cekkick(from, setkick)
		const isSetPromote = setmessage.cekpromote(from, setpromote)
        const isSetDemote = setmessage.cekdemote(from, setdemote)
        const isAnnounce = isGroup ? anounce.includes(from) : false
        const isBadword = isGroup ? grupbadword.includes(from) : false
        const isMuted = isGroup ? mute.includes(from) : false
        const revokeinv = isGroup ? revokeadd.includes(from) : false
        const isLevelingOn = isGroup ? _leveling.includes(from) : false
        const levelRole = level.getLevelingLevel(sender, _level)
        const isUser = pendaftar.includes(sender)
        
        const gcounti = setting.gcount
        const gcount = isPremium ? gcounti.prem : gcounti.user

        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        function monospace(string) {
            return '```' + string + '```'
        }   
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function randomNomor(angka){
            return Math.floor(Math.random() * angka) + 1
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        const reply = (teks) => {
            return ntfvx.sendMessage(from, teks, text, {quoted:wen})
        }
        const sendMess = (hehe, teks) => {
            return ntfvx.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
            let ai = (id == null || id == undefined || id == false) ? ntfvx.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : ntfvx.sendMessage(from, teks.trim(), extendedText, {quoted: wen, contextInfo: {"mentionedJid": memberr}})
            return ai
        }
        const sendStickerUrl = async(to, url) => {
            var names = Date.now() / 10000;
            var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            download(url, './media/sticker/' + names + '.png', async function () {
                console.log('done');
                let filess = './media/sticker/' + names + '.png'
                let asw = './media/sticker/' + names + '.webp'
                exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                    if (err) return console.log(err)
                exec(`webpmux -set exif ./media/sticker/data.exif ${asw} -o ${asw}`, async (error) => {
                    if (error) return console.log(error)
                    let media = fs.readFileSync(asw)
                    ntfvx.sendMessage(to, media, MessageType.sticker, {quoted: wen})
                    fs.unlinkSync(asw)	
                })
                });
            });
        }
        const SendMediaFromUrl = async(ntfvx, to, url, text="", wen, mids=[]) =>{
            if(mids.length > 0){
                text = normalizeMention(to, text, mids)
            }
            const fn = Date.now() / 10000;
            const filename = fn.toString()
            let mime = ""
            var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    mime = res.headers['content-type']
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            download(url, filename, async function () {
                console.log('done');
                let media = fs.readFileSync(filename)
                let type = mime.split("/")[0]+"Message"
                if(mime === "image/gif"){
                    type = MessageType.video
                    mime = Mimetype.gif
                }
                if(mime === "application/pdf"){
                    type = MessageType.document
                    mime = Mimetype.pdf
                }
                if(mime.split("/")[0] === "audio"){
                    mime = Mimetype.mp4Audio
                }
                ntfvx.sendMessage(to, media, type, { quoted: wen, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                
                fs.unlinkSync(filename)
            });
        }
        async function sendFileFromUrl(from, url, caption, wen, men) {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            let type = mime.split("/")[0]+"Message"
            if(mime === "image/gif"){
                type = MessageType.video
                mime = Mimetype.gif
            }
            if(mime === "application/pdf"){
                type = MessageType.document
                mime = Mimetype.pdf
            }
            if(mime.split("/")[0] === "audio"){
                mime = Mimetype.mp4Audio
            }
            return ntfvx.sendMessage(from, await getBuffer(url), type, {caption: caption, quoted: wen, mimetype: mime, contextInfo: {"mentionedJid": men ? men : []}})
        }
        const sendMediaURL = async(to, url, text="", mids=[]) =>{
            if(mids.length > 0){
                text = normalizeMention(to, text, mids)
            }
            const fn = Date.now() / 10000;
            const filename = fn.toString()
            let mime = ""
            var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    mime = res.headers['content-type']
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            download(url, filename, async function () {
                console.log('done');
                let media = fs.readFileSync(filename)
                let type = mime.split("/")[0]+"Message"
                if(mime === "image/gif"){
                    type = MessageType.video
                    mime = Mimetype.gif
                }
                if(mime.split("/")[0] === "audio"){
                    mime = Mimetype.mp4Audio
                }
                ntfvx.sendMessage(to, media, type, { quoted: wen, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                
                fs.unlinkSync(filename)
            });
        }
        const textImg = (teks) => {
            return ntfvx.sendMessage(from, teks, text, {quoted: wen, thumbnail: fs.readFileSync(setting.pathImg)})
        }
        const isImage = (type === 'imageMessage')
        const isVideo = (type === 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedImage = isQuotedMsg ? (quotedMsg.type === 'imageMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? (quotedMsg.type === 'videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? (quotedMsg.type === 'stickerMessage') ? true : false : false

        const urlShortener = (url) => {
            return new Promise(async (resolve, reject) => {
                await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
                    .then(response => response.text())
                    .then(json => {
                        resolve(json)
                    })
                    .catch((err) => {
                        reject(err)
                    });
            })
        };
                // Mode
                if (ntfvx.mode === 'self'){
                    if (!isControlBot) return
                }
                // Anti link
                if (isGroup && isAntiLink && !isControlBot && !isGroupAdmins && isBotGroupAdmins){
                    if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                        reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                        ntfvx.groupRemove(from, [sender])
                    }
                }
        
                // Badword
                if (isGroup && isBadword && !isControlBot && !isGroupAdmins){
                    for (let kasar of badword){
                        if (chats.toLowerCase().includes(kasar)){
                            if (isCountKasar(sender, senbadword)){
                                if (!isBotGroupAdmins) return reply(`Kamu beruntung karena bot bukan admin`)
                                reply(`*「 ANTI BADWORD 」*\n\nSepertinya kamu sudah berkata kasar lebih dari 5x, maaf kamu akan di kick`)
                                ntfvx.groupRemove(from, [sender])
                                delCountKasar(sender, senbadword)
                            } else {
                                addCountKasar(sender, senbadword)
                                reply(`Kamu terdeteksi berkata kasar\nJangan ulangi lagi atau kamu akan dikick ${isCountKasar}`)
                            }
                        }
                    }
                }
            // Reseting Limit Automate
            cron.schedule('0 0 * * *', () => {
            const reset = []
            _limit = reset
            console.log('Mereset Limit...')
            fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
            console.log('Success Reset Limit!')
            }, {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        })
            // Funct Anti Spam
            const spampm = () => {
                console.log(color('[SPAM]', 'red'), color(moment(wen.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
                msgFilter.addSpam(sender, spam)
                if (msgFilter.isSpam(sender, ban)){
                addBanned(sender, '30m', ban)
                //reply(`Kamu melakukan spam\nKamu akan diban selama 30menit`)
                mentions(`*Maaf @${sender.split("@")[0]}* kamu dibanned karena melakukan spam command dengan bot, silahkan tunggu 30 menit lagi`, [sender], true)
                } else {
               // reply(`Hai\nKamu terdeteksi menggunakan command tanpa jeda\nHarap tunggu 5 detik`)
                mentions(`*Haii @${sender.split("@")[0]}* kamu terdeteksi menggunakan command tanpa jeda / spam.\n\nHarap tunggu 5 detik, terima kasih`, [sender], true)
                }
            }
            const spamgr = () => {
                console.log(color('[SPAM]', 'red'), color(moment(wen.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
                msgFilter.addSpam(sender, spam)
                    if (msgFilter.isSpam(sender, ban)){
                addBanned(sender, '30m', ban)
                //reply(`Kamu melakukan spam\nKamu akan diban selama 30menit`)
                mentions(`*Maaf @${sender.split("@")[0]}* kamu dibanned karena melakukan spam command dengan bot, silahkan tunggu 30 menit lagi`, [sender], true)
                } else {
                mentions(`*Haii @${sender.split("@")[0]}* kamu terdeteksi menggunakan command tanpa jeda / spam.\n\nHarap tunggu 5 detik, terima kasih`, [sender], true)
                //reply(`Hai\nKamu terdeteksi menggunakan command tanpa jeda\nHarap tunggu 5 detik`)
                }
            }
                // AntiSpam
                if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
                if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
                if (isCmd && !isControlBot && !isPremium) msgFilter.addFilter(sender)
        
                // Banned
                if (isBan) return
                BannedExpired(ban)
        
                // MUTE
                if (isMuted){
                    if (!isGroupAdmins && !isControlBot) return
                    if (chats.toLowerCase().startsWith(prefix+'unmute')){
                        let anu = mute.indexOf(from)
                        mute.splice(anu, 1)
                        fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                        reply(`Bot telah diunmute di group ini`)
                    }
                }
                // FUNCT GAME 
        
                // TicTacToe
                if (isTicTacToe(from, tictactoe)) tictac(ntfvx, chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)
        
                // FUNCT GAME WAKTU
                game.cekWaktuTG(ntfvx, tebakgambar)
                game.cekWaktuGM(ntfvx, tebaklirik)
                game.cekWaktuGM(ntfvx, caklontong)
                game.cekWaktuFam(ntfvx, family100)
        
                // Tebak Gambar
                if (game.isTebakGambar(from, tebakgambar) && isUser){
                    if (chats.toLowerCase().includes(game.getJawabanTG(from, tebakgambar))){
                        var htgm = randomNomor(100)
                        addBalance(sender, htgm, balance)
                        await reply(`*Selamat jawaban kamu benar*\n*Jawaban : ${game.getJawabanTG(from, tebakgambar)}*\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? kirim *${prefix}tebakgambar*`)
                        tebakgambar.splice(game.getTGPosi(from, tebakgambar), 1)
                    }
                }
                // Tebak Lirik
                if (game.isGamePlay(from, tebaklirik) && isUser){
                    if (chats.toLowerCase().includes(game.getJawabanGM(from, tebaklirik))){
                        var hlkm = randomNomor(100)
                        addBalance(sender, hlkm, balance)
                        await reply(`*Selamat jawaban kamu benar*\n*Jawaban : ${game.getJawabanGM(from, tebaklirik)}*\n*Hadiah :* $${hlkm}\n\nIngin bermain lagi? kirim *${prefix}tebaklirik*`)
                        tebaklirik.splice(game.getGMPosi(from, tebaklirik), 1)
                    }
                }
                 // Cak Lontong
                 if (game.isGamePlay(from, caklontong) && isUser){
                    if (chats.toLowerCase().includes(game.getJawabanGM(from, caklontong))){
                        var hclm = randomNomor(100)
                        addBalance(sender, hclm, caklontong)
                        await reply(`*Selamat jawaban kamu benar*\n*Jawaban : ${game.getJawabanGM(from, caklontong)}*\n*Hadiah :* $${hclm}\n\nIngin bermain lagi? kirim *${prefix}tebaklirik*`)
                        caklontong.splice(game.getGMPosi(from, caklontong), 1)
                    }
                }
                // Family 100
                if (game.isfam(from, family100) && isUser){
                    var anjuy = game.getjawaban100(from, family100)
                    for (let i of anjuy){
                        if (chats.toLowerCase().includes(i)){
                            var htgmi = Math.floor(Math.random() * 20) + 1
                            addBalance(sender, htgmi, balance)
                            await reply(`*Jawaban benar*\n*Jawaban :* ${i}\n*Hadiah :* $${htgmi}\n*Jawaban yang blum tertebak :* ${anjuy.length - 1}`)
                            var anug = anjuy.indexOf(i)
                            anjuy.splice(anug, 1)
                        }
                    }
                    if (anjuy.length < 1){
                        ntfvx.sendMessage(from, `Semua jawaban sudah tertebak\nKirim *${prefix}family100* untuk bermain lagi`, text)
                        family100.splice(game.getfamposi(from, family100), 1)
                    }
                }
                // Casino
                const isCasino = (from) => {
                    let status = false
                    Object.keys(multicasino).forEach((i) => {
                        if (multicasino[i].id === from) {
                            status = true
                        }
                    })
                    return status
                }
                const getno = (from) => {
                    let position = null
                    Object.keys(multicasino).forEach((i) => {
                        if (multicasino[i].id === from) {
                            position = i
                        }
                    })
                    if (position !== null) {
                        return position
                    }
                }
                const addCasino = (from, penantang, ditantang, taruhan) => {
                    multicasino.push({
                        id: from,
                        penantang: penantang,
                        ditantang: ditantang,
                        taruhan: taruhan
                    })
                }
                if (isCasino(from)){
                    if (sender === multicasino[getno(from)].ditantang){
                        var pen = multicasino[getno(from)].penantang
                        var dit = multicasino[getno(from)].ditantang
                        var tar = multicasino[getno(from)].taruhan
                        if (chats.toLowerCase() === 'y'){
                            var pemain = Math.floor(Math.random() * 33) + 1
                            var komputer = Math.floor(Math.random() * 33) + 1
                            if (pemain === komputer){
                                mentions(`*@${pen.split('@')[0]} :* ${pemain}\n*@${dit.split('@')[0]} :* ${komputer}\n\nHasil seri, coba lain kali`, [pen, dit], false)
                            } else if (pemain < komputer){
                                kurangBalance(pen, tar, balance)
                                addBalance(dit, tar, balance)
                                mentions(`*@${pen.split('@')[0]} :* ${pemain}\n*@${dit.split('@')[0]} :* ${komputer}\n\n@${dit.split('@')[0]} Menang\nHadiah $${tar}`, [pen, dit], false)
                            } else if (komputer < pemain){
                                kurangBalance(dit, tar, balance)
                                addBalance(pen, tar, balance)
                                mentions(`*@${pen.split('@')[0]} :* ${pemain}\n*@${dit.split('@')[0]} :* ${komputer}\n\n@${pen.split('@')[0]} Menang\nHadiah $${tar}`, [pen, dit], false)
                            }
                            multicasino.splice(getno(from), 1)
                        } else if (chats.toLowerCase() === 't'){
                            mentions(`Yah @${dit.split('@')[0]} menolak\nKirim ${prefix}multicasino @tag taruhan`, [dit], false)
                            multicasino.splice(getno(from), 1)
                        }
                    }
                }
        
                // Premium
                _prem.expiredCheck(premium)
        
                // Auto Regist
                if (isCmd && !isUser){
                    pendaftar.push(sender)
                    fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar))
                } 
        
                // Premium
                const premiumPath = './database/premium'
                if (fs.existsSync(premiumPath + '/' + sender + '.json')) {
                    if (!isGroup && !chats.startsWith(prefix) && !fromMe && global.ntfvx.user.jid == ntfvx.user.jid) {
                        let data_sewa = JSON.parse(fs.readFileSync(premiumPath + '/' + sender + '.json'))
                        if (data_sewa.session == 'name') {
                                if (chats.length < 1) return reply(`Masukkan nama dengan benar`)
                                if (chats.length > 60) return reply( `Maaf kak nama yang telah dimasukan lebih dari 60 kata :(`)
                                data_sewa.data.name = chats
                                data_sewa.session = 'month'
                                fs.writeFile(premiumPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3), () => {
                                ntfvx.sendMessage(from, `Oke mau berapa bulan untuk jadi premium? 🤖
        
        *Rp15.000,- / bulan*
        
        _Termasuk pajak, rate 13% untuk ovo dan 11% selain ovo_
        
        Untuk lebih jelasnya atau apabila ada kendala silahkan hubungi : @${ownerNumber.replace(/@.+/g, '')}`, MessageType.text, { quoted: wen, contextInfo: { mentionedJid: [ownerNumber] } })
                                 })
                            } else if (data_sewa.session == 'month') {
                                if (isNaN(chats)) return reply( `Masukan hanya angka ya :)`)
                                if (Number(chats) > 12) return reply( `Maaf kak bulan tidak lebih dari 12 :(`)
                                data_sewa.data.month = Number(chats)
                                data_sewa.session = 'payment'
                                fs.writeFileSync(premiumPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                                reply( `Payment mau via apa kak? 💰😄
        
        Tersedia : ovo, gopay, dana, linkaja, qris`)
        
                            } else if (data_sewa.session == 'payment') {
                                const regexSesi = new RegExp('^(ovo|gopay|dana|linkaja|qris)$', 'g')
                                if (!chats.toLowerCase().match(regexSesi)) return reply( `Payment tersebut tidak terdaftar kak, mohon masukan yang sudah ada di list.`)
                                data_sewa.data.payment = chats.toLowerCase()
                                data_sewa.session = 'phone'
                                fs.writeFileSync(premiumPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                                reply( `Mohon masukan nomer telepon untuk melanjutkan pembayaran 📲\n\n_Contoh : 08552xxxxxxx_`)
                            } else if (data_sewa.session == 'phone') {
                                if (isNaN(chats)) return reply( `Masukan hanya angka ya :)`)
                                if (chats.length > 40) return reply( `Sepertinya tidak ada nomer telepon lebih dari 40 kata hmm..`)
                                data_sewa.data.phone = chats.toLowerCase()
                                data_sewa.session = 'email'
                                fs.writeFileSync(premiumPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                                reply( `Silahkan masukan email 📭, input ini opsional anda bisa skip dengan ketik *skip* untuk menggunakan email default owner.`)
                            } else if (data_sewa.session == 'email') {
                                if (chats !== 'skip' && !chats.includes("@")) return reply(`Masukkan email dengan benar`)
                                if (chats.length > 60) return reply( `Mohon masukan email dibawah 50 kata kak!`)
                                data_sewa.data.email = chats.toLowerCase() == 'skip' ? 'jszone29@gmail.com' : chats
                                data_sewa.session = 'pay'
                                fs.writeFileSync(premiumPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                                reply(`Oke kak pesanan sewa sudah siap 😇
        
        *Nama* : ${data_sewa.data.name}
        *Nomor*: ${data_sewa.number.replace(/@.+/g, '')}
        *Waktu premium (dalam bulan)* : ${data_sewa.data.month}
        *Payment* : ${data_sewa.data.payment} 
        *Email* : ${data_sewa.data.email == 'jszone29@gmail.com' ? '-' : data_sewa.data.email}
        
        Apakah data tersebut benar? akan gagal apabila terdapat kesalahan input.
        
        \`\`\`ketik Y untuk melanjutkan, N untuk mengulangi inputan dan ${prefix}premium batal untuk membatalkan pesanan\`\`\`
        `)
                            } else if (data_sewa.session == 'pay') {
                                if (chats.toLowerCase() == 'y') {
                                    const amountPay = data_sewa.data.month * 15000
                                    data_sewa.status = true
                                    data_sewa.session = 'pay'
                                    fs.writeFileSync(premiumPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                                    requestPay(data_sewa.data.name, data_sewa.data.phone, amountPay, data_sewa.data.email, 'PREMIUM ' + pushname, data_sewa.data.payment)
                                    .then(result => {
                                        sendMess(ownerNumber, `REQUEST PAY : \n${util.format(result)}`)
                                        let dataID = JSON.parse(fs.readFileSync(premiumPath + '/ids-match.json'))
                                        for (let i = 0;i < dataID.length;i++) {
                                            if (dataID[i]['SID'] == data_sewa['ID']) {
                                                dataID[i]['PAID'] = result.data.id
                                                dataID[i].data = data_sewa
                                                fs.writeFileSync(premiumPath + '/ids-match.json', JSON.stringify(dataID, null, 3))
                                            }
                                        }
                                        // Interval Cek Prembayaran
                                        let status = {
                                            from: ''
                                        }
                                        status.from = from
                                        let idPay = result.data.id
                                        let bayarINTV = setInterval(() => {
                                            let data_sewa = fs.existsSync(premiumPath + '/' + sender + '.json') ? JSON.parse(fs.readFileSync(premiumPath + '/' + sender + '.json')) : { status: false }
                                            checkPay(idPay)
                                            .then((rest) => {
                                                clearInterval(bayarINTV)
                                                sendMess(ownerNumber, `Sukses bayar dari ${status.from}\n${util.format(rest)}`)
                                                sendMess(status.from, `Terima kasih ${data_sewa.data.name} pembayaran telah diterima dengan ID ${result.data.id.toUpperCase()}, sesi premium anda telah diaktifkan untuk ${data_sewa.data.month} bulan ✅😇`)
                                                if (_prem.checkPremiumUser(data_sewa.number, premium)){
                                                    premium[_prem.getPremiumPosition(data_sewa.number, premium)].expired += toMs(data_sewa.data.month * 30 + "d")
                                                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                                                    let indexData_sewa = dataID.findIndex(r => r['ID'] == data_sewa['ID'])
                                                    dataID.splice(indexData_sewa, 1)
                                                    fs.writeFileSync(premiumPath + '/ids-match.json', JSON.stringify(dataID, null, 3))
                                                    fs.unlinkSync(premiumPath + '/' + sender + '.json')
                                                } else {
                                                    _prem.addPremiumUser(data_sewa.number, toMs(data_sewa.data.month * 30 + "d"), premium)
                                                    let indexData_sewa = dataID.findIndex(r => r['ID'] == data_sewa['ID'])
                                                    dataID.splice(indexData_sewa, 1)
                                                    fs.writeFileSync(premiumPath + '/ids-match.json', JSON.stringify(dataID, null, 3))
                                                    fs.unlinkSync(premiumPath + '/' + sender + '.json')
                                                }
                                            })
                                            .catch(() => { })
                                            if (!data_sewa.status) {
                                                console.log('Payment Dibatalkan atau Direset')
                                                clearInterval(bayarINTV)
                                            }
                                        }, 2000);
        
                                        const typeBayar = result.data.payment_type
                                        if (typeBayar == 'ovo') {
                                            reply( `Pesanan telah dibuat 😄
        
        _Silahkan cek notifikasi di aplikasi ovo anda_
        
        *ID* : ${result.data.id.toUpperCase()}
        *Nama* : ${result.data.donator.first_name}
        *Telepon* : ${result.data.donator.phone}
        *Email* : ${result.data.donator.email == 'jszone29@gmail.com' ? '-' : result.data.donator.email}
        *Total* : Rp${result.data.amount_raw}
        *Payment* : ${result.data.payment_type}
        
        \`\`\`Untuk membatalkan ketik ${prefix}premium batal\`\`\``)
                                        } else if (typeBayar == 'qris') {
                                            qrcode.toDataURL(result.data.qr_string, { scale: 8 }, (err, Durl) => {
                                                const data = Durl.replace(/^data:image\/png;base64,/, '')
                                                const bufferDataQr = new Buffer.from(data, 'base64');
                                                ntfvx.sendMessage(from, bufferDataQr, MessageType.image, {
                                                    caption: `Pesanan telah dibuat 😄
        
        _Silahkan scan qr diatas ini_
        
        *ID* : ${result.data.id.toUpperCase()}
        *Nama* : ${result.data.donator.first_name}
        *Telepon* : ${result.data.donator.phone}
        *Email* : ${result.data.donator.email == 'jszone29@gmail.com' ? '-' : result.data.donator.email}
        *Total* : Rp${result.data.amount_raw}
        *Payment* : ${result.data.payment_type}
        
        \`\`\`Untuk membatalkan ketik ${prefix}premium batal\`\`\``
                                                })
                                            })
                                        } else {
                                            Axios.get('https://tinyurl.com/api-create.php?url=' + result.data.redirect_url)
                                            .then(rst => {
                                                const urlPay = rst.data
                                                reply( `Pesanan telah dibuat 😄
        
        _Silahkan klik link tautan ${urlPay} untuk membayar_
        
        *ID* : ${result.data.id.toUpperCase()}
        *Nama* : ${result.data.donator.first_name}
        *Telepon* : ${result.data.donator.phone}
        *Email* : ${result.data.donator.email == 'jszone29@gmail.com' ? '-' : result.data.donator.email}
        *Total* : Rp${result.data.amount_raw}
        *Payment* : ${result.data.payment_type}
        
        \`\`\`Untuk membatalkan ketik ${prefix}premium batal\`\`\``)
                                            })
                                            .catch(() => {
                                                reply( `Pesanan telah dibuat dengan ID ${result.data.id.toUpperCase()}
        
        _Silahkan klik link tautan ${result.data.redirect_url} untuk membayar_
        
        *Nama* : ${result.data.donator.first_name}
        *Telepon* : ${result.data.donator.phone}
        *Email* : ${result.data.donator.email == 'jszone29@gmail.com' ? '-' : result.data.donator.email}
        *Total* : Rp${result.data.amount_raw}
        *Payment* : ${result.data.payment_type}
        
        \`\`\`Untuk membatalkan ketik ${prefix}premium batal\`\`\``)
                                            })
                                        }
                                    })
                                    .catch(e => {
                                        console.log(e)
                                        const iderrpay = data_sewa['ID']
                                        ntfvx.sendMessage(from, `Maaf kak terdapat kesalahan input dengan ID : ${iderrpay}, mohon lapor ke @${ownerNumber.replace(/@.+/g, '')}`, MessageType.text, { quoted: wen, contextInfo: { mentionedJid: [ownerNumber] } })
                                        sendMess(ownerNumber, `ERROR ID : ${iderrpay}\n${util.format(e)}`)
                                    })
                                } else if (chats.toLowerCase() == 'n') {
                                    fs.unlinkSync(sewaPath + '/' + sender + '.json')
                                    let objsewa = {
                                         status: false,
                                         session: 'name',
                                         name: pushname,
                                         created_at: new Date(),
                                         number: sender,
                                         data: {
                                              name: '',
                                              month: '',
                                              payment: '',
                                              phone: '',
                                              grouplink: '',
                                         }
                                    }
                                    fs.writeFile(sewaPath + '/' + sender + '.json', JSON.stringify(objsewa, null, 3), () => {
                                        reply( `Baik kak opsi telah direset, silahkan ketik disini atas nama siapa 😊`)
                                    })
                                }
                            } else {
                                reply( `Inputan belum beres kak! mohon isi data yang dibutuhkan.`)
                            }
                    }
                }
        
                // Sewa
                _sewa.expiredCheck(global.ntfvx, sewa)
        
                // Sewa
                const sewaPath = './database/sewa'
                if (fs.existsSync(sewaPath + '/' + sender + '.json')) {
                    if (!isGroup && !chats.startsWith(prefix) && !wen.key.fromMe && global.ntfvx.user.jid == ntfvx.user.jid) {
                        let data_sewa = JSON.parse(fs.readFileSync(sewaPath + '/' + sender + '.json'))
                        if (data_sewa.session == 'name') {
                            if (chats.length < 1) return reply(`Masukkan nama dengan benar`)
                            if (chats.length > 60) return reply( `Maaf kak nama yang telah dimasukan lebih dari 60 kata :(`)
                            data_sewa.data.name = chats
                            data_sewa.session = 'month'
                            fs.writeFile(sewaPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3), () => {
                                ntfvx.sendMessage(from, `Oke mau berapa bulan untuk sewa bot nya? 🤖
        
        *Rp15.000,- / bulan*
        
        _Termasuk pajak, rate 13% untuk ovo dan 11% selain ovo_
        
        Untuk lebih jelasnya atau apabila ada kendala silahkan hubungi : @${ownerNumber.replace(/@.+/g, '')}`, MessageType.text, { quoted: wen, contextInfo: { mentionedJid: [ownerNumber] } })
                            })
                        } else if (data_sewa.session == 'month') {
                            if (isNaN(chats)) return reply( `Masukan hanya angka ya :)`)
                            if (Number(chats) > 12) return reply( `Maaf kak bulan tidak lebih dari 12 :(`)
                            data_sewa.data.month = Number(chats)
                            data_sewa.session = 'payment'
                            fs.writeFileSync(sewaPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                            reply( `Payment mau via apa kak? 💰😄
        
        Tersedia : ovo, gopay, dana, linkaja, qris`)
        
                        } else if (data_sewa.session == 'payment') {
                            const regexSesi = new RegExp('^(ovo|gopay|dana|linkaja|qris)$', 'g')
                            if (!chats.toLowerCase().match(regexSesi)) return reply( `Payment tersebut tidak terdaftar kak, mohon masukan yang sudah ada di list.`)
                            data_sewa.data.payment = chats.toLowerCase()
                            data_sewa.session = 'phone'
                            fs.writeFileSync(sewaPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                            reply( `Mohon masukan nomer telepon untuk melanjutkan pembayaran 📲\n\n_Contoh : 08552xxxxxxx_`)
                        } else if (data_sewa.session == 'phone') {
                            if (isNaN(chats)) return reply( `Masukan hanya angka ya :)`)
                            if (chats.length > 40) return reply( `Sepertinya tidak ada nomer telepon lebih dari 40 kata hmm..`)
                            data_sewa.data.phone = chats.toLowerCase()
                            data_sewa.session = 'grouplink'
                            fs.writeFileSync(sewaPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                            reply( `Siap kak, silahkan masukan link grup yang mau bot masuki 🧑‍🤝‍🧑`)
                        } else if (data_sewa.session == 'grouplink') {
                            if (!chats.match(/(https:\/\/chat.whatsapp.com)/gi)) return reply(`Harap masukkan link group dengan benar`)
                            let ceke = await ntfvx.cekInviteCode(chats.replace('https://chat.whatsapp.com/', ''))
                            if (ceke.status !== 200) return reply(`Harap berikan link group yang valid`)
                            data_sewa.data.grouplink = chats
                            data_sewa.session = 'email'
                            fs.writeFileSync(sewaPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                            reply( `Silahkan masukan email 📭, input ini opsional anda bisa skip dengan ketik *skip* untuk menggunakan email default owner.`)
                        } else if (data_sewa.session == 'email') {
                            if (chats !== 'skip' && !chats.includes("@")) return reply(`Masukkan email dengan benar`)
                            if (chats.length > 60) return reply( `Mohon masukan email dibawah 50 kata kak!`)
                            data_sewa.data.email = chats.toLowerCase() == 'skip' ? 'jszone29@gmail.com' : chats
                            data_sewa.session = 'pay'
                            fs.writeFileSync(sewaPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                            sendMess(from, `Oke kak pesanan sewa sudah siap 😇
        
        *Nama* : ${data_sewa.data.name}
        *Waktu sewa (dalam bulan)* : ${data_sewa.data.month}
        *Payment* : ${data_sewa.data.payment} 
        *Email* : ${data_sewa.data.email == 'jszone29@gmail.com' ? '-' : data_sewa.data.email}
        *Nomer telp* : ${data_sewa.data.phone}
        *Link grup* : ${data_sewa.data.grouplink}
        
        Apakah data tersebut benar? akan gagal apabila terdapat kesalahan input.
        
        \`\`\`ketik Y untuk melanjutkan, N untuk mengulangi inputan dan ${prefix}sewa batal untuk membatalkan pesanan\`\`\`
        `)
                        } else if (data_sewa.session == 'pay') {
                            if (chats.toLowerCase() == 'y') {
                                const amountPay = data_sewa.data.month * 15000
                                data_sewa.status = true
                                data_sewa.session = 'pay'
                                fs.writeFileSync(sewaPath + '/' + sender + '.json', JSON.stringify(data_sewa, null, 3))
                                requestPay(data_sewa.data.name, data_sewa.data.phone, amountPay, data_sewa.data.email, 'SEWA BOT ' + pushname, data_sewa.data.payment)
                                .then(result => {
                                    sendMess(ownerNumber, `REQUEST PAY : \n${util.format(result)}`)
                                    let dataID = JSON.parse(fs.readFileSync(sewaPath + '/ids-match.json'))
                                    for (let i = 0;i < dataID.length;i++) {
                                        if (dataID[i]['SID'] == data_sewa['ID']) {
                                            dataID[i]['PAID'] = result.data.id
                                            dataID[i].data = data_sewa
                                            fs.writeFileSync(sewaPath + '/ids-match.json', JSON.stringify(dataID, null, 3))
                                        }
                                    }
                                    // Cek Pembayaran
                                    let status = {
                                            from: ''
                                    }
                                    status.from = from
                                    let idPay = result.data.id
                                    let bayarINTV = setInterval(() => {
                                        let data_sewa = fs.existsSync(sewaPath + '/' + sender + '.json') ? JSON.parse(fs.readFileSync(sewaPath + '/' + sender + '.json')) : { status: false }
                                        checkPay(idPay)
                                        .then(async(rest) => {
                                            clearInterval(bayarINTV)
                                            sendMess(ownerNumber, `Sukses bayar dari ${status.from}\n${util.format(rest)}`)
                                            sendMess(status.from, `Terima kasih ${data_sewa.data.name} pembayaran telah diterima dengan ID ${result.data.id.toUpperCase()} ✅😇\n\nBot akan otomatis masuk ke grup yang telah dikirim, chat owner apabila terdapat kendala dengan ketik *!owner*`)
                                            let cekek = await ntfvx.cekInviteCode(data_sewa.data.grouplink.replace('https://chat.whatsapp.com/', ''))
                                            ntfvx.acceptInvite(data_sewa.data.grouplink.replace('https://chat.whatsapp.com/', ''))
                                                .then(async rest => {
                                                    let data_sewa = JSON.parse(fs.readFileSync(sewaPath + '/' + sender + '.json'))
                                                    let dataID = JSON.parse(fs.readFileSync(sewaPath + '/ids-match.json'))
                                                    const metaMineFc = await ntfvx.fetchGroupMetadataFromWA(rest.gid)
                                                    if (_sewa.checkSewaGroup(cekek.id, sewa)){
                                                        sewa[_sewa.getSewaPosition(cekek.id, sewa)].expired += toMs(data_sewa.data.month * 30 + "d")
                                                        fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
                                                        sendMess(rest.gid, `Halo, waktu sewa bot telah ditambahkan di grup ${metaMineFc.subject} untuk ${data_sewa.data.month} bulan, have a nice day 😉🎇`)
                                                        let indexData_sewa = dataID.findIndex(r => r['ID'] == data_sewa['ID'])
                                                        dataID.splice(indexData_sewa, 1)
                                                        fs.writeFileSync(sewaPath + '/ids-match.json', JSON.stringify(dataID, null, 3))
                                                        fs.unlinkSync(sewaPath + '/' + sender + '.json')
                                                    } else {
                                                        _sewa.addSewaGroup(rest.gid, toMs(data_sewa.data.month * 30 + "d"), sewa)
                                                        sendMess(rest.gid, `Halo, bot telah masuk ke grup ${metaMineFc.subject} untuk ${data_sewa.data.month} bulan, have a nice day 😉🎇`)
                                                        let indexData_sewa = dataID.findIndex(r => r['ID'] == data_sewa['ID'])
                                                        dataID.splice(indexData_sewa, 1)
                                                        fs.writeFileSync(sewaPath + '/ids-match.json', JSON.stringify(dataID, null, 3))
                                                        fs.unlinkSync(sewaPath + '/' + sender + '.json')
                                                    }
                                                })
                                                .catch(e => {
                                                        sendMess(ownerNumber, `Kesalahan masuk grup ${util.format(e)}`)
                                                        sendMess(status.from, `Maaf kak bot tidak bisa masuk grup, kirim laporan ke wa.me/${ownerNumber.replace(/@.+/g, '')}?text=Join+Group+Failed+ID+${result.data.id}`)
                                                })
                                            })
                                        .catch(() => { })
                                        if (!data_sewa.status) {
                                            console.log('Payment Dibatalkan atau Direset')
                                            clearInterval(bayarINTV)
                                        }
                                    }, 2000);
        
                                    const typeBayar = result.data.payment_type
                                    if (typeBayar == 'ovo') {
                                        reply( `Pesanan telah dibuat 😄
        
        _Silahkan cek notifikasi di aplikasi ovo anda_
        
        *ID* : ${result.data.id.toUpperCase()}
        *Nama* : ${result.data.donator.first_name}
        *Telepon* : ${result.data.donator.phone}
        *Email* : ${result.data.donator.email == 'jszone29@gmail.com' ? '-' : result.data.donator.email}
        *Total* : Rp${result.data.amount_raw}
        *Payment* : ${result.data.payment_type}
        
        \`\`\`Untuk membatalkan ketik !sewa batal\`\`\``)
                                    } else if (typeBayar == 'qris') {
                                        qrcode.toDataURL(result.data.qr_string, { scale: 8 }, (err, Durl) => {
                                            const data = Durl.replace(/^data:image\/png;base64,/, '')
                                            const bufferDataQr = new Buffer.from(data, 'base64');
                                            ntfvx.sendMessage(from, bufferDataQr, MessageType.image, {
                                                caption: `Pesanan telah dibuat 😄
        
        _Silahkan scan qr diatas ini_
        
        *ID* : ${result.data.id.toUpperCase()}
        *Nama* : ${result.data.donator.first_name}
        *Telepon* : ${result.data.donator.phone}
        *Email* : ${result.data.donator.email == 'jszone29@gmail.com' ? '-' : result.data.donator.email}
        *Total* : Rp${result.data.amount_raw}
        *Payment* : ${result.data.payment_type}
        
        \`\`\`Untuk membatalkan ketik !sewa batal\`\`\``
                                            })
                                        })
                                    } else {
                                        Axios.get('https://tinyurl.com/api-create.php?url=' + result.data.redirect_url)
                                        .then(rst => {
                                            const urlPay = rst.data
                                            reply( `Pesanan telah dibuat 😄
        
        _Silahkan klik link tautan ${urlPay} untuk membayar_
        
        *ID* : ${result.data.id.toUpperCase()}
        *Nama* : ${result.data.donator.first_name}
        *Telepon* : ${result.data.donator.phone}
        *Email* : ${result.data.donator.email == 'jszone29@gmail.com' ? '-' : result.data.donator.email}
        *Total* : Rp${result.data.amount_raw}
        *Payment* : ${result.data.payment_type}
        
        \`\`\`Untuk membatalkan ketik !sewa batal\`\`\``)
                                        })
                                        .catch(() => {
                                            reply( `Pesanan telah dibuat dengan ID ${result.data.id.toUpperCase()}
        
        _Silahkan klik link tautan ${result.data.redirect_url} untuk membayar_
        
        *Nama* : ${result.data.donator.first_name}
        *Telepon* : ${result.data.donator.phone}
        *Email* : ${result.data.donator.email == 'jszone29@gmail.com' ? '-' : result.data.donator.email}
        *Total* : Rp${result.data.amount_raw}
        *Payment* : ${result.data.payment_type}
        
        \`\`\`Untuk membatalkan ketik !sewa batal\`\`\``)
                                        })
        
                                    }
                                })
                                .catch(e => {
                                    console.log(e)
                                    const iderrpay = data_sewa['ID']
                                    ntfvx.sendMessage(from, `Maaf kak terdapat kesalahan input dengan ID : ${iderrpay}, mohon lapor ke @${ownerNumber.replace(/@.+/g, '')}`, MessageType.text, { quoted: wen, contextInfo: { mentionedJid: [ownerNumber] } })
                                    sendMess(ownerNumber, `ERROR ID : ${iderrpay}\n${util.format(e)}`)
                                })
                            } else if (chats.toLowerCase() == 'n') {
                                fs.unlinkSync(sewaPath + '/' + sender + '.json')
                                let objsewa = {
                                    status: false,
                                    session: 'name',
                                    name: pushname,
                                    created_at: new Date(),
                                    number: sender,
                                    data: {
                                        name: '',
                                        month: '',
                                        payment: '',
                                        phone: '',
                                        grouplink: '',
                                    }
                                }
                                fs.writeFile(sewaPath + '/' + sender + '.json', JSON.stringify(objsewa, null, 3), () => {
                                    reply( `Baik kak opsi telah direset, silahkan ketik disini atas nama siapa 😊`)
                                })
                            }
                        } else {
                            reply( `Inputan belum beres kak! mohon isi data yang dibutuhkan.`)
                        }
                    }
                }
        
                // AFK
                // AFK
                const isAfk = afk.cekafk(sender, from, _afk)
                if(isGroup){
                    for(let i = 0; i < _afk.length; i++){
                        if(from == _afk[i].group){
                            if (wen.message.extendedTextMessage != undefined){
                                if (wen.message.extendedTextMessage.contextInfo != undefined){
                                    if (wen.message.extendedTextMessage.contextInfo.mentionedJid != undefined){
                            for (let ment of wen.message.extendedTextMessage.contextInfo.mentionedJid) {
                                if(ment == _afk[i].id){
                                    //if (arg) {
                                    console.log('AFK!')
                                const time = Date.now() - _afk[i].time
                                const dateString = ms(time)
                                let base = []
                                if(dateString.days > 0) base.push(dateString.days+' Hari')
                                if(dateString.hours > 0) base.push(dateString.hours+' Hours')
                                if(dateString.minutes > 0) base.push(dateString.minutes+' Minutes')
                                if(dateString.seconds > 0) base.push(dateString.seconds+' Seconds')
                                const dated = base.join(", ")
                                ntfvx.sendMessage(_afk[i].id, '```someone is mention or reply your message in '+groupName+' \n\n'+wen.message.extendedTextMessage.text+'```', MessageType.text, { quoted: wen })
                                mentions(`\`\`\`@${ment.split('@')[0]} sedang AFK! ${_afk[i].pesan ? `\n\nAlasan: ${_afk[i].pesan}` : ''}\nSejak : ${dated} ago\`\`\``, [ment], true)
                                }
                            }
                        }
                    }
                //}         } else if(isSticker){
                                if(quotedMsg){
                                    if(quotedMsg.sender == _afk[i].id){
                                        const time = Date.now() - _afk[i].time
                                        const dateString = ms(time)
                                        let base = []
                                        if(dateString.days > 0) base.push(dateString.days+' Hari')
                                        if(dateString.hours > 0) base.push(dateString.hours+' Hours')
                                        if(dateString.minutes > 0) base.push(dateString.minutes+' Minutes')
                                        if(dateString.seconds > 0) base.push(dateString.seconds+' Seconds')
                                        const dated = base.join(", ")
                                        exif.create('yess ah', 'ngentot', `stickwm_${sender}`)
                                        const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                                        const savedFilename = await ntfvx.downloadAndSaveMediaMessage(wen, `./media/${filename}`);
                                        exec(`webpmux -set exif ./media/sticker/data.exif ${savedFilename} -o ./media/${filename}-done.webp`, (err, stdout, stderr) => {
                                        if (err) {
                                            console.error(err);
                                            return
                                        }
                                        const buff = fs.readFileSync(`./media/${filename}-done.webp`)
                                        ntfvx.sendMessage(_afk[i].id, buff, MessageType.sticker, { quoted: wen })
                                            .then((data) => {
                                                ntfvx.sendMessage(_afk[i].id, '```someone is reply your message with a sticker at: '+groupName+'```', MessageType.text, { quoted: wen })
                                            })
                                        fs.unlinkSync(savedFilename)
                                        fs.unlinkSync(`./media/${filename}-done.webp`)
                                        })
                                        reply(`\`\`\`he is afk ${_afk[i].pesan ? `\n\nafk reason: ${_afk[i].pesan}` : ''}\ntime: ${dated} ago\`\`\``)
                                    }
                                }
                            } else if(type == "imageMessage"){
                                if(quotedMsg){
                                    if(quotedMsg.sender == _afk[i].id){
                                        const time = Date.now() - _afk[i].time
                                        const dateString = ms(time)
                                        let base = []
                                        if(dateString.days > 0) base.push(dateString.days+' Hari')
                                        if(dateString.hours > 0) base.push(dateString.hours+' Hours')
                                        if(dateString.minutes > 0) base.push(dateString.minutes+' Minutes')
                                        if(dateString.seconds > 0) base.push(dateString.seconds+' Seconds')
                                        const dated = base.join(", ")
                                        const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                                        const savedFilename = await ntfvx.downloadAndSaveMediaMessage(wen, `./media/revoke/${filename}`);
                                        const buff = fs.readFileSync(savedFilename)
                                        ntfvx.sendMessage(_afk[i].id, buff, MessageType.image, { quoted: wen, caption: wen.message.imageMessage.caption ? '```someone reply your chat with a image at: '+groupName+'\n\ncaption: '+wen.message.imageMessage.caption+'```' : '```someone reply your chat with a image at: '+groupName+'\n\nno caption```'})
                                        fs.unlinkSync(savedFilename)
                                        reply(`\`\`\`he is afk ${_afk[i].pesan ? `\n\nafk reason: ${_afk[i].pesan}` : ''}\ntime: ${dated} ago\`\`\``)
                                    }
                                }
                            } else if(type == "documentMessage"){
                                if(quotedMsg){
                                    if(quotedMsg.sender == _afk[i].id){
                                        const time = Date.now() - _afk[i].time
                                        const dateString = ms(time)
                                        let base = []
                                        if(dateString.days > 0) base.push(dateString.days+' Hari')
                                        if(dateString.hours > 0) base.push(dateString.hours+' Hours')
                                        if(dateString.minutes > 0) base.push(dateString.minutes+' Minutes')
                                        if(dateString.seconds > 0) base.push(dateString.seconds+' Seconds')
                                        const dated = base.join(", ")
                                        const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                                        const savedFilename = await ntfvx.downloadAndSaveMediaMessage(wen, `./media/revoke/${filename}`);
                                        const buff = fs.readFileSync(savedFilename)
                                        ntfvx.sendMessage(_afk[i].id, buff, MessageType.document, { mimetype: wen.message.documentMessage.mimetype, quoted: wen, filename: wen.message.documentMessage.fileName, fileLength: wen.message.documentMessage.fileLength })
                                        fs.unlinkSync(savedFilename)
                                        reply(`\`\`\`he is afk ${_afk[i].pesan ? `\n\nafk reason: ${_afk[i].pesan}` : ''}\ntime: ${dated} ago\`\`\``)
                                    }
                                }
                            } else if(type == "contactMessage"){
                                if(wen.message.contactMessage.contextInfo){
                                    if(wen.message.contactMessage.contextInfo.participant == _afk[i].id){
                                        const time = Date.now() - _afk[i].time
                                        const dateString = ms(time)
                                        let base = []
                                        if(dateString.days > 0) base.push(dateString.days+' Hari')
                                        if(dateString.hours > 0) base.push(dateString.hours+' Hours')
                                        if(dateString.minutes > 0) base.push(dateString.minutes+' Minutes')
                                        if(dateString.seconds > 0) base.push(dateString.seconds+' Seconds')
                                        const dated = base.join(", ")
                                        console.log(JSON.stringify(wen, null, 3))
                                        ntfvx.sendMessage(_afk[i].id, { displayname: wen.message.contactMessage.displayName, vcard: wen.message.contactMessage.vcard, }, MessageType.contact, { quoted: wen } )
                                            .then((data) => {
                                                ntfvx.sendMessage(_afk[i].id, '```someone is reply your message with a contact '+groupName+'```', MessageType.text, { quoted: wen })
                                            })
                                        reply(`\`\`\`he is afk ${_afk[i].pesan ? `\n\nafk reason: ${_afk[i].pesan}` : ''}\ntime: ${dated} ago\`\`\``)
                                    }
                                }
                            } else if(type == "videoMessage"){
                                if(quotedMsg){
                                    if(quotedMsg.sender == _afk[i].id){
                                        const time = Date.now() - _afk[i].time
                                        const dateString = ms(time)
                                        let base = []
                                        if(dateString.days > 0) base.push(dateString.days+' Hari')
                                        if(dateString.hours > 0) base.push(dateString.hours+' Hours')
                                        if(dateString.minutes > 0) base.push(dateString.minutes+' Minutes')
                                        if(dateString.seconds > 0) base.push(dateString.seconds+' Seconds')
                                        const dated = base.join(", ")
                                        const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                                        const savedFilename = await ntfvx.downloadAndSaveMediaMessage(wen, `./media/revoke/${filename}`);
                                        const buff = fs.readFileSync(savedFilename)
                                        ntfvx.sendMessage(_afk[i].id, buff, MessageType.video, { quoted: wen, caption: wen.message.videoMessage.caption ? '```someone reply your chat with a video at: '+groupName+'\n\ncaption: '+wen.message.videoMessage.caption+'```' : '```someone reply your chat with a video at: '+groupName+'\n\nno caption```'})
                                        reply(`\`\`\`he is afk ${_afk[i].pesan ? `\n\nafk reason: ${_afk[i].pesan}` : ''}\ntime: ${dated} ago\`\`\``)
                                        fs.unlinkSync(savedFilename)
                                    }
                                }
                            } else if(type == "audioMessage"){
                                if(quotedMsg){
                                    if(quotedMsg.sender == _afk[i].id){
                                        const time = Date.now() - _afk[i].time
                                        const dateString = ms(time)
                                        let base = []
                                        if(dateString.days > 0) base.push(dateString.days+' Hari')
                                        if(dateString.hours > 0) base.push(dateString.hours+' Hours')
                                        if(dateString.minutes > 0) base.push(dateString.minutes+' Minutes')
                                        if(dateString.seconds > 0) base.push(dateString.seconds+' Seconds')
                                        const dated = base.join(", ")
                                        const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                                        const savedFilename = await ntfvx.downloadAndSaveMediaMessage(wen, `./media/revoke/${filename}`);
                                        const buff = fs.readFileSync(savedFilename)
                                        ntfvx.sendMessage(_afk[i].id, buff, MessageType.audio, { quoted: wen, ptt: wen.message.audioMessage.ptt})
                                            .then((data) => {
                                                ntfvx.sendMessage(_afk[i].id, '```someone is reply your message with a ' +`${wen.message.audioMessage.ptt ? 'vn at: ' : 'audiofile at: '}`+groupName+'```', MessageType.text, { quoted: wen })
                                            })
                                        reply(`\`\`\`he is afk ${_afk[i].pesan ? `\n\nafk reason: ${_afk[i].pesan}` : ''}\ntime: ${dated} ago\`\`\``)
                                        fs.unlinkSync(savedFilename)
                                    }
                                }
                            } else if(type == "contactsArrayMessage"){
                                if(quotedMsg){
                                    if(quotedMsg.sender == _afk[i].id){
                                        const time = Date.now() - _afk[i].time
                                        const dateString = ms(time)
                                        let base = []
                                        if(dateString.days > 0) base.push(dateString.days+' Hari')
                                        if(dateString.hours > 0) base.push(dateString.hours+' Hours')
                                        if(dateString.minutes > 0) base.push(dateString.minutes+' Minutes')
                                        if(dateString.seconds > 0) base.push(dateString.seconds+' Seconds')
                                        const dated = base.join(", ")
                                        let datacontact = { displayName: 'pepek lo', contacts: wen.message.contactsArrayMessage.contacts}
                                        ntfvx.sendMessage(_afk[i].id, datacontact, MessageType.contactsArray)
                                            .then((data) => {
                                                ntfvx.sendMessage(_afk[i].id, '```someone is reply your message with contactsarray\n( '+wen.message.contactsArrayMessage.contacts.length+' contacts )\nat: '+groupName+'```', MessageType.text, { quoted: wen })
                                            })
                                        reply(`\`\`\`he is afk ${_afk[i].pesan ? `\n\nafk reason: ${_afk[i].pesan}` : ''}\ntime: ${dated} ago\`\`\``)
                                    }
                                }
                            }
                        }
                    }
                }
                if(isGroup){
                    for(let i = 0; i < _afk.length; i++){
                        if(from == _afk[i].group){
                        if(sender == _afk[i].id){
                            if(ntfvx.user.jid == _afk[i].id && /he is afk/gi.test(body) || /you are now/gi.test(body)) return
                            reply(`\`\`\`welcome back\n\nafk reason: ${_afk[i].pesan ? `${_afk[i].pesan}` : 'not set'}\`\`\``)
                            _afk.splice(afk.afkposition(sender, from, _afk), 1)
                            fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                        }
                    }
                }
            }
            if (isGroup) {
                if (wen.message.extendedTextMessage != undefined){
                if (wen.message.extendedTextMessage.contextInfo != undefined){
                if (wen.message.extendedTextMessage.contextInfo.mentionedJid != undefined){
                for (let ment of wen.message.extendedTextMessage.contextInfo.mentionedJid) {
                if (ment === ntfvx.user.jid){
                    mentions(`Yaa ada apa @${sender.split("@")[0]}?\nsilahkan ketik #menu untuk melihat menu dari bot`, [sender], true)
                }}}}}}
        
               // Auto Read
               ntfvx.chatRead(from, "read")
        
                // CMD
                if (isCmd && !isGroup) {
                    ntfvx.updatePresence(from, Presence.composing)
                    addBalance(sender, randomNomor(20), balance)
                    console.log(color('[CMD] -->'), color(moment(wen.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'),color(`${command}`), 'from', color(pushname))
                }
                if (isCmd && isGroup) {
                    ntfvx.updatePresence(from, Presence.composing)
                    addBalance(sender, randomNomor(20), balance)
                    console.log(color('[CMD] -->'), color(moment(wen.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command}`), 'from', color(pushname), 'in', color(groupName))
                }
        
                if (isControlBot){
                    if (chats.startsWith("> ")){
                        console.log(color('[EVAL -->]'), color(moment(wen.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                        try {
                            let evaled = await eval(chats.slice(2))
                            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                            reply(`${evaled}`)
                        } catch (err) {
                            reply(`${err}`)
                        }
                    } else if (chats.startsWith(">> ")){
                        console.log(color('[EXEC -->]'), color(moment(wen.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                        exec(chats.slice(2), (err, stdout) => {
                            if (err) return reply(`${err}`)
                            if (stdout) reply(`${stdout}`)
                        })
                    }
                }
        
                // Auto Delete
                if (autodel){ 
                    if(isCmd && wen.key.fromMe){
                    const pid = wen.key.id === undefined ? undefined : wen.key.id
                    await ntfvx.deleteMessage(from, { remoteJid : from, fromMe: true, id: pid})
                }}
        
                if (autodelmsg){ 
                    if(!isCmd && wen.key.fromMe){
                    const pid = wen.key.id === undefined ? undefined : wen.key.id
                    await sleep(timedel)
                    await ntfvx.deleteMessage(from, { remoteJid : from, fromMe: true, id: pid})
                }}
        
                switch(command){
                    case prefix+'self':{
                        if (!isControlBot) return reply(mess.OnlyOwner)
                        ntfvx.mode = 'self'
                        ntfvx.sendMessage(from, `\`\`\`    [ SELF MODE ]\`\`\`\n\n*Self Mode* diaktifkan, hanya owner dan orang yang di izinkan saja yang dapat memakai bot.`, MessageType.text, {contextInfo: { participant: sender, quotedMessage: { extendedTextMessage: { text: `*- NTFVX -*` }}}})
                    }
                        break
                    case prefix+'publik': case prefix+'public':{
                        if (!isControlBot) return reply(mess.OnlyOwner)
                        ntfvx.mode = 'public'
                        ntfvx.sendMessage(from, `\`\`\`    [ PUBLIC MODE ]\`\`\`\n\n*Public Mode* diaktifkan, kini semua member dapat menggunakan bot.`, MessageType.text, {contextInfo: { participant: sender, quotedMessage: { extendedTextMessage: { text: `*- NTFVX -*` }}}})
                    }
                        break
                    case 'prefix': case 'cekprefix':{
                        reply(`${prefix}`)
                    }
                        break
                        case prefix+'tagg':{ 
                            const test = `*Hai @${sender.replace('@s.whatsapp.net', '')}*`
                            await ntfvx.sendMessage(from, test, MessageType.text, {contextInfo: {
                                participant: sender,
                                mentionedJid: [sender]}})}
                                break
                                case prefix+'sticker':
            case prefix+'stiker':
            case prefix+'s':
            case prefix+'stickergif':
            case prefix+'sgif':{
                //if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (mess.msglimit)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(wen).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : wen
                    let media = await ntfvx.downloadAndSaveMediaMessage(encmedia, `./media/sticker/${sender}`)
                    await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./media/sticker/data.exif ./media/sticker/${sender}.webp -o ./media/sticker/${sender}.webp`, async (error) => {
                                    if (error) return reply(mess.error.api)
									ntfvx.sendMessage(from, fs.readFileSync(`./media/sticker/${sender}.webp`), sticker, {quoted: wen})
									limitAdd(sender, limit)
                                    fs.unlinkSync(media)	
									fs.unlinkSync(`./media/sticker/${sender}.webp`)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./media/sticker/${sender}.webp`)
                } else if ((isVideo && wen.message.videoMessage.fileLength < 10000000 || isQuotedVideo && wen.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(wen).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : wen
                    let media = await ntfvx.downloadAndSaveMediaMessage(encmedia, `./media/sticker/${sender}`)
					reply(mess.wait)
                        await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./media/sticker/data.exif ./media/sticker/${sender}.webp -o ./media/sticker/${sender}.webp`, async (error) => {
									if (error) return reply(mess.error.api)
									ntfvx.sendMessage(from, fs.readFileSync(`./media/sticker/${sender}.webp`), sticker, {quoted: wen})
									limitAdd(sender, limit)
                                    fs.unlinkSync(media)
									fs.unlinkSync(`./media/sticker/${sender}.webp`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./media/sticker/${sender}.webp`)
                } else {
                    reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break

            }
        } catch (err) {
            console.log(color('[ERROR]', 'red'), err)
        }
    }