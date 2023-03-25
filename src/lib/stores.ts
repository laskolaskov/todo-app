import { writable } from "svelte/store"

const storageKey = 'lasko-laskov-todo-app'
export type Entry = {
    text: string
    marked: boolean,
    date: number
}

const fromStorage = localStorage.getItem(storageKey)
let data: Map<string, Entry[]> = checkStorage(fromStorage) ? new Map(JSON.parse(fromStorage)) : new Map([["main", []]])

export const todos = writable(data)
export const currentList = writable("main")

todos.subscribe((v) => localStorage.setItem(storageKey, JSON.stringify(Array.from(v.entries()))))

function checkStorage(data: string) {
    if(null === data) {
        return false
    }
    const parsed = JSON.parse(data)
    if(!Array.isArray(parsed) || parsed.length === 0) {
        return false
    }
    if(!Array.isArray(parsed[0])) {
        return false
    }
    //if parsed data is array of arrays, it can be used to create map
    return true
}

export function sorter(a: Entry, b: Entry) {
    if (a.marked !== b.marked) {
        return a.marked ? 1 : -1
    } else {
        //newest todos go to bottom to prioritize older todos :)
        return a.date - b.date
    }
}