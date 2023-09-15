<p align='center'><a href="https://instagram.com/juwendy_s"><img height="200" src="https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//87/MTA-12336324/netflix_netflix_premium_1_tahun_uhd_4k_e-ticket_-selalu_ready-_full02_do3lcfat.jpg"></a>&nbsp;&nbsp;</p>
<p align="center">
<a href="https://github.com/juwenaja"><img title="Author" src="https://img.shields.io/badge/NTFVX | W3NN-black.svg?style=for-the-badge&logo=github"></a>
</p>

# NTFVX Bot

## Getting Started

### This project require NodeJS v14 or latest.

### FFMPEG
- [DOWNLOAD](https://ffmpeg.org/)
- [TUTORIAL](https://youtu.be/04Gf6TEnmjk)

### IMAGEMAGICK
- [DOWNLOAD](https://imagemagick.org/script/download.php)
Note : Kalo Mau Work, Centang Kolom 1,2,3,5,6

## 🧾 Installing the Tesseract
* Download the file [here](https://s.id/vftesseract).
* After that, run downloaded file as Administrator.
* Complete the installation.
* Run Command Prompt as Administrator.
* Run this command:
```cmd
setx /m PATH "C:\Program Files\Tesseract-OCR;%PATH%"
```
It will give us a callback like `SUCCESS: specified value was saved`.
* Now that you've Tesseract installed, verify that it's working by running this command to see version number:
```cmd
tesseract -version
```

## 🛠️ Installing the FFmpeg
* Download one of the available versions of FFmpeg by clicking [this link](https://www.gyan.dev/ffmpeg/builds/).
* Extract the file to `C:\` path.
* Rename the extracted folder to `ffmpeg`.
* Run Command Prompt as Administrator.
* Run this command:
```cmd
setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
It will give us a callback like `SUCCESS: specified value was saved`.
* Now that you've FFmpeg installed, verify that it's working by running this command to see version number:
```cmd
ffmpeg -version
```

## 📷 Installing the libwebp
The installation is same as you install FFmpeg but whatever. I will make it clear.
* Download the file according to the OS you are using by clicking [this link](https://developers.google.com/speed/webp/download).
* Extract the file to `C:\` path.
* Rename the extracted file to `libwebp`.
* Run Command Prompt as Administrator.
* Run this command:
```cmd
> setx /m PATH "C:\libwebp\bin;%PATH%"
```
It will give us a callback like `SUCCESS: specified value was saved`.
* Now that you've libwebp installed, verify that it's installed by running this command to see version number:
```cmd
webpmux -version
```


## Install

Install the dependencies:

```bash
npm install
```


## Usage

1. NORMAL RUNNING

```bash
npm start
```

2. RUN WITH PM2

Install PM2 First :
```bash
npm install pm2 -g
```

After installing PM2, run with:
```bash
pm2 start main.js
```

And for monitoring:
```bash
pm2 logs
```

after running it you need to scan the qr

---

# Thanks to
* [`Dika`](https://github.com/DikaArdnt)
* [`Nanda`](https://github.com/nugraizy)
* [`Baileys`](https://github.com/WhiskeySockets/Baileys)
