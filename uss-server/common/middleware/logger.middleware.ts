import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Gets the request log
    console.log(`REQUEST =>\nURL =  ${req.url}\nMETHOD = ${req.method}\nBODY = ${req.body}\nQUERY PARAMETERS = ${req.query}`);
    // Getting the response log
    getResponseLog(res);

    // Ends middleware function execution, hence allowing to move on 
    if (next) {
      next();
    }
  }
}
const getResponseLog = (res: Response) => {
  const rawResponse = res.write;
  const rawResponseEnd = res.end;
  const chunkBuffers = [];
  res.write = (...chunks: string[] | any[]) => {
    const resArgs = [];
    for (let i = 0; i < chunks.length; i++) {
      resArgs[i] = chunks[i];
      if (!resArgs[i]) {
        res.once('drain', res.write);
        i--;
      }
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    return rawResponse.apply(res, resArgs);
  };
  console.log(`Done writing, beginning res.end`);
  res.end = (...chunk) => {
    const resArgs = [];
    for (let i = 0; i < chunk.length; i++) {
      resArgs[i] = chunk[i];
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    const body = Buffer.concat(chunkBuffers).toString('utf8');

    res.setHeader('origin', 'restjs-req-res-logging-repo');
    const responseLog = {
      response: {
        statusCode: res.statusCode,
        // Returns a shallow copy of the current outgoing headers
        headers: res.getHeaders(),
      },
    };
    if (body) {
      responseLog['body'] = JSON.parse(body) || body || {};
    }
    console.log('res: ', responseLog);
    rawResponseEnd.apply(res, resArgs);
    return responseLog as unknown as Response;
  };
};