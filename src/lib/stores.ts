import { writable } from "svelte/store"

const storageKey = 'lasko-laskov-todo-app'
export type Entry = {
    text: string
    marked: boolean,
    date: number
}

let items: Entry[] = JSON.parse(localStorage.getItem(storageKey))

export const todos = writable(items)

todos.subscribe((v) => localStorage.setItem(storageKey, JSON.stringify(v)))

export function sorter(a: Entry, b: Entry) {
    if (a.marked !== b.marked) {
        return a.marked ? 1 : -1
    } else {
        //newest todos go to bottom to prioritize older todos :)
        return a.date - b.date
    }
}