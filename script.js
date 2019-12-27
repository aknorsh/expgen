/*
 * my Random function
 */


const basestr = "abcdefghigklmnopqrstuvwxyz"
const baseSTR = "ABCDEFGHIGKLMNOPQRSTUVWXYZ"

function randn (n) {
  return Math.floor(Math.random() * n)
}
function randchar() {
  return basestr[randn(basestr.length)]
}
function randCHAR() {
  return baseSTR[randn(baseSTR.length)]
}
const mailPostfixes = ['.com', '.co.jp']
function randpostfix() {
  return mailPostfixes[randn(mailPostfixes.length)]
}
const countries = ['Japan', 'US', 'UK', 'China', 'Korea', 'Rossia']
function randCountry() {
  return countries[randn(countries.length)]
}

/*
 * Generate Data Functions
 */
const genNum = function (max) {
  return randn(max)
}

const genStr = function (max) {
  let out = ''
  for (let i = 0; i < randn(5) + 1; i++) {
    out += randchar()
  }
  return out
}

const genName = function (max) {
  let out = randCHAR()
  for (let i = 0; i < randn(5) + 3; i++) {
    out += randchar()
  }
  return out
}

const genMail = function (max) {
  return genStr(max) + '@' + genStr(max) + randpostfix()
}

const genCountry = function (max) {
  return randCountry()
}

/*
 * GLOBAL INFO
 */
const info = {
  head       : ['id', 'name', 'country', 'mail'],
  constraint : [genNum, genName, genCountry, genMail],
  dataNum    : 10000,
  style      : 'csv',
  len        : function() { return this.head.length }
}

/*
 * MAIN
 */
function generateHead (str) {
  for (let key = 0; key < info.len(); key++) {
    str += info.head[key]
    if(key !== info.len() - 1) {
      str += ','
    }
    else {
      str += '\n'
    }
  }
  return str
}
function generateDatum (str) {
  for (let key = 0; key < info.len(); key++) {
    str += info.constraint[key](info.dataNum)
    if (key !== info.len() - 1) {
      str += ','
    }
    else {
      str += '\n'
    }
  }
  return str
}
function generateData (str) {
  for (let cnt = 0; cnt < info.dataNum; cnt++) {
    for (let key = 0; key < info.len(); key++) {
      str += info.constraint[key](info.dataNum)
      if (key !== info.len() - 1) {
        str += ','
      }
      else {
        str += '\n'
      }
    }
  }
  return str
}

/*
 * Show Information
 */
function showHeads () {
  document.write(generateHead(''))
}
function showData () {
  for (let cnt = 0; cnt < info.dataNum; cnt++) {
    document.write(generateDatum('') + '<br>')
  }
}

/**
 * Download
 */

function handleDownload() {
  let content = generateHead('')
  for (let cnt = 0; cnt < info.dataNum; cnt++) {
    content += generateDatum('')
  }
  let blob = new Blob([content], { "type" : "text/plain"});

  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, "out.csv");
    window.navigator.msSaveOrOpenBlob(blob, "out.csv");
  } else {
    document.getElementById("download").href = window.URL.createObjectURL(blob);
  }
}







