<script lang="ts">
    import { sorter, todos, type Entry } from "./stores";
    import dateFormat from "dateformat";
    import { tick } from "svelte";

    export let todo: Entry;

    let editing: boolean = false;
    let input: HTMLInputElement;
    $: created = new Date(todo.date);

    function clickHandler() {
        todo.marked = !todo.marked;
        $todos.sort(sorter);
        $todos = $todos;
    }

    async function editContentHandler() {
        editing = true;
        //wait to acuire the ref after rendering the input element
        await tick()
        input && input.focus();
    }

    function saveContentHandler() {
        $todos = $todos
        editing = false
    }
</script>

<p class="mt-4 text-slate-400">
    <span class="mr-5 ml-2 italic"
        >{dateFormat(created.toString(), "dd.mm.yyyy HH:MM")}</span
    >
    <button
        type="button"
        on:click={() => editContentHandler()}
        class="mr-5 ml-2">EDIT</button
    >
</p>
{#if !editing}
    <div
        on:click={() => clickHandler()}
        on:keypress={() => null}
        class="{'p-2 text-xl border-2 rounded-md bg-white hover:bg-gray-100'} {todo.marked
            ? 'bg-gray-200 text-gray-500 border-gray-500 italic line-through'
            : 'text-black border-blue-500'}"
    >
        <p>{todo.text}</p>
    </div>
{:else}
    <div>
        <input
            bind:this={input}
            on:change={() => saveContentHandler()}
            class="w-full p-2 text-xl border-2 rounded-md bg-white hover:bg-gray-100"
            type="text"
            bind:value={todo.text}
        />
    </div>
{/if}

<style>
</style>
