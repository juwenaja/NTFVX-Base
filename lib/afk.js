const fs = require('fs')

const setafk = (chatId, group, time, pesan, _dib) => {
    const obj = { id: chatId, group: group, time: time, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/afk.json', JSON.stringify(_dib))
}
const cengafk = (chatId, group, time, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].group === group) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/afk.json', JSON.stringify(_dib))
    }
}
const afkposition = (chatId, group, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].group === group) {
            position = i
        }
    })
    return position
}
const getafk = (chatId, _dib) => {
    let position = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== false) {
        return _dib[position].pesan
    }
}
const cekafk = (chatId, group, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].group === group) {
            id = true
        }
    })
    return id
}

module.exports = {
	setafk,
	cengafk,
	afkposition,
	getafk,
	cekafk
}