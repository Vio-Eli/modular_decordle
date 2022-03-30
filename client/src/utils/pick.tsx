// Picks a random word from dict.json
export default function pick<T>(array: Array<T>): T {
    return array[Math.floor(array.length * Math.random())]
}