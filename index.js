const http = require('http');

const port = 3000;
const fs = require('fs');
const path = require('path');

const dir = './public';

const getFiles = (directory) => {
  const directoryList = [];
  const fileList = fs.readdirSync(directory);
  fileList.forEach((element) => {
    if (fs.statSync(`${directory}/${element}`).isDirectory()) {
      directoryList.push({ type: 'dir', name: `${element}`, parentDir: `${directory}` });
      getFiles(`${directory}/${element}`);
    } else {
      directoryList.push({ type: 'file', name: `${element}`, parentDir: `${directory}` });
    }
  });
  console.log(directoryList);
  return directoryList;
};

const requestHandler = (request, response) => {
  response.writeHead(200);
  response.write(`<html><head><title>Directory listing for ${dir} </title><head><body><h1>Directory listing for ${dir}</h1>`);
  console.log(request.url);
  const fileList = getFiles(dir);
  response.write('<ul>');
  fileList.forEach((element) => {
    if (element.parentDir === dir) {
      response.write(`<li> ${element.name} </li>`);
    }
  });
  response.end('hello');
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('error', err);
  }
  console.log(`server is listening on ${port}`);
});
