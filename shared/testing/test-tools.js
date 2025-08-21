
function it(desc, fn, cleanupFn = false, logErr = false) {
    try {
        fn();
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        logErr && console.error(error);
    } finally {
        cleanupFn && cleanupFn();
    }
}

function assert(condition) {
    if (!condition) {
        throw new Error();
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export {
    it,
    assert,
    arraysEqual
}