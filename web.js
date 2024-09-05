let express = require('express');
//載入express模組
const bodyParser = require('body-parser');
const path = require('path');
//開cors
const cors = require('cors');
let app = express();
app.use(cors())
// 使用express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const env =process.argv[2]
if (env=='dev'){
    app.use(express.static(path.join(__dirname)));
    console.log('http://localhost:44306');
}else{
    app.use(express.static(path.join(__dirname,'build')));
}

//設定port位置
let port = 44306;
// 監聽 port
app.listen(port);
