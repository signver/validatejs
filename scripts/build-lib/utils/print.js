import chalk from "chalk";

export default module();

function module() {
  const tagText = {
    info: chalk.bold.whiteBright(pad("INFO")),
    fatal: chalk.bold.redBright(pad("FATAL")),
    ok: chalk.bold.greenBright(pad("OK")),
    warn: chalk.bold.yellowBright(pad("WARN")),
  };

  const tsFormatter = new Intl.DateTimeFormat("en-sg", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  function print({ tag = tagText.info, ts = false, args = [] } = {}) {
    const innerArgs = [`[ ${tag} ]`, ...args];
    if (ts) {
      innerArgs.splice(1, 0, tsFormatter.format(new Date()));
    }
    console.log(...innerArgs);
  }
  return {
    fatal(...args) {
      print({ tag: tagText.fatal, args });
    },
    ok(...args) {
      print({ tag: tagText.ok, args });
    },
    info(...args) {
      print({ tag: tagText.info, args });
    },
    warn(...args) {
      print({ tag: tagText.warn, args });
    },
    ts: {
      fatal(...args) {
        print({ tag: tagText.fatal, ts: true, args });
      },
      ok(...args) {
        print({ tag: tagText.ok, ts: true, args });
      },
      info(...args) {
        print({ tag: tagText.info, ts: true, args });
      },
      warn(...args) {
        print({ tag: tagText.warn, ts: true, args });
      },
    },
  };
}

/** @type {(s: string, options?: { filler?: string, length?: number }) => string} */
function pad(s, { filler = " ", length = 5 } = {}) {
  return s.padEnd(length, filler);
}
