import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import { write, writeFileSync, existsSync, mkdirSync } from 'node:fs';
// import { readFileSync } from 'node:fs';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/capture', (req, res) => {
  res.sendFile(join(__dirname, 'capture.html'));
});

app.get('/:id', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.post('/:id/capture', (req, res) => {
  let body = '';
  let id = req.params.id;
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    let post = '';
    post = JSON.parse(body);
    let data = post.data.replace(/^data:image\/\w+;base64,/, '');
    let buf = Buffer.from(data, 'base64');
    const savedImageDirectoryPath = join(__dirname, "data");
    if (existsSync(savedImageDirectoryPath) === false) {
      mkdirSync(savedImageDirectoryPath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
    writeFileSync(join(__dirname, `data/${id}.png`), buf, function (err) {
      console.error(err);
    });
  });
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  socket.on('disconnect', (reason, details) => {
    if (socket.active) {
      console.log("temporarily disconnected. try to reconnect.");
    } else {
      console.log(`${socket.id} disconnected`);
    }
  });

  socket.on('capture', () => {
    console.log('capture');
    io.emit('capture');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
