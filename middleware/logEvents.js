import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logEvents = async (message, logName) => {

    const dateTime = dayjs().format('MMMM D YYYY HH:mm:ss');
    const logItem = `${dateTime}\t${randomUUID()}\t${message}\n`;
    try {
        await fsPromises.mkdir(path.join(__dirname, '..', 'log'), { recursive: true });
        await fsPromises.appendFile(path.join(__dirname, '..', 'log', logName), logItem);
    } catch (error) {
        console.error(error);
    }
}
const logger = async (req, res, next) => {
    const message = `${req.method}\t${req.headers.origin}\t${req.path}`
    logEvents(message, 'requestLog.txt');
    next();
}

export { logEvents, logger };










