const base = {
  lchar: 'abcdefghigklmnopqrstuvwxyz',
  uchar: 'ABCDEFGHIGKLMNOPQRSTUVWXYZ',
  mailp: ['.com', '.co.jp'],
  countries: ['Japan', 'US', 'UK', 'China', 'Korea', 'Rossia']
}

const rand = function () {
  const randn = n => Math.floor(Math.random() * n)
  const randc = arr => arr[randn(arr.length)]
  const lchar = () => randc(base.lchar)
  const str = () => Array(randn(5) + 1).fill().map(_=>lchar()).join('')
  return {
    int: randn,
    lchar: lchar,
    uchar: () => randc(base.uchar),
    str: str,
    mailPost: () => randc(base.mailp),
    country: () => randc(base.countries)
  }
}.call()

const gen = {
  num: (max) => rand.int(max),
  str: (max) => rand.str(),
  name: (max) => rand.uchar() + rand.str(),
  mail: (max) => rand.str() + '@' + rand.str() + rand.mailPost(),
  country: (max) => rand.country()
}

new Vue({
  el: '#main',
  data: function () {
    return {
      res: {
        head: '',
        body: []
      },
      message: 'abc',
      info: {
        head       : ['id', 'name', 'country', 'mail'],
        constraint : [gen.num, gen.name, gen.country, gen.mail],
        dataNum    : 10000,
        style      : 'csv',
        len        : 4
      }
    }
  },
  methods: {
    generateHead: function (str) {
      for (let key = 0; key < this.info.len; key++) {
        str += this.info.head[key]
        if(key !== this.info.len - 1) {
          str += ','
        }
        else {
          str += '\n'
        }
      }
      return str
    },
    generateDatum: function (str) {
      for (let key = 0; key < this.info.len; key++) {
        str += this.info.constraint[key](this.info.dataNum)
        if (key !== this.info.len - 1) {
          str += ','
        }
        else {
          str += '\n'
        }
      }
      return str
    },
    generateData: function (str) {
      for (let cnt = 0; cnt < this.info.dataNum; cnt++) {
        str = this.generateDatum(str)
      }
      return str
    },
    handleDownload: function () {
      let content = this.generateData(this.generateHead(''))
      let blob = new Blob([content], { "type" : "text/plain"});
      
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "out.csv");
        window.navigator.msSaveOrOpenBlob(blob, "out.csv");
      } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
      }
    }
  },
  created: function () {
    this.res.head = this.generateHead('').split(',')
    for(let cnt = 0; cnt < 10; cnt++){
      this.res.body.push(this.generateDatum('').split(','))
    }
    this.res.body.push('.........')
  }
})
