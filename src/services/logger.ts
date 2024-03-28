
// const levels : any = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4
// }

export default function logger(name: string = 'default') {
  function log(level: string, s: string) {
    // if (levels[config.LOG_LEVEL] < levels[level]) {
    //   return;
    // }
    const ts = new Date().toISOString();
    const formatted = `${ts} [${level.toUpperCase()}] (${name}) : ${s}`;
    console.log(formatted); // eslint-disable-line no-console
  }

  return {
    error: (s: string) => log('error', s),
    warn: (s: string) => log('warn', s),
    info: (s: string) => log('info', s),
    verbose: (s: string) => log('verbose', s),
    debug: (s: string) => log('debug', s)
  }
}
