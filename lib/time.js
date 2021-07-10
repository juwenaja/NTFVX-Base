exports.tamtanggal = (WaktuJKt) => {
    var date = new Date(WaktuJKt);
    var tahun = date.getFullYear();
    var bulan1 = date.getMonth();
    var tanggal = date.getDate();
    var hari = date.getDay();
    switch(hari) {
        case 0: hari = "Minggu"; break;
        case 1: hari = "Senin"; break;
        case 2: hari = "Selasa"; break;
        case 3: hari = "Rabu"; break;
        case 4: hari = "Kamis"; break;
        case 5: hari = "Jumat"; break;
        case 6: hari = "Sabtu"; break;
    }
    switch(bulan1) {
        case 0: bulan1 = "Januari"; break;
        case 1: bulan1 = "Februari"; break;
        case 2: bulan1 = "Maret"; break;
        case 3: bulan1 = "April"; break;
        case 4: bulan1 = "Mei"; break;
        case 5: bulan1 = "Juni"; break;
        case 6: bulan1 = "Juli"; break;
        case 7: bulan1 = "Agustus"; break;
        case 8: bulan1 = "September"; break;
        case 9: bulan1 = "Oktober"; break;
        case 10: bulan1 = "November"; break;
        case 11: bulan1 = "Desember"; break;
    }
    var tampilTanggal = "" + hari + ", " + tanggal + " " + bulan1 + " " + tahun;
    return `${tampilTanggal}`
}
exports.tamHari = (WaktuJKt) => {
    var date = new Date(WaktuJKt);
    var waktoo = date.getHours();
    switch(waktoo){
        case 0: waktoo = "Hai udah tengah malam\nJangan bergadang"; break;
        case 1: waktoo = "Hai udah tengah malam\nJangan bergadang"; break;
        case 2: waktoo = "Hmmm pukul 2 subuh, bergadang atau baru bangun nih"; break;
        case 3: waktoo = "Dini Hari"; break;
        case 4: waktoo = "Subuh...\nJangan lupa shalat bagi yang muslim"; break;
        case 5: waktoo = "Subuh...\nJangan lupa shalat bagi yang muslim"; break;
        case 6: waktoo = "Selamat pagi...\nJangan lupa sarapan"; break;
        case 7: waktoo = "Selamat pagi...\nJangan lupa sarapan"; break;
        case 8: waktoo = "Selamat pagi...\nJangan lupa sarapan"; break;
        case 9: waktoo = "Selamat Pagi\nJangan malas - malasan"; break;
        case 10: waktoo = "Selamat Pagi\nJangan malas - malasan"; break;
        case 11: waktoo = "Selamat siang...\nTetap semangat ya"; break;
        case 12: waktoo = "Selamat siang...\nJangan lupa makan siang"; break;
        case 13: waktoo = "Selamat siang...\nJangan lupa makan siang"; break;
        case 14: waktoo = "Selamat siang..."; break;
        case 15: waktoo = "Selamat sore.."; break;
        case 16: waktoo = "selamat sore..."; break;
        case 17: waktoo = "Sore...\nJangan lupa mandi sore"; break;
        case 18: waktoo = "Bagi yang muslim jangan lupa shalat magrib..."; break;
        case 19: waktoo = "Selamat malam..."; break;
        case 20: waktoo = "Selamat malam..."; break;
        case 21: waktoo = "Selamat malam..."; break;
        case 22: waktoo = "Selamat malam...\nJangan bergadang"; break;
        case 23: waktoo = "Selamat malam...\nJangan bergadang"; break;
    }
    var tampilHari = "" + waktoo;
    return `${tampilHari}`
}
exports.tamWaktu = (WaktuJKt) => {
    var date = new Date(WaktuJKt);
    var jam = date.getHours();
    var menit = date.getMinutes();
    var detik = date.getSeconds();
    var tampilWaktu = "" + "Jam : " + jam + ":" + menit + ":" + detik + " Wib";
    return `${tampilWaktu}`
}