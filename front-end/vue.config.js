const path = require('path')
const fs = require('fs')

module.exports = {
    devServer: {
        open: true,
        https: {
            cert: fs.readFileSync(path.join(__dirname, 'public/ca.pem')),
            key: fs.readFileSync(path.join(__dirname, 'public/ca-key.pem'))
        }
    }
}