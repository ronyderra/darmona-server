import { Request, Response } from "express";
import { validationResult } from "express-validator";
import domainManager from "../../services/name";

const buyDomain = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { domainName } = req.body;
    console.log({ domainName });

    const resp = await domainManager.buyDomain(String(domainName));
    console.log(resp.response.data);

    if (resp.response.status !== 200) {
        return res.status(400).send(resp.response.data);
    } else {
        return res.status(200).json(resp);
    }
};

export default buyDomain;

// AxiosError: Request failed with status code 400
//     at settle (/Users/mrfrancis/Desktop/Darmona/darmona-server/node_modules/axios/lib/core/settle.js:19:12)
//     at Unzip.handleStreamEnd (/Users/mrfrancis/Desktop/Darmona/darmona-server/node_modules/axios/lib/adapters/http.js:570:11)
//     at Unzip.emit (node:events:525:35)
//     at Unzip.emit (node:domain:489:12)
//     at endReadableNT (node:internal/streams/readable:1359:12)
//     at processTicksAndRejections (node:internal/process/task_queues:82:21) {
//   code: 'ERR_BAD_REQUEST',
//   config: {
//     transitional: {
//       silentJSONParsing: true,
//       forcedJSONParsing: true,
//       clarifyTimeoutError: false
//     },
//     adapter: [ 'xhr', 'http' ],
//     transformRequest: [ [Function: transformRequest] ],
//     transformResponse: [ [Function: transformResponse] ],
//     timeout: 0,
//     xsrfCookieName: 'XSRF-TOKEN',
//     xsrfHeaderName: 'X-XSRF-TOKEN',
//     maxContentLength: -1,
//     maxBodyLength: -1,
//     env: { FormData: [Function], Blob: [class Blob] },
//     validateStatus: [Function: validateStatus],
//     headers: AxiosHeaders {
//       Accept: 'application/json, text/plain, */*',
//       'Content-Type': 'application/json',
//       'User-Agent': 'axios/1.4.0',
//       'Content-Length': '46',
//       'Accept-Encoding': 'gzip, compress, deflate, br'
//     },
//     auth: {
//       username: 'raul_garciafoc-test',
//       password: '621e3b34ae874776f1d7e3adc22d2ab90df0e06a'
//     },
//     method: 'post',
//     url: 'https://api.dev.name.com/v4/domains',
//     data: '{"domain":{"domainName":"asfbafrbasfgas.com"}}'
//   },
//   request: <ref *1> ClientRequest {
//     _events: [Object: null prototype] {
//       abort: [Function (anonymous)],
//       aborted: [Function (anonymous)],
//       connect: [Function (anonymous)],
//       error: [Function (anonymous)],
//       socket: [Function (anonymous)],
//       timeout: [Function (anonymous)],
//       finish: [Function: requestOnFinish]
//     },
//     _eventsCount: 7,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     destroyed: true,
//     _last: true,
//     chunkedEncoding: false,
//     shouldKeepAlive: false,
//     maxRequestsOnConnectionReached: false,
//     _defaultKeepAlive: true,
//     useChunkedEncodingByDefault: true,
//     sendDate: false,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     strictContentLength: false,
//     _contentLength: '46',
//     _hasBody: true,
//     _trailer: '',
//     finished: true,
//     _headerSent: true,
//     _closed: true,
//     socket: TLSSocket {
//       _tlsOptions: [Object],
//       _secureEstablished: true,
//       _securePending: false,
//       _newSessionPending: false,
//       _controlReleased: true,
//       secureConnecting: false,
//       _SNICallback: null,
//       servername: 'api.dev.name.com',
//       alpnProtocol: false,
//       authorized: true,
//       authorizationError: null,
//       encrypted: true,
//       _events: [Object: null prototype],
//       _eventsCount: 9,
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: 'api.dev.name.com',
//       _closeAfterHandlingError: false,
//       _readableState: [ReadableState],
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       allowHalfOpen: false,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: undefined,
//       _server: null,
//       ssl: null,
//       _requestCert: true,
//       _rejectUnauthorized: true,
//       parser: null,
//       _httpMessage: [Circular *1],
//       write: [Function: writeAfterFIN],
//       [Symbol(res)]: null,
//       [Symbol(verified)]: true,
//       [Symbol(pendingSession)]: null,
//       [Symbol(async_id_symbol)]: 287,
//       [Symbol(kHandle)]: null,
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: null,
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kCapture)]: false,
//       [Symbol(kSetNoDelay)]: false,
//       [Symbol(kSetKeepAlive)]: true,
//       [Symbol(kSetKeepAliveInitialDelay)]: 60,
//       [Symbol(kBytesRead)]: 639,
//       [Symbol(kBytesWritten)]: 387,
//       [Symbol(connect-options)]: [Object]
//     },
//     _header: 'POST /v4/domains HTTP/1.1\r\n' +
//       'Accept: application/json, text/plain, */*\r\n' +
//       'Content-Type: application/json\r\n' +
//       'User-Agent: axios/1.4.0\r\n' +
//       'Content-Length: 46\r\n' +
//       'Accept-Encoding: gzip, compress, deflate, br\r\n' +
//       'Host: api.dev.name.com\r\n' +
//       'Authorization: Basic cmF1bF9nYXJjaWFmb2MtdGVzdDo2MjFlM2IzNGFlODc0Nzc2ZjFkN2UzYWRjMjJkMmFiOTBkZjBlMDZh\r\n' +
//       'Connection: close\r\n' +
//       '\r\n',
//     _keepAliveTimeout: 0,
//     _onPendingData: [Function: nop],
//     agent: Agent {
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       defaultPort: 443,
//       protocol: 'https:',
//       options: [Object: null prototype],
//       requests: [Object: null prototype] {},
//       sockets: [Object: null prototype] {},
//       freeSockets: [Object: null prototype] {},
//       keepAliveMsecs: 1000,
//       keepAlive: false,
//       maxSockets: Infinity,
//       maxFreeSockets: 256,
//       scheduling: 'lifo',
//       maxTotalSockets: Infinity,
//       totalSocketCount: 0,
//       maxCachedSessions: 100,
//       _sessionCache: [Object],
//       [Symbol(kCapture)]: false
//     },
//     socketPath: undefined,
//     method: 'POST',
//     maxHeaderSize: undefined,
//     insecureHTTPParser: undefined,
//     joinDuplicateHeaders: undefined,
//     path: '/v4/domains',
//     _ended: true,
//     res: IncomingMessage {
//       _readableState: [ReadableState],
//       _events: [Object: null prototype],
//       _eventsCount: 4,
//       _maxListeners: undefined,
//       socket: [TLSSocket],
//       httpVersionMajor: 1,
//       httpVersionMinor: 1,
//       httpVersion: '1.1',
//       complete: true,
//       rawHeaders: [Array],
//       rawTrailers: [],
//       joinDuplicateHeaders: undefined,
//       aborted: false,
//       upgrade: false,
//       url: '',
//       method: null,
//       statusCode: 400,
//       statusMessage: 'Bad Request',
//       client: [TLSSocket],
//       _consuming: false,
//       _dumped: false,
//       req: [Circular *1],
//       responseUrl: 'https://raul_garciafoc-test:621e3b34ae874776f1d7e3adc22d2ab90df0e06a@api.dev.name.com/v4/domains',
//       redirects: [],
//       [Symbol(kCapture)]: false,
//       [Symbol(kHeaders)]: [Object],
//       [Symbol(kHeadersCount)]: 22,
//       [Symbol(kTrailers)]: null,
//       [Symbol(kTrailersCount)]: 0
//     },
//     aborted: false,
//     timeoutCb: null,
//     upgradeOrConnect: false,
//     parser: null,
//     maxHeadersCount: null,
//     reusedSocket: false,
//     host: 'api.dev.name.com',
//     protocol: 'https:',
//     _redirectable: Writable {
//       _writableState: [WritableState],
//       _events: [Object: null prototype],
//       _eventsCount: 3,
//       _maxListeners: undefined,
//       _options: [Object],
//       _ended: true,
//       _ending: true,
//       _redirectCount: 0,
//       _redirects: [],
//       _requestBodyLength: 46,
//       _requestBodyBuffers: [],
//       _onNativeResponse: [Function (anonymous)],
//       _currentRequest: [Circular *1],
//       _currentUrl: 'https://raul_garciafoc-test:621e3b34ae874776f1d7e3adc22d2ab90df0e06a@api.dev.name.com/v4/domains',
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(kCapture)]: false,
//     [Symbol(kBytesWritten)]: 0,
//     [Symbol(kNeedDrain)]: false,
//     [Symbol(corked)]: 0,
//     [Symbol(kOutHeaders)]: [Object: null prototype] {
//       accept: [Array],
//       'content-type': [Array],
//       'user-agent': [Array],
//       'content-length': [Array],
//       'accept-encoding': [Array],
//       host: [Array],
//       authorization: [Array]
//     },
//     [Symbol(errored)]: null,
//     [Symbol(kUniqueHeaders)]: null
//   },
//   response: {
//     status: 400,
//     statusText: 'Bad Request',
//     headers: AxiosHeaders {
//       'content-type': 'text/html; charset=UTF-8',
//       'content-length': '74',
//       connection: 'close',
//       expires: 'Thu, 19 Nov 1981 08:52:00 GMT',
//       'cache-control': 'no-store, no-cache, must-revalidate',
//       pragma: 'no-cache',
//       'set-cookie': [Array],
//       'x-frame-options': 'SAMEORIGIN',
//       vary: 'Accept-Encoding,User-Agent'
//     },
//     config: {
//       transitional: [Object],
//       adapter: [Array],
//       transformRequest: [Array],
//       transformResponse: [Array],
//       timeout: 0,
//       xsrfCookieName: 'XSRF-TOKEN',
//       xsrfHeaderName: 'X-XSRF-TOKEN',
//       maxContentLength: -1,
//       maxBodyLength: -1,
//       env: [Object],
//       validateStatus: [Function: validateStatus],
//       headers: [AxiosHeaders],
//       auth: [Object],
//       method: 'post',
//       url: 'https://api.dev.name.com/v4/domains',
//       data: '{"domain":{"domainName":"asfbafrbasfgas.com"}}'
//     },
//     request: <ref *1> ClientRequest {
//       _events: [Object: null prototype],
//       _eventsCount: 7,
//       _maxListeners: undefined,
//       outputData: [],
//       outputSize: 0,
//       writable: true,
//       destroyed: true,
//       _last: true,
//       chunkedEncoding: false,
//       shouldKeepAlive: false,
//       maxRequestsOnConnectionReached: false,
//       _defaultKeepAlive: true,
//       useChunkedEncodingByDefault: true,
//       sendDate: false,
//       _removedConnection: false,
//       _removedContLen: false,
//       _removedTE: false,
//       strictContentLength: false,
//       _contentLength: '46',
//       _hasBody: true,
//       _trailer: '',
//       finished: true,
//       _headerSent: true,
//       _closed: true,
//       socket: [TLSSocket],
//       _header: 'POST /v4/domains HTTP/1.1\r\n' +
//         'Accept: application/json, text/plain, */*\r\n' +
//         'Content-Type: application/json\r\n' +
//         'User-Agent: axios/1.4.0\r\n' +
//         'Content-Length: 46\r\n' +
//         'Accept-Encoding: gzip, compress, deflate, br\r\n' +
//         'Host: api.dev.name.com\r\n' +
//         'Authorization: Basic cmF1bF9nYXJjaWFmb2MtdGVzdDo2MjFlM2IzNGFlODc0Nzc2ZjFkN2UzYWRjMjJkMmFiOTBkZjBlMDZh\r\n' +
//         'Connection: close\r\n' +
//         '\r\n',
//       _keepAliveTimeout: 0,
//       _onPendingData: [Function: nop],
//       agent: [Agent],
//       socketPath: undefined,
//       method: 'POST',
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       joinDuplicateHeaders: undefined,
//       path: '/v4/domains',
//       _ended: true,
//       res: [IncomingMessage],
//       aborted: false,
//       timeoutCb: null,
//       upgradeOrConnect: false,
//       parser: null,
//       maxHeadersCount: null,
//       reusedSocket: false,
//       host: 'api.dev.name.com',
//       protocol: 'https:',
//       _redirectable: [Writable],
//       [Symbol(kCapture)]: false,
//       [Symbol(kBytesWritten)]: 0,
//       [Symbol(kNeedDrain)]: false,
//       [Symbol(corked)]: 0,
//       [Symbol(kOutHeaders)]: [Object: null prototype],
//       [Symbol(errored)]: null,
//       [Symbol(kUniqueHeaders)]: null
//     },
//     data: { message: 'Domain is not available', details: 'Domain exists' }
//   }
// }