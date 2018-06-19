const http = require('http');

const port = 3000;
const fs = require('fs');
const path = require('path');

const requestHandler = (request, response) => {
  console.log(request.url);
  response.end('hello');
};
const getFiles = (dir, fileList) => {
  //fileList = fileList || [];
  var fileList = fs.readdirSync(dir);
  console.log(fileList)
  for (const i in fileList) {
    const name = `${dir}/${fileList[i]}`;
    
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else {
      fileList.push(name);
    }
  }
  
  return fileList;
};
getFiles('./')
const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('error', err);
  }
  console.log(`server is listening on ${port}`);
});
