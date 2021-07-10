const {
	MessageType
} = require("@adiwajshing/baileys");
const {
	color,
	bgcolor
} = require('./color');
const {
	getBuffer
} = require('../message/message')
const {
	webp2mp4File
} = require('./tovid')
const apiNSF = ['0ddd10d101694e33a86c106e57518bac', '8ab1625f7bdc46dc9ba71e69c63c13cc'] //TOTAL 2 APIKEY
const apiNSFW = apiNSF[Math.floor(Math.random() * apiNSF.length)]
const NSFAI = require('nsfai')
const noPorn = new NSFAI(apiNSFW)
const Clarifai = require('clarifai')
const fs = require('fs')
const {
	exec,
	spawn
} = require('child_process')
const appC = new Clarifai.App({
	apiKey: apiNSFW
})
const fetch = require('node-fetch');
const util = require('util')
const streamPipeline = util.promisify(require('stream').pipeline)

const sleep = async(ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function downloadURL(url, filename) {
	const response = await fetch(url)
	if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
	await streamPipeline(response.body, fs.createWriteStream(filename))
	return filename
}

module.exports = antiporn = async(xinz, qul, reply, sender, from, isGroup, isOwner, isBotGroupAdmins, isGroupAdmins, isAntiPorn, type) => {
	//ANTIPORN
	if (isGroup && isAntiPorn && !isGroupAdmins && isBotGroupAdmins && !isOwner) {
		if (type === 'imageMessage') {
			const dataMediaa = await xinz.downloadMediaMessage(qul)
			const mediaType = `${dataMediaa.toString('base64')}`
			noPorn.predict(mediaType)
				.then(async(res) => {
					const {
						confidence
					} = res
					const nilaipersen = ((confidence / 1.000000) * 100).toFixed(1) + '%'
					if (!res.sfw) {
						reply(`...: PORN DETECTOR :...\n\nGambar ini tidak aman untuk grup dan Anda akan dikick!\n*Keyakinan: ${nilaipersen}/100%*!`)
						await sleep(5000)
						xinz.groupRemove(from, [sender])
					}
				})
		} else if (type === 'videoMessage') {
			const dataMediaaa = await xinz.downloadAndSaveMediaMessage(qul, `./media/${Date.now()}`)
			const outPorn = `./media/${Date.now()}.png`
			let detiknye = qul.message.videoMessage.seconds === 1 ? 1 : Math.floor(qul.message.videoMessage.seconds / 2)
			exec(`ffmpeg -ss ${detiknye} -i ${dataMediaaa} -vframes 1 ${outPorn}`, async function () {
				fs.readFile(outPorn, {
					encoding: 'base64'
				}, async(err, base64) => {
					noPorn.predict(base64)
						.then(async(res) => {
							const {
								confidence
							} = res
							const nilaipersen = ((confidence / 1.000000) * 100).toFixed(1) + '%'
							if (!res.sfw) {
								reply(`--- ⌜ PORN DETECTOR ⌟ ---\n\n_*Anda akan di-kick karena video ini mengandung pornografi!*_\n*Keyakinan: ${nilaipersen}/100%*!`)
								await sleep(5000)
								xinz.groupRemove(from, [sender])
								fs.unlinkSync(dataMediaaa)
								fs.unlinkSync(outPorn)
							} else {
								fs.unlinkSync(dataMediaaa)
								fs.unlinkSync(outPorn)
							}
						})
				})
			})
		} else if (type === 'stickerMessage') {
			if (!qul.message.stickerMessage.isAnimated) {
				const dataMediaaa = await xinz.downloadAndSaveMediaMessage(qul, `./media/${Date.now()}`)
				const outPorn = `./media/${Date.now()}.png`
				//let detiknye = qul.message.videoMessage.seconds === 1 ? 1 : Math.floor(qul.message.videoMessage.seconds / 2)
				exec(`ffmpeg -i ${dataMediaaa} ${outPorn}`, async function () {
					fs.readFile(outPorn, {
						encoding: 'base64'
					}, async(err, base64) => {
						noPorn.predict(base64)
							.then(async(res) => {
								const {
									confidence
								} = res
								const nilaipersen = ((confidence / 1.000000) * 100).toFixed(1) + '%'
								if (!res.sfw) {
									reply(`--- ⌜ PORN DETECTOR ⌟ ---\n\n_*Anda akan di-kick karena sticker ini mengandung pornografi!*_\n*Keyakinan: ${nilaipersen}/100%*!`)
									await sleep(5000)
									xinz.groupRemove(from, [sender])
									fs.unlinkSync(dataMediaaa)
									fs.unlinkSync(outPorn)
								} else {
									fs.unlinkSync(dataMediaaa)
									fs.unlinkSync(outPorn)
								}
							})
					})
				})
			} else {
				const dataMediaaa = await xinz.downloadAndSaveMediaMessage(qul, `./media/${Date.now()}`)
				const tovid = await webp2mp4File(dataMediaaa)
				const anu = await downloadURL(tovid.result, `./media/${Date.now()}.mp4`)
				const outPorn = `./media/${Date.now()}.png`
				exec(`ffmpeg -ss 1 -i ${anu} -vframes 1 ${outPorn}`, async function (err, res) {
					if (err) return console.log(err)
					fs.readFile(outPorn, {
						encoding: 'base64'
					}, async(err, base64) => {
						noPorn.predict(base64)
							.then(async(res) => {
								const {
									confidence
								} = res
								const nilaipersen = ((confidence / 1.000000) * 100).toFixed(1) + '%'
								if (!res.sfw) {
									reply(`--- ⌜ PORN DETECTOR ⌟ ---\n\n_*Anda akan di-kick karena sticker ini mengandung pornografi!*_\n*Keyakinan: ${nilaipersen}/100%*!`)
									await sleep(5000)
									xinz.groupRemove(from, [sender])
									fs.unlinkSync(dataMediaaa)
									fs.unlinkSync(anu)
									fs.unlinkSync(outPorn)
								} else {
									fs.unlinkSync(dataMediaaa)
									fs.unlinkSync(anu)
									fs.unlinkSync(outPorn)
								}
							})
					})
				})
			}
		}
	}
}