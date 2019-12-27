const basestr = 'abcdefghigklmnopqrstuvwxyz'
const baseSTR = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ'

const randn = n => Math.floor(Math.random() * n)
const randchar = () => basestr[randn(basestr.length)]
const randCHAR = () => baseSTR[randn(baseSTR.length)]

const mailPostfixes = ['.com', '.co.jp']
const randpostfix = () => mailPostfixes[randn(mailPostfixes.length)]
const countries = ['Japan', 'US', 'UK', 'China', 'Korea', 'Rossia']
const randCountry = () => countries[randn(countries.length)]

const genNum = (max) => randn(max)

const genStr = (max) => {
    let out = ''
    for (let i = 0; i < randn(5) + 1; i++) {
        out += randchar()
    }
    return out
}

const genName = (max) => {
    let out = randCHAR()
    for (let i = 0; i < randn(5) + 3; i++) {
        out += randchar()
    }
    return out
}

const genMail = (max) => genStr(max) + '@' + genStr(max) + randpostfix()

const genCountry = (max) => randCountry()


new Vue({
    el: '#main',
    data: function () {
        return {
            res: '',
            message: 'abc',
            info: {
                head       : ['id', 'name', 'country', 'mail'],
                constraint : [genNum, genName, genCountry, genMail],
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
        this.res = this.generateData(this.generateHead(''))
    }
})
