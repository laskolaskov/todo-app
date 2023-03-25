<script lang="ts">
    import { todos, currentList } from "../lib/stores";
    import DeleteAllModal from "./DeleteAllModal.svelte";
    import DeleteListModal from "./DeleteListModal.svelte";
    import NewListModal from "./NewListModal.svelte";

    let showCreateListModal = false;
    let showDeleteListModal = false;
    let showDeleteAllModal = false;

    $: lists = Array.from($todos.keys());
</script>

<select
    class="text-md p-1 border-2 border-blue-500 rounded-md text-black bold hover:bg-gray-10 w-full"
    bind:value={$currentList}
    on:change={() => console.log("select change")}
>
    {#each lists as list}
        <option value={list}>
            {list}
        </option>
    {/each}
</select>
<div class="my-2">
    <button
        on:click={() => (showCreateListModal = true)}
        class="text-md p-1 border-2 border-blue-500 rounded-md text-white bold bg-blue-400 hover:bg-blue-300"
        >CREATE NEW LIST</button
    >
    <button
        on:click={() => (showDeleteListModal = true)}
        class="text-md p-1 border-2 border-red-500 rounded-md text-white bold bg-red-400 hover:bg-red-300"
        >DELETE LIST</button
    >
    <button
        on:click={() => (showDeleteAllModal = true)}
        class="text-md p-1 border-2 border-red-500 rounded-md text-white bold bg-red-400 hover:bg-red-300"
        >DELETE ALL</button
    >
</div>

<NewListModal bind:showCreateListModal unclosable={false} />
<DeleteListModal bind:showDeleteListModal />
<DeleteAllModal bind:showDeleteAllModal />
