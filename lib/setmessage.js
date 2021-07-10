const fs = require('fs')

// ---------------- WELCOME ------------------

const setwelcome = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/setwelcome.json', JSON.stringify(_dib, null, 2))
}
const cengwelcome = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/setwelcome.json', JSON.stringify(_dib, null, 2))
    }
}
const welcomeposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getwelcome = (chatId, _dib) => {
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
const cekwelcome = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- LEFT ------------------

const setleft = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/setleft.json', JSON.stringify(_dib, null, 2))
}
const cengleft = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/setleft.json', JSON.stringify(_dib, null, 2))
    }
}
const leftposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getleft = (chatId, _dib) => {
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
const cekleft = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- ADD ------------------
const setadd = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/setinvite.json', JSON.stringify(_dib, null, 2))
}
const cengadd = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/setinvite.json', JSON.stringify(_dib, null, 2))
    }
}
const addposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getadd = (chatId, _dib) => {
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
const cekadd = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- KICKED ------------------

const setkick = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/setkick.json', JSON.stringify(_dib, null, 2))
}
const cengkick = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/setkick.json', JSON.stringify(_dib, null, 2))
    }
}
const kickposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getkick = (chatId, _dib) => {
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
const cekkick = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- PROMOTE ------------------

const setpromote = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/setpromote.json', JSON.stringify(_dib, null, 2))
}
const cengpromote = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/setpromote.json', JSON.stringify(_dib, null, 2))
    }
}
const promoteposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getpromote = (chatId, _dib) => {
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
const cekpromote = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- DEMOTE ------------------

const setdemote = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/setdemote.json', JSON.stringify(_dib, null, 2))
}
const cengdemote = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/setdemote.json', JSON.stringify(_dib, null, 2))
    }
}
const demoteposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getdemote = (chatId, _dib) => {
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
const cekdemote = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- OPEN ------------------

const setopen = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/open.json', JSON.stringify(_dib, null, 2))
}
const cengopen = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/open.json', JSON.stringify(_dib, null, 2))
    }
}
const openposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getopen = (chatId, _dib) => {
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
const cekopen = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- CLOSE ------------------

const setclose = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/close.json', JSON.stringify(_dib, null, 2))
}
const cengclose = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/close.json', JSON.stringify(_dib, null, 2))
    }
}
const closeposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getclose = (chatId, _dib) => {
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
const cekclose = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- PP GROUP ------------------

const setppgroup = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/ppgroup.json', JSON.stringify(_dib, null, 2))
}
const cengppgroup = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/ppgroup.json', JSON.stringify(_dib, null, 2))
    }
}
const ppgroupposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getppgroup = (chatId, _dib) => {
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
const cekppgroup = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- DESC ------------------

const setdesc = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/desc.json', JSON.stringify(_dib, null, 2))
}
const cengdesc = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/desc.json', JSON.stringify(_dib, null, 2))
    }
}
const descposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getdesc = (chatId, _dib) => {
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
const cekdesc = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- LINK ------------------

const setlink = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/link.json', JSON.stringify(_dib, null, 2))
}
const cenglink = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/link.json', JSON.stringify(_dib, null, 2))
    }
}
const linkposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getlink = (chatId, _dib) => {
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
const ceklink = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

// ---------------- NAME ------------------

const setname = (chatId, pesan, _dib) => {
    const obj = { id: chatId, pesan: pesan }
    _dib.push(obj)
    fs.writeFileSync('./database/group/name.json', JSON.stringify(_dib, null, 2))
}
const cengname = (chatId, pesan, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        _dib[position].pesan = pesan
        fs.writeFileSync('./database/group/name.json', JSON.stringify(_dib, null, 2))
    }
}
const nameposition = (chatId, _dib) => {
    let position = null
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            position = i
        }
    })
    return position
}
const getname = (chatId, _dib) => {
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
const cekname = (chatId, _dib) => {
    let id = false
    Object.keys(_dib).forEach((i) => {
        if (_dib[i].id === chatId) {
            id = true
        }
    })
    return id
}

module.exports = {
    setwelcome,
    cengwelcome,
    welcomeposition,
    getwelcome,
    cekwelcome, 

    setleft,
    cengleft,
    leftposition,
    getleft,
    cekleft,

    setadd,
    cengadd,
    addposition,
    getadd,
    cekadd, 

    setkick,
    cengkick,
    kickposition,
    getkick,
    cekkick,

    setpromote,
    cengpromote,
    promoteposition,
    getpromote,
    cekpromote,

    setdemote,
    cengdemote,
    demoteposition,
    getdemote,
    cekdemote,

    setopen,
    cengopen,
    openposition,
    getopen,
    cekopen,

    setclose,
    cengclose,
    closeposition,
    getclose,
    cekclose,

    setppgroup,
    cengppgroup,
    ppgroupposition,
    getppgroup,
    cekppgroup,

    setdesc,
    cengdesc,
    descposition,
    getdesc,
    cekdesc,

    setlink,
    cenglink,
    linkposition,
    getlink,
    ceklink,

    setname,
    cengname,
    nameposition,
    getname,
    cekname
}