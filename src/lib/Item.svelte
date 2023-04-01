<script lang="ts">
    import { currentList, sorter, todos, type Entry } from "./stores";
    import dateFormat from "dateformat";
    import { tick } from "svelte";

    export let todo: Entry;

    let editing: boolean = false;
    let input: HTMLInputElement;
    $: created = new Date(todo.date);

    function clickHandler() {
        todo.marked = !todo.marked;
        $todos.get($currentList).sort(sorter);
        $todos = $todos;
    }

    async function editContentHandler() {
        editing = true;
        //wait to acuire the ref after rendering the input element
        await tick();
        input && input.focus();
    }

    function saveContentHandler() {
        $todos = $todos;
        editing = false;
    }
</script>

<p class="mt-2 text-sm text-slate-400">
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
    <p
        on:click={() => clickHandler()}
        on:keypress={() => null}
        class="{'p-1 text-sm border-2 rounded-md bg-white hover:bg-gray-100'} {todo.marked
            ? 'bg-gray-200 text-gray-500 border-gray-500 italic line-through'
            : 'text-black border-blue-500'}"
    >
        {todo.text}
    </p>
{:else}
    <input
        bind:this={input}
        on:change={() => saveContentHandler()}
        on:focusout={() => saveContentHandler()}
        class="w-full p-1 text-sm border border-2 border-red-500 rounded-md bg-white focus:outline-none focus:border-2"
        type="text"
        bind:value={todo.text}
    />
{/if}

<style>
</style>
