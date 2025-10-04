const BLUE = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const MAGENTA = '\x1b[35m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

function prettyPrint(object) {
    if (typeof object !== 'object') {
        throw new Error('Input must be an object');
    }

    let prettyStr = '';

    prettyStr += getPrefixLabel(object.level);

    prettyStr += ' ' + object.message;

    prettyStr += ` | ${GREEN}${object.time}${RESET}`;

    const metaKeys = Object.keys(object.meta);
    if (metaKeys.length === 0) return prettyStr;

    prettyStr += '\n    ';

    let lineLength = 0;
    const metaArr = Object.entries(object.meta);
    let i = 0;
    for (const [key, value] of metaArr) {
        lineLength += key.length + String(value).length + 5;
        prettyStr += `${greenWrapper(key)}: ${magentaWrapper(value)} | `;

        if (i < metaArr.length - 1 && lineLength > 80) {
            prettyStr += '\n    ';
            lineLength = 0;
        }

        i++;
    }

    return prettyStr;
}

function getPrefixLabel(str) {
    switch (str.toLowerCase()) {
        case 'info':
            return `[${blueWrapper(str.toUpperCase())}]`;
        case 'warn':
            return `[${yellowWrapper(str.toUpperCase())}]`;
        case 'error':
            return `[${redWrapper(str.toUpperCase())}]`;
        default:
            return `[${str.toUpperCase()}]`;
    }
}

function blueWrapper(str) {
    return `${BLUE}${str}${RESET}`;
}

function magentaWrapper(str) {
    return `${MAGENTA}${str}${RESET}`;
}

function greenWrapper(str) {
    return `${GREEN}${str}${RESET}`;
}

function yellowWrapper(str) {
    return `${YELLOW}${str}${RESET}`;
}

function redWrapper(str) {
    return `${RED}${str}${RESET}`;
}

export default prettyPrint;
