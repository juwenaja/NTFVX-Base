const fs = require('fs')

const getIndex = (jid, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === jid) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const createJSON = (jid, _dir) => {
    const obj = {
        id: jid,
        isWelcome: false,
        isLeft: false,
        isInfo: false,
        isAntiLink: false,
        isGroupGuard: false,
        captWelcome: `Hai @user, selamat datang di @group`,
        captLeft: `Sayonara @user`,
        url: `https://turupedia.net/images/2021/06/26/aca062dbd973.jpg`
    }
    _dir.push(obj)
    fs.writeFileSync('./database/group.json', JSON.stringify(_dir))
}

const isJSON = (jid, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === jid) {
            status = true
        }
    })
    return status
}

const setWelome = (jid, boolean, _dir) => {
    const index = getIndex(jid, _dir)
    _dir[index].isWelcome = boolean
    fs.writeFileSync('./database/group.json', JSON.stringify(_dir))
}

const setLeft = (jid, boolean, _dir) => {
    const index = getIndex(jid, _dir)
    _dir[index].isLeft = boolean
    fs.writeFileSync('./database/group.json', JSON.stringify(_dir))
}

const setInfo = (jid, boolean, _dir) => {
    const index = getIndex(jid, _dir)
    _dir[index].isInfo = boolean
    fs.writeFileSync('./database/group.json', JSON.stringify(_dir))
}

const setBG = (jid, url, _dir) => {
    const index = getIndex(jid, _dir)
    _dir[index].url = url
    fs.writeFileSync('./database/group.json', JSON.stringify(_dir))
}

const setCaptWelcome = (jid, string, _dir) => {
    const index = getIndex(jid, _dir)
    _dir[index].captWelcome = string
    fs.writeFileSync('./database/group.json', JSON.stringify(_dir))
}

const setCaptLeft = (jid, string, _dir) => {
    const index = getIndex(jid, _dir)
    _dir[index].captLeft = string
    fs.writeFileSync('./database/group.json', JSON.stringify(_dir))
}

const setAntiLink = (jid, boolean, _dir) => {
    const index = getIndex(jid, _dir)
    _dir[index].isAntiLink = boolean
    fs.writeFileSync('./database/group.json', JSON.stringify(_dir))
}

const setGroupGuard = (jid, boolean, _dir) => {
    const index = getIndex(jid, _dir)
    _dir[index].isGroupGuard = boolean
    fs.writeFileSync('./database/group.json', JSON.stringify(_dir))
}

const isWelcome = (jid, _dir) => {
    let filter = _dir.filter(v => v.id == jid)
    if (filter.length == 0) return false
    else if (filter[0].isWelcome) return true
    else return false
}

const isLeft = (jid, _dir) => {
    let filter = _dir.filter(v => v.id == jid)
    if (filter.length == 0) return false
    else if (filter[0].isLeft) return true
    else return false
}

const isInfo = (jid, _dir) => {
    let filter = _dir.filter(v => v.id == jid)
    if (filter.length == 0) return false
    else if (filter[0].isInfo) return true
    else return false
}

const isAntiLink = (jid, _dir) => {
    const index = getIndex(jid, _dir)
    if (index == null) return false
    if (_dir[index].isAntiLink) return true
    else return false
}

const isGroupGuard = (jid, _dir) => {
    const index = getIndex(jid, _dir)
    if (index == null) return false
    if (_dir[index].isGroupGuard) return true
    else return false
}

module.exports = {
    getIndex,
    createJSON,
    isJSON,
    setWelome,
    setLeft,
    setInfo,
    setBG,
    setCaptWelcome,
    setCaptLeft,
    setAntiLink,
    setGroupGuard,
    isWelcome,
    isLeft,
    isInfo,
    isAntiLink,
    isGroupGuard
}