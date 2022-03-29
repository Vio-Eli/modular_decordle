export default function pick<T>(array: Array<T>): T {
    return array[Math.floor(array.length * Math.random())]
}