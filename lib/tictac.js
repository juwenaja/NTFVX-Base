"use strict";
const canvas = require("canvacord");
const { color, bgcolor } = require('./color');
const { isTicTacToe, getPosTic, KeisiSemua, cekIsi, cekTicTac } = require('./tictactoe');

module.exports = async (ntfvx, chats, prefix, tictactoe, from, sender, reply, mentions) => {
    try {
        // TicTacToe
        if (isTicTacToe(from, tictactoe)){
            let nomor = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            let posi = tictactoe[getPosTic(from, tictactoe)]
            let anu = posi.TicTacToe
            if (posi.status === null){
                if (sender === posi.ditantang){
                    if (chats.toLowerCase() === 'y'){
                        ntfvx.sendImage(from, canvas.Canvas.tictactoe({
                            a1: anu[0] === '❎' ? 'X' : anu[0] === '⭕' ? 'O' : '',
                            b1: anu[1] === '❎' ? 'X' : anu[1] === '⭕' ? 'O' : '',
                            c1: anu[2] === '❎' ? 'X' : anu[2] === '⭕' ? 'O' : '',
                            a2: anu[3] === '❎' ? 'X' : anu[3] === '⭕' ? 'O' : '',
                            b2: anu[4] === '❎' ? 'X' : anu[4] === '⭕' ? 'O' : '',
                            c2: anu[5] === '❎' ? 'X' : anu[5] === '⭕' ? 'O' : '',
                            a3: anu[6] === '❎' ? 'X' : anu[6] === '⭕' ? 'O' : '',
                            b3: anu[7] === '❎' ? 'X' : anu[7] === '⭕' ? 'O' : '',
                            c3: anu[8] === '❎' ? 'X' : anu[8] === '⭕' ? 'O' : ''
}), `@${posi.ditantang.split('@')[0]} menerima tantangan

@${posi.penantang.split('@')[0]} = ❎
@${posi.ditantang.split('@')[0]} = ⭕

    ${anu[0]}${anu[1]}${anu[2]}
    ${anu[3]}${anu[4]}${anu[5]}
    ${anu[6]}${anu[7]}${anu[8]}
    
Giliran @${posi.penantang.split('@')[0]}`, '', [posi.penantang, posi.ditantang])
                        tictactoe[getPosTic(from, tictactoe)].status = true 
                    } else if (chats.toLowerCase() === 't'){
                        mentions(`Yah @${posi.ditantang.split('@')[0]} menolak\nKirim ${prefix}titactoe @tag`, [posi.ditantang], false)
                        tictactoe.splice(getPosTic(from, tictactoe), 1)
                    }
                }
            } else if (posi.status === true){
                if (sender === posi.penantang){
                    for (let i of nomor){
                        if (Number(chats) === i){
                            if (cekIsi(Number(chats) - 1, anu)) return reply(`Nomor tersebut sudah terisi`)
                            tictactoe[getPosTic(from, tictactoe)].TicTacToe[Number(chats) - 1] = '❎'
                            if (cekTicTac(tictactoe[getPosTic(from, tictactoe)].TicTacToe)){
                                ntfvx.sendImage(from, canvas.Canvas.tictactoe({
                                    a1: anu[0] === '❎' ? 'X' : anu[0] === '⭕' ? 'O' : '',
                                    b1: anu[1] === '❎' ? 'X' : anu[1] === '⭕' ? 'O' : '',
                                    c1: anu[2] === '❎' ? 'X' : anu[2] === '⭕' ? 'O' : '',
                                    a2: anu[3] === '❎' ? 'X' : anu[3] === '⭕' ? 'O' : '',
                                    b2: anu[4] === '❎' ? 'X' : anu[4] === '⭕' ? 'O' : '',
                                    c2: anu[5] === '❎' ? 'X' : anu[5] === '⭕' ? 'O' : '',
                                    a3: anu[6] === '❎' ? 'X' : anu[6] === '⭕' ? 'O' : '',
                                    b3: anu[7] === '❎' ? 'X' : anu[7] === '⭕' ? 'O' : '',
                                    c3: anu[8] === '❎' ? 'X' : anu[8] === '⭕' ? 'O' : ''
}), `@${posi.penantang.split('@')[0]} Menang

@${posi.penantang.split('@')[0]} = ❎
@${posi.ditantang.split('@')[0]} = ⭕

    ${anu[0]}${anu[1]}${anu[2]}
    ${anu[3]}${anu[4]}${anu[5]}
    ${anu[6]}${anu[7]}${anu[8]}

Ingin bermain lagi? ${prefix}tictactoe`, '', [posi.penantang, posi.ditantang])

                                tictactoe.splice(getPosTic(from, tictactoe), 1)
                            } else if (KeisiSemua(anu)) {
                                ntfvx.sendImage(from, canvas.Canvas.tictactoe({
                                    a1: anu[0] === '❎' ? 'X' : anu[0] === '⭕' ? 'O' : '',
                                    b1: anu[1] === '❎' ? 'X' : anu[1] === '⭕' ? 'O' : '',
                                    c1: anu[2] === '❎' ? 'X' : anu[2] === '⭕' ? 'O' : '',
                                    a2: anu[3] === '❎' ? 'X' : anu[3] === '⭕' ? 'O' : '',
                                    b2: anu[4] === '❎' ? 'X' : anu[4] === '⭕' ? 'O' : '',
                                    c2: anu[5] === '❎' ? 'X' : anu[5] === '⭕' ? 'O' : '',
                                    a3: anu[6] === '❎' ? 'X' : anu[6] === '⭕' ? 'O' : '',
                                    b3: anu[7] === '❎' ? 'X' : anu[7] === '⭕' ? 'O' : '',
                                    c3: anu[8] === '❎' ? 'X' : anu[8] === '⭕' ? 'O' : ''
}), `Hasil seri

@${posi.penantang.split('@')[0]} = ❎
@${posi.ditantang.split('@')[0]} = ⭕

    ${anu[0]}${anu[1]}${anu[2]}
    ${anu[3]}${anu[4]}${anu[5]}
    ${anu[6]}${anu[7]}${anu[8]}

Ingin bermain lagi? ${prefix}tictactoe`, '', [posi.penantang, posi.ditantang])

                                tictactoe.splice(getPosTic(from, tictactoe), 1)
                            } else {
                                ntfvx.sendImage(from, canvas.Canvas.tictactoe({
                                    a1: anu[0] === '❎' ? 'X' : anu[0] === '⭕' ? 'O' : '',
                                    b1: anu[1] === '❎' ? 'X' : anu[1] === '⭕' ? 'O' : '',
                                    c1: anu[2] === '❎' ? 'X' : anu[2] === '⭕' ? 'O' : '',
                                    a2: anu[3] === '❎' ? 'X' : anu[3] === '⭕' ? 'O' : '',
                                    b2: anu[4] === '❎' ? 'X' : anu[4] === '⭕' ? 'O' : '',
                                    c2: anu[5] === '❎' ? 'X' : anu[5] === '⭕' ? 'O' : '',
                                    a3: anu[6] === '❎' ? 'X' : anu[6] === '⭕' ? 'O' : '',
                                    b3: anu[7] === '❎' ? 'X' : anu[7] === '⭕' ? 'O' : '',
                                    c3: anu[8] === '❎' ? 'X' : anu[8] === '⭕' ? 'O' : ''
}), `@${posi.penantang.split('@')[0]} telah mengisi

@${posi.penantang.split('@')[0]} = ❎
@${posi.ditantang.split('@')[0]} = ⭕

    ${anu[0]}${anu[1]}${anu[2]}
    ${anu[3]}${anu[4]}${anu[5]}
    ${anu[6]}${anu[7]}${anu[8]}
    
Giliran @${posi.ditantang.split('@')[0]}`, '', [posi.penantang, posi.ditantang])

                                tictactoe[getPosTic(from, tictactoe)].status = false
                                 
                            }
                        }
                    }
                }
            } else if (posi.status === false){
                if (sender === posi.ditantang){
                    for (let i of nomor){
                        if (Number(chats) === i){
                            if (cekIsi(Number(chats) - 1, anu)) return reply(`Nomor tersebut sudah terisi`)
                            tictactoe[getPosTic(from, tictactoe)].TicTacToe[Number(chats) - 1] = '⭕' 
                            if (cekTicTac(anu)){
                                ntfvx.sendImage(from, canvas.Canvas.tictactoe({
                                    a1: anu[0] === '❎' ? 'X' : anu[0] === '⭕' ? 'O' : '',
                                    b1: anu[1] === '❎' ? 'X' : anu[1] === '⭕' ? 'O' : '',
                                    c1: anu[2] === '❎' ? 'X' : anu[2] === '⭕' ? 'O' : '',
                                    a2: anu[3] === '❎' ? 'X' : anu[3] === '⭕' ? 'O' : '',
                                    b2: anu[4] === '❎' ? 'X' : anu[4] === '⭕' ? 'O' : '',
                                    c2: anu[5] === '❎' ? 'X' : anu[5] === '⭕' ? 'O' : '',
                                    a3: anu[6] === '❎' ? 'X' : anu[6] === '⭕' ? 'O' : '',
                                    b3: anu[7] === '❎' ? 'X' : anu[7] === '⭕' ? 'O' : '',
                                    c3: anu[8] === '❎' ? 'X' : anu[8] === '⭕' ? 'O' : ''
}), `@${posi.ditantang.split('@')[0]} Menang

@${posi.penantang.split('@')[0]} = ❎
@${posi.ditantang.split('@')[0]} = ⭕

    ${anu[0]}${anu[1]}${anu[2]}
    ${anu[3]}${anu[4]}${anu[5]}
    ${anu[6]}${anu[7]}${anu[8]}

Ingin bermain lagi? ${prefix}tictactoe`, '', [posi.penantang, posi.ditantang])

                                tictactoe.splice(getPosTic(from, tictactoe), 1)
                            } else if (KeisiSemua(anu)) {
                                ntfvx.sendImage(from, canvas.Canvas.tictactoe({
                                    a1: anu[0] === '❎' ? 'X' : anu[0] === '⭕' ? 'O' : '',
                                    b1: anu[1] === '❎' ? 'X' : anu[1] === '⭕' ? 'O' : '',
                                    c1: anu[2] === '❎' ? 'X' : anu[2] === '⭕' ? 'O' : '',
                                    a2: anu[3] === '❎' ? 'X' : anu[3] === '⭕' ? 'O' : '',
                                    b2: anu[4] === '❎' ? 'X' : anu[4] === '⭕' ? 'O' : '',
                                    c2: anu[5] === '❎' ? 'X' : anu[5] === '⭕' ? 'O' : '',
                                    a3: anu[6] === '❎' ? 'X' : anu[6] === '⭕' ? 'O' : '',
                                    b3: anu[7] === '❎' ? 'X' : anu[7] === '⭕' ? 'O' : '',
                                    c3: anu[8] === '❎' ? 'X' : anu[8] === '⭕' ? 'O' : ''
}), `Hasil seri

@${posi.penantang.split('@')[0]} = ❎
@${posi.ditantang.split('@')[0]} = ⭕

    ${anu[0]}${anu[1]}${anu[2]}
    ${anu[3]}${anu[4]}${anu[5]}
    ${anu[6]}${anu[7]}${anu[8]}

Ingin bermain lagi? ${prefix}tictactoe`, '', [posi.penantang, posi.ditantang])

                                tictactoe.splice(getPosTic(from, tictactoe), 1)
                            }else {
                                ntfvx.sendImage(from, canvas.Canvas.tictactoe({
                                    a1: anu[0] === '❎' ? 'X' : anu[0] === '⭕' ? 'O' : '',
                                    b1: anu[1] === '❎' ? 'X' : anu[1] === '⭕' ? 'O' : '',
                                    c1: anu[2] === '❎' ? 'X' : anu[2] === '⭕' ? 'O' : '',
                                    a2: anu[3] === '❎' ? 'X' : anu[3] === '⭕' ? 'O' : '',
                                    b2: anu[4] === '❎' ? 'X' : anu[4] === '⭕' ? 'O' : '',
                                    c2: anu[5] === '❎' ? 'X' : anu[5] === '⭕' ? 'O' : '',
                                    a3: anu[6] === '❎' ? 'X' : anu[6] === '⭕' ? 'O' : '',
                                    b3: anu[7] === '❎' ? 'X' : anu[7] === '⭕' ? 'O' : '',
                                    c3: anu[8] === '❎' ? 'X' : anu[8] === '⭕' ? 'O' : ''
}), `@${posi.ditantang.split('@')[0]} telah mengisi

@${posi.penantang.split('@')[0]} = ❎
@${posi.ditantang.split('@')[0]} = ⭕

    ${anu[0]}${anu[1]}${anu[2]}
    ${anu[3]}${anu[4]}${anu[5]}
    ${anu[6]}${anu[7]}${anu[8]}
    
Giliran @${posi.penantang.split('@')[0]}`, '', [posi.penantang, posi.ditantang])

                                tictactoe[getPosTic(from, tictactoe)].status = true
                            }
                        }
                    }
                }
            }
        }
    } catch (err){
        console.log(color('[ERROR]', 'red'), err)
    }
}