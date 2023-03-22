<script lang="ts">
    import Form from "./lib/Form.svelte";
    import Item from "./lib/Item.svelte";
    import { todos } from "./lib/stores";
</script>

<main class="sm:w-1/2 sm:mx-auto p-2">
    <Form />
    {#if $todos.length}
        {#each $todos as todo}
            <Item {todo} />
        {/each}
    {:else}
        <p class="mt-2 text-xl">No todos to show !</p>
    {/if}
    <p class="text-slate-400 mt-5 p-2">
        Todo list app by <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/laskolaskov/todo-app">Lasko Laskov</a
        >
    </p>
</main>

<style>
</style>
