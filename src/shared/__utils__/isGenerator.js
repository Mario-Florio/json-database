export default function isGenerator(obj) {
    return (
        obj && typeof obj.next === 'function' && typeof obj.throw === 'function'
    );
}
