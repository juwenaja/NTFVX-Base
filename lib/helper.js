const qs = require("qs")
const cheerio = require('cheerio')
const axios = require('axios')
const puppeteer = require('puppeteer')
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const got_1 = __importDefault(require("got"));

function wallpaper(mc){
	return new Promise(async(resolve, reject) => {
		axios.get('https://wallpapercave.com/search?q=' + mc)
		.then(({ data }) => {
		const $ = cheerio.load(data)
		const image = [];
		const image2 = [];
		const link = 'https://wallpapercave.com'
		$('#popular > a').each(function(a,b) {
			image.push(link + $(b).attr('href')) })
		const random = image[Math.floor(Math.random() * image.length)]
		axios.get(random).then(({ data }) => {
			const $$ = cheerio.load(data)
			const link2 = 'https://wallpapercave.com'
			$$('div.wallpaper > a').each(function(c,d) {
			image2.push(link2 + $$(d).find('img').attr('src'))		
			})
			resolve(image2)
		})
		})
		.catch(reject)
	})	
}

function tebakgmbr() {
	return new Promise(async(resolve, reject) => {
    axios.get('https://jawabantebakgambar.net/all-answers/')
    .then(({ data }) => {
    const $ = cheerio.load(data)
    const result = [];
    let random = Math.floor(Math.random() * 2836) + 2;
    let link2 = 'https://jawabantebakgambar.net'
    $(`#images > li:nth-child(${random}) > a`).each(function(a, b) {
    const img = link2 + $(b).find('img').attr('data-src')
    const jwb = $(b).find('img').attr('alt')
    result.push({
    	image: img,
    	jawaban: jwb,
        message: 'This is NTFVX'
    })

    	resolve(result)
    })
    	})
    .catch(reject)
	})
}

function musicallydown(url){
	return new Promise(async(resolve, reject) => {
		const result = {};
		result.message = 'This is NTFVX'
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('https://musicaldown.com/');
		const type = page.$('input[id=link_url]');
		await (await type).type(url);
		await page.click('#submit-form > div > div:nth-child(2) > button',{ clickCount: 1 })
		await page.waitForTimeout(3000)
		const bodyHandle = await page.$('body');
    	const html = await page.evaluate(body => body.innerHTML, bodyHandle);
    	await bodyHandle.dispose();
    	const $ = cheerio.load(html);
       	$(' div.col.s12.l8 > h2').each(function(c,d){
    		result.title = $(d).text().split('Title: ')[1].trim();
    	})
    	$('div.col.s12.l8').each(function(a,b){
    		result.preview = $('div.col.s12.l4').find('img').attr('src')
    		result.nowm = $(b).find('a:nth-child(4)').attr('href')
    		result.nowm2 = $(b).find('a:nth-child(8)').attr('href')
    	})
    	await page.click('div.col.s12.l8 > form > button', { clickCount: 1})
    	await page.waitForTimeout(3000)
    	const bodyHandle1 = await page.$('body');
    	const html1 = await page.evaluate(body => body.innerHTML, bodyHandle1);
    	await bodyHandle1.dispose();
    	const $$ = cheerio.load(html1);
    	result.mp3 = $$('div.col.s12.l8 > a:nth-child(4)').attr('href')
    	resolve(result)
    	await browser.close();
	})
}

