const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8080;

const htmlPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'style.css');

fs.readFile(htmlPath,'utf8', (err, htmlContent) => {
    if(err){
        console.error("error in reloading HTML ",err);
        return;
    }
    fs.readFile(cssPath, 'utf8', (err, cssContent) => {
        if(err){
            console.error("error in reloading CSS ",err);
            return;
        }
        http.createServer((req, res) => {
            if(req.url === '/'){
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(`<html><head><style>${cssContent}</style></head><body>${htmlContent}</body></html>`);
                res.end();
            }  else if(req.url === '/styles.css'){
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(cssContent);
                res.end();
            }   else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('404 Not Found');
                res.end();
            }
            
        }).listen(PORT, () => { console.log(`Server is running on port ${PORT}`); } );
    })
})
