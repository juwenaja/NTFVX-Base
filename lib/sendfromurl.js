const {
	MessageType,
	Mimetype,
    WAConnection
} = require("@adiwajshing/baileys");
const fs = require('fs');
const fetch = require('node-fetch');
const request = require('request');
const { exec } = require("child_process");
const axios = require('axios')
const Exif = require('./exif')
const exif = new Exif()

function normalizeMention(to, txt, mention=[]){
    if(! mention.length > 0){
        return "Not Mentioned"
    }
    if(txt.includes("@!")){
        const texts = txt.split('@!')
        let textx = ''
        if(texts.length -1 !== mention.length){
           return  "Invalid Number"
        }
        for(i of mention){
            textx += texts[mention.indexOf(i)]
            textx +="@"+i.replace("@s.whatsapp.net", "")
        }
        textx += texts[mention.length]
        return textx
    }else return "Invalid Mention Position"
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

exports.addMetaData = async function(packname, author) {	
    if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
    author = author.replace(/[^a-zA-Z0-9]/g, '');	
    let name = `${author}_${packname}`
    if (fs.existsSync(`./media/sticker//${name}.exif`)) return `./media/sticker//${name}.exif`
    const json = {	
        "sticker-pack-name": packname,
        "sticker-pack-publisher": author,
    }
    const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
    const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

    let len = JSON.stringify(json).length	
    let last	

    if (len > 256) {	
        len = len - 256	
        bytes.unshift(0x01)	
    } else {	
        bytes.unshift(0x00)	
    }	

    if (len < 16) {	
        last = len.toString(16)	
        last = "0" + len	
    } else {	
        last = len.toString(16)	
    }	

    const buf2 = Buffer.from(last, "hex")	
    const buf3 = Buffer.from(bytes)	
    const buf4 = Buffer.from(JSON.stringify(json))	

    const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

    fs.writeFile(`./media/sticker//${name}.exif`, buffer, (err) => {	
        return `./media/sticker//${name}.exif`	
    })	

}
exports.sendStickerUrl = async(ntfvx, to, url, wen) => {
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

//send media with url 
exports.SendFileFromUrl = async(ntfvx, to, url, text="", wen, mids=[]) => {
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
exports.sendMediaURL = async(ntfvx, to, url, text="", wen, mids=[]) =>{
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

exports.sendFakeStatus = async function(from, teks1, teks2){
    ntfvx.sendMessage(from, teks, MessageType.text, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": faketeks, "jpegThumbnail": fs.readFileSync(`../media/status.jpeg`)} } } })
}

exports.getGroupAdmins = function(participants){
    admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}