function getUrl(query){
    return new Promise((resolve, reject) => {
        axios.get(`https://www.musixmatch.com/search/${query}`)
        .then(({data}) => {
            const $ = cheerio.load(data)
            const res = $('#site').find('div > div > div > div > ul > li:nth-child(1) > div > div > div')
            //resolve($('#site').find('search-results > div > div > tab-content > div > div > box box-style-plain > box-content > ul'))
            resolve(`https://www.musixmatch.com` + $(res).find('h2 > a').attr('href'))
        })
        .catch(reject)
    })
}
function musix(querry) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield got_1.default.get(`https://www.musixmatch.com/search/${querry}`, {
                method: "GET",
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-US,en;q=0.9,id;q=0.8",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
                }
            }).then(({ body }) => __awaiter(this, void 0, void 0, function* () {
                const $ = cheerio_1.default.load(body);
                const Url = $('#search-all-results > div.main-panel > div').find('div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a').attr('href');
                yield got_1.default(`https://www.musixmatch.com${Url}`, {
                    method: "GET",
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "accept-language": "en-US,en;q=0.9,id;q=0.8",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
                    }
                }).then(res => {
                    const $ = cheerio_1.default.load(res.body);
                    const judul = $('#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div').find('div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h1').text().trim();
                    const artis = $('#site > div > div > div > main > div > div > div > div > div > div > div> div > div > h2 > span').text().trim();
                    const thumb = $('#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div').find('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div > img').attr('src');
                    const lirik = [];
                    $('#site > div > div > div > main > div > div > div.mxm-track-lyrics-container').find('div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function (a, b) {
                        const isi = $(b).find('span').text().trim();
                        lirik.push(isi);
                    });
                    const result = {
                        status: res.statusCode,
                        author: "I`am Ra",
                        result: {
                            judul: judul.replace('Lyrics', ''),
                            penyanyi: artis,
                            thumb: "https:" + thumb,
                            lirik: lirik[0]
                        }
                    };
                    resolve(result);
                });
            })).catch(reject);
        }));
    });
}

function randcerpen() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const link = yield axios_1.default.get(`http://cerpenmu.com/`);
            if (link.status !== 200)
                return;
            const $ = cheerio_1.default.load(link.data);
            const link_input = [];
            $('#sidebar > div:nth-child(9) > ul').each(function (_a, b) {
                $(b).find('li').each(function (_tyu, zu) {
                    const url = $(zu).find('a').attr('href');
                    link_input.push(url);
                });
            });
            const random = link_input[Math.floor(Math.random() * (link_input.length))];
            const Url = yield axios_1.default.get(random);
            if (Url.status !== 200)
                resolve({ status: Url.status, mess: "ERROR" });
            const ch = cheerio_1.default.load(Url.data);
            const Data = [];
            ch('#content > article').each(function (_hm, to) {
                ch(to).find('article').each(function (_chu, chuwi) {
                    const Url = ch(chuwi).find('h2 > a').attr('href');
                    Data.push(Url);
                });
            });
            const acak = Data[Math.floor(Math.random() * (Data.length))];
            yield axios_1.default.get(acak).then(respon => {
                if (respon.status !== 200)
                    return;
                const $ = cheerio_1.default.load(respon.data);
                const judul = $('#content').find('article > h1').text().trim();
                const kategori = $('#content').find('article > a:nth-child(4)').text().trim();
                const cerita = $('#content').find('article').text().trim();
                const res = {
                    status: respon.status,
                    message: "This is NTFVX",
                    data: {
                        judul: judul,
                        kategori: kategori,
                        cerita: cerita
                    }
                };
                resolve(res);
            }).catch(reject);
        }));
    });
}

function stiksearch(querry) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.get(`https://getstickerpack.com/stickers?query=` + querry).then((res) => __awaiter(this, void 0, void 0, function* () {
                const $ = cheerio_1.default.load(res.data);
                const Data = [];
                $('#stickerPacks > div > div:nth-child(3)').each(function (_a, b) {
                    $(b).find('div').each(function (_c, d) {
                        const url = $(d).find('a').attr('href');
                        Data.push(url);
                    });
                });
                const data = [];
                Data.map(tyuzu => {
                    if (tyuzu === undefined)
                        return;
                    data.push(tyuzu);
                });
                const random = data[Math.floor(Math.random() * (data.length))];
                yield axios_1.default.get(random).then(respon => {
                    const $ = cheerio_1.default.load(respon.data);
                    const Sticker = [];
                    $('#stickerPack > div > div.row').each(function (_a, b) {
                        $(b).find('div').each(function (_c, d) {
                            const sticker = $(d).find('img').attr('data-src-large');
                            Sticker.push(sticker);
                        });
                    });
                    const data = [];
                    Sticker.map(tyuzu => {
                        if (tyuzu === undefined)
                            return;
                        data.push(tyuzu);
                    });
                    const Format = {
                        judul: $('#intro').find('div > div > h1').text().trim(),
                        creator: $('#intro').find('div > div > h5 > a').text().trim(),
                        sticker: data
                    };
                    const result = {
                        status: respon.status,
                        message: "This is NTFVX",
                        data: Format
                    };
                    resolve(result);
                }).catch(reject);
            }));
        }));
    });
}

