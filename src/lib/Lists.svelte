<script lang="ts">
    import { todos, currentList } from "../lib/stores";
    import DeleteAllModal from "./DeleteAllModal.svelte";
    import DeleteListModal from "./DeleteListModal.svelte";
    import EditListModal from "./EditListModal.svelte";
    import NewListModal from "./NewListModal.svelte";

    let showCreateListModal = false;
    let showDeleteListModal = false;
    let showDeleteAllModal = false;
    let showEditListModal = false;

    $: lists = Array.from($todos.keys());
</script>

<select
    class="text-sm p-1 border-2 border-blue-500 rounded-md text-black bold hover:bg-gray-10 w-full"
    bind:value={$currentList}
>
    {#each lists as list}
        <option value={list}>
            {list}
        </option>
    {/each}
</select>
<div>
    <div class="my-1">
        <button
            on:click={() => (showCreateListModal = true)}
            class="text-sm p-1 border-2 border-blue-500 rounded-md text-white bold bg-blue-400 hover:bg-blue-300"
            >CREATE LIST</button
        >
        <button
            on:click={() => (showDeleteAllModal = true)}
            class="text-sm p-1 border-2 border-red-500 rounded-md text-white bold bg-red-400 hover:bg-red-300"
            >DELETE ALL</button
        >
    </div>
    <div>
        <button
            on:click={() => (showEditListModal = true)}
            class="text-sm p-1 border-2 border-orange-500 rounded-md text-white bold bg-orange-400 hover:bg-orange-300"
            >EDIT LIST</button
        >
        <button
            on:click={() => (showDeleteListModal = true)}
            class="text-sm p-1 border-2 border-red-500 rounded-md text-white bold bg-red-400 hover:bg-red-300"
            >DELETE LIST</button
        >
    </div>
</div>

<NewListModal bind:showCreateListModal unclosable={false} />
<EditListModal bind:showEditListModal />
<DeleteListModal bind:showDeleteListModal />
<DeleteAllModal bind:showDeleteAllModal />
