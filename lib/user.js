const fs = require("fs");
const toMs = require("ms");

const randomNumber = (count) => {
    const Array = []
    const numbernye = '1234567890'
    for (let i = 0; i < count; i++){
        Array.push(numbernye.charAt(Math.floor(Math.random() * numbernye.length)))
    }
    return Array.join("")
}
const createJSON = (id, _dir) => {
    const obj = {
        status: false,
        id: id,
        time_create: null,
        limit: 0,
        glimit: 0,
        balance: 0,
        premium: false,
        expired_premium: null,
        banned: false,
        expired_banned: null,
    }
    _dir.push(obj)
    fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
}

const getIndex = (id, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
    else createJSON(id, _dir)
}

const createOTP = (id, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (_dir[indexnya].otp != undefined || _dir[indexnya].otp != null) return _dir[indexnya].otp
    const otp = randomNumber(6)
    _dir[indexnya].otp = otp
    _dir[indexnya].status = null
    fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    return otp
}

const daftar = (id, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya == null) createJSON(id, _dir)
    if (_dir[indexnya].otp) delete _dir[indexnya].otp
    _dir[indexnya].status = true
    _dir[indexnya].time_create = Date.now()
    fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
}

const isUser = (id, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === id && _dir[i].status == true) {
            status = true
        }
    })
    return status
}

const isPremium = (id, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya == null) return false
    else if (_dir[indexnya].premium){
        if (_dir[indexnya].expired_premium == 'PERMANENT') return true
        if (_dir[indexnya].expired_premium > Date.now()) return true
        if (Date.now >= _dir[indexnya].expired_premium){
            _dir[indexnya].premium = false
            _dir[indexnya].expired_premium = null
            fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
            return false
        }
    }
    else return false
}

const addPremium = (id, expired, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (expired == 'PERMANENT'){
        _dir[indexnya].premium = true
        _dir[indexnya].expired_premium = 'PERMANENT'
        fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    }
    else {
        if (_dir[indexnya].premium && _dir[indexnya].expired_premium > Date.now()){
            _dir[indexnya].expired_premium += toMs(expired)
            fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
        }
        else {
            _dir[indexnya].premium = true
            _dir[indexnya].expired_premium = Date.now() + toMs(expired)
            fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
        }
    }
}

const delPremium = (id, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya != null){
        _dir[indexnya].premium = false
        _dir[indexnya].expired_premium = null
        fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    }
}

const isBanned = (id, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya == null) return false
    else if (_dir[indexnya].banned){
        if (_dir[indexnya].expired_banned == 'PERMANENT') return true
        if (_dir[indexnya].expired_banned > Date.now()) return true
        if (Date.now >= _dir[indexnya].expired_banned){
            _dir[indexnya].banned = false
            _dir[indexnya].expired_banned = null
            fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
            return false
        }
    }
    else return false
}
const addBanned = (id, expired, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (expired == 'PERMANENT'){
        _dir[indexnya].banned = true
        _dir[indexnya].expired_banned = 'PERMANENT'
        fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    }
    else {
        if (_dir[indexnya].banned && _dir[indexnya].expired_banned > Date.now()){
            _dir[indexnya].expired_banned += toMs(expired)
            fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
        }
        else {
            _dir[indexnya].banned = true
            _dir[indexnya].expired_banned = Date.now() + toMs(expired)
            fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
        }
    }
}

const delBanned = (id, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya != null){
        _dir[indexnya].banned = false
        _dir[indexnya].expired_banned = null
        fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    }
}

const isLimit = (id, limitCount, isOwner, _dir) => {
    if (isOwner) return false
    if (isPremium(id, _dir)) return false
    let indexnya = getIndex(id, _dir)
    if (indexnya == null) return false
    let limits = _dir[indexnya].limit
    if (limits >= limitCount) return true
    else false
}

const limitAdd = (id, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya != null){
        _dir[indexnya].limit += 1
        fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    }
}

const getLimit = (id, limitCount, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya != null) return limitCount - _dir[indexnya].limit
    else return limitCount
}

const giveLimit = (id, count, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya != null){
        _dir[indexnya].limit -= count
        fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    }
}

const addBalance = (id, count, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya != null){
        _dir[indexnya].balance += count
        fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    }
}

const kurangBalance = (id, count, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya != null){
        _dir[indexnya].balance -= count
        fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    }
}

const getBalance = (id, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya != null) return _dir[indexnya].balance
    else return 0
}

const isGame = (id, gcount, isOwner, _dir) => {
    if (isOwner) return false
    let indexnya = getIndex(id, _dir)
    if (indexnya == null) return false
    let limits = _dir[indexnya].glimit
    if (limits >= gcount) return true
    else false
}

const gameAdd = (id, _dir) => {
    let indexnya = getIndex(id, _dir)
    if (indexnya != null){
        _dir[indexnya].glimit += 1
        fs.writeFileSync('./database/user.json', JSON.stringify(_dir, null, 2))
    }
}

module.exports = {
    getIndex,
    createJSON,
    isUser,
    isPremium,
    addPremium,
    delPremium,
    isBanned,
    addBanned,
    delBanned,
    isLimit,
    limitAdd,
    getLimit,
    giveLimit,
    addBalance,
    kurangBalance,
    getBalance,
    isGame,
    gameAdd,
    randomNumber,
    createOTP,
    daftar
}