function instagramDown(Link) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const Form = {
                url: Link,
                submit: ""
            };
            yield axios_1.default(`https://downloadgram.org/`, {
                method: "POST",
                data: new URLSearchParams(Object.entries(Form)),
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-US,en;q=0.9,id;q=0.8",
                    "cache-control": "max-age=0",
                    "content-type": "application/x-www-form-urlencoded",
                    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
                    "cookie": "_ga=GA1.2.1695343126.1621491858; _gid=GA1.2.28178724.1621491859; __gads=ID=8f9d3ef930e9a07b-2258e672bec80081:T=1621491859:RT=1621491859:S=ALNI_MbqLxhztDiYZttJFX2SkvYei6uGOw; __atuvc=3%7C20; __atuvs=60a6eb107a17dd75000; __atssc=google%3B2; _gat_gtag_UA_142480840_1=1"
                },
            }).then((res) => __awaiter(this, void 0, void 0, function* () {
                const $ = cheerio_1.default.load(res.data);
                const url = $('#downloadBox').find('a').attr('href');
                yield axios_1.default(Link, {
                    method: "GET",
                    data: null,
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "accept-language": "en-US,en;q=0.9,id;q=0.8",
                        "cache-control": "max-age=0",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
                        "cookie": "ig_did=08A3C465-7D43-4D8A-806A-88F98384E63B; ig_nrcb=1; mid=X_ipMwALAAFgQ7AftbrkhIDIdXJ8; fbm_124024574287414=base_domain=.instagram.com; shbid=17905; ds_user_id=14221286336; csrftoken=fXHAj5U3mcJihQEyVXfyCzcg46lHx7QD; sessionid=14221286336%3A5n4czHpQ0GRzlq%3A28; shbts=1621491639.7673564; rur=FTW"
                    }
                }).then(respon => {
                    const ch = cheerio_1.default.load(respon.data);
                    const title = ch('title').text().trim();
                    const result = {
                        message: "NTFVX!~",
                        result: {
                            link: url,
                            desc: title,
                            LinkAwal: Link
                        }
                    };
                    resolve(result);
                }).catch(reject);
            }));
        }));
    });
}

function SearchFilm(querry) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield got_1.default.get(`http://167.99.31.48/?s=${querry}`).then(respon => {
                const $ = cheerio_1.default.load(respon.body);
                const hasil = [];
                $('#content > div > div.los').each(function (a, b) {
                    $(b).find('article').each(function (tyu, zu) {
                        const judul = $(zu).find('div > a > div > div > header > h2').text().trim();
                        const thumb = $(zu).find('div > a > div > img').attr('src');
                        const kualitas = $(zu).find('div > a > div > div > span').text().trim();
                        const Url = $(zu).find('div > a').attr('href');
                        const result = {
                            judul: judul,
                            thumb: thumb,
                            quality: kualitas,
                            link: Url
                        };
                        hasil.push(result);
                    });
                });
                resolve(hasil);
            }).catch(reject);
        }));
    });
}

function ttdl(url){
	return new Promise((resolve, reject) => {
		axios.request({
			url: 'https://ssstik.io/id',
			method: 'POST',
			headers: {
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "ga=GA1.2.238603205.1621782919; cf_clearance=d8f6a2927e53d54945012399320af5eed9d51754-1622126543-0-150; PHPSESSID=3bbo0mukoijeo36suk5q4hg0cf; __cflb=02DiuEcwseaiqqyPC5reXo8GWCajxYWmF5bty4N6tfi75; _gid=GA1.2.64467151.1625229808; _gat_UA-3524196-6=1"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			let post = $('#_gcaptcha_pt').attr('hx-post')
			let datas = {
				headers:{
					"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					"cookie": "ga=GA1.2.238603205.1621782919; cf_clearance=d8f6a2927e53d54945012399320af5eed9d51754-1622126543-0-150; PHPSESSID=3bbo0mukoijeo36suk5q4hg0cf; __cflb=02DiuEcwseaiqqyPC5reXo8GWCajxYWmF5bty4N6tfi75; _gid=GA1.2.64467151.1625229808; _gat_UA-3524196-6=1"
				},
				config: {
					'id': url,
					'locale': 'id',
					'gc': 0,
					'tt': 0,
					'ts': 0,
				}
			}
		axios.post('https://ssstik.io'+ post,qs.stringify(datas.config), { headers: datas.headers })
		.then(({ data }) => {
			const $ = cheerio.load(data)
				resolve({
           message: 'By Hexagon',
					desc: $('#mainpicture > div > p').text(),
					link_1: 'https://ssstik.io/id' + $('#mainpicture > div > a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark.snaptik').attr('href'),
					link_2: $('#mainpicture > div > a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark_direct.snaptik').attr('href'),
					mp3: $('#mainpicture > div > a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.music.snaptik').attr('href')
				})	
		})
		})
	.catch(reject)
	})
}

function igdl(url){
	return new Promise(async(resolve, reject) => {
		axios.request({
			url: 'https://www.instagramsave.com/download-instagram-videos.php',
			method: 'GET',
			headers:{
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const token = $('#token').attr('value')
			let config ={
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
				data: {
					'url': url,
					'action': 'post',
					'token': token
				}
			}
		axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
		.then(({ data }) => {
		resolve(data.medias)
		   })
		})
	.catch(reject)
	})
}

function igstory(username){
	return new Promise(async(resolve, reject) => {
		axios.request({
            url: 'https://www.instagramsave.com/instagram-story-downloader.php',
            method: 'GET',
            headers:{
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
            }
        })
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const token = $('#token').attr('value')
            let config ={
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                    "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                },
                data: {
                    'url':'https://www.instagram.com/'+ username,
                    'action': 'story',
                    'token': token
                }
            }
        axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        }})
        .then(({ data }) => {
        //resolve(data.medias)
        const data_ = {    
            message: "NTFVX!~",
            result: data.medias
        }
       resolve(data_)
           })
        }).catch(reject)
    })
}

function twitter(link){
	return new Promise((resolve, reject) => {
		let config = {
			'URL': link
		}
		axios.post('https://twdown.net/download.php',qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
		resolve({
				desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
				thumb: $('div:nth-child(1) > img').attr('src'),
				HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
				SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
				audio: 'https://twdown.net/' + $('tr:nth-child(4) > td:nth-child(4) > a').attr('href')
			})
		})
	.catch(reject)
	})
}


function ttdownlod(url){
	return new Promise((resolve, reject) => {
axios.request({
    url: 'https://ttdownloader.com/',
    method: 'GET',
    headers:{
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "cookie": "PHPSESSID=b9r9m9019n611ffnvpb9scmuhi; popCookie=1; _ga=GA1.2.1882246161.1625220155; _gid=GA1.2.1705211585.1625220155"
    }
})
.then(({ data }) => {
    const $ = cheerio.load(data)
    const token = $('#token').attr('value')
    let config = {
        'url': url,
        'format': '',
        'token': token
    }
    axios(`https://ttdownloader.com/req/`, {
            method: "POST",
            data: new URLSearchParams(Object.entries(config)), 
            headers:{
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=b9r9m9019n611ffnvpb9scmuhi; popCookie=1; _ga=GA1.2.1882246161.1625220155; _gid=GA1.2.1705211585.1625220155"
             }   
            }).then(({ data }) => {
            const $ = cheerio.load(data)
            resolve({
                    message: 'NTFVX!~',
                    nowm: $('#results-list > div:nth-child(2) > div.download > a').attr('href'),
                    wm: $('#results-list > div:nth-child(3) > div.download > a').attr('href'),
                    audio: $('#results-list > div:nth-child(4) > div.download > a').attr('href'),
                    more: $('#results-list > div:nth-child(5) > div.download > a').attr('href'),
                })
            })         
        })          .catch(reject)
    })
}


module.exports.wallpaper = wallpaper
module.exports.musicallydown = musicallydown
module.exports.tebakgmbr = tebakgmbr
module.exports.musix = musix
module.exports.randcerpen = randcerpen
module.exports.stiksearch = stiksearch
module.exports.instagramDown = instagramDown
module.exports.SearchFilm = SearchFilm
module.exports.ttdl = ttdl
module.exports.igstory = igstory
module.exports.igdl = igdl
module.exports.twitter = twitter
module.exports.ttdownlod = ttdownlod