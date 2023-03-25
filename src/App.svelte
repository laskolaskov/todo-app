<script lang="ts">
    import Form from "./lib/Form.svelte";
    import Item from "./lib/Item.svelte";
    import Lists from "./lib/Lists.svelte";
    import { todos, currentList } from "./lib/stores";

    $: list = $todos.get($currentList)

    window.addEventListener("load", () => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("service-worker.js");
        }
    });
</script>

<main class="lg:w-1/2 lg:mx-auto p-2">
    <Lists />
    <Form />
    {#if list && list.length}
        {#each list as todo}
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
