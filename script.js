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
      col2gen: {
        id: gen.num,
        name: gen.name,
        country: gen.country,
        mail: gen.mail
      },
      message: 'abc',
      col: ['id', 'name', 'country', 'mail'],
      dataNum: 10000,
      style: 'csv'
    }
  },
  methods: {
    genHead: function (str) {
      for (let c of this.col) {
        str += c + ','
      }
      return str.slice(0, -1) + '\n'
    },
    genDatum: function (str) {
      for (let c of this.col) {
        str += this.col2gen[c](this.dataNum) + ','
      }
      return str.slice(0, -1) + '\n'
    },
    genData: function (str) {
      for (let cnt = 0; cnt < this.dataNum; cnt++) {
        str = this.genDatum(str)
      }
      return str
    },
    handleDownload: function () {
      let content = this.genData(this.genHead(''))
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
    this.res.head = this.genHead('').split(',')
    for(let cnt = 0; cnt < 10; cnt++){
      this.res.body.push(this.genDatum('').split(','))
    }
    this.res.body.push('.........')
  }
})
