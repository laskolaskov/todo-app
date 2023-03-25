<script lang="ts">
    import { sorter, todos, currentList } from "../lib/stores";
    import ClearListModal from "./ClearListModal.svelte";
    import DeleteAllModal from "./DeleteAllModal.svelte";
    import DeleteListModal from "./DeleteListModal.svelte";
    import NewListModal from "./NewListModal.svelte";

    let val: string;
    let showClearListModal = false;
    let showCreateListModal = false;
    let showDeleteListModal = false;
    let showDeleteAllModal = false;

    $: lists = $todos.keys();

    function submitHandler() {
        if (!val) {
            return;
        }
        $todos.get($currentList).push({
            text: val,
            marked: false,
            date: Date.now(),
        });
        $todos.get($currentList).sort(sorter);
        //assignment triggers Svelte reactivity
        $todos = $todos;
        //clear input value
        val = "";
    }

    function clearMarked() {
        $todos.set(
            $currentList,
            $todos.get($currentList).filter((item) => !item.marked)
        );
        $todos = $todos;
    }
</script>

<select
    class="text-md p-1 border-2 border-blue-500 rounded-md text-black bold hover:bg-gray-10 w-full"
    bind:value={$currentList}
    on:change={() => console.log("select change")}
>
    {#each [...lists] as list}
        <option value={list}>
            {list}
        </option>
    {/each}
</select>
<div class="my-2">
    <button
        on:click={() => (showCreateListModal = true)}
        class="text-md p-1 mr-2 border-2 border-blue-500 rounded-md text-white bold bg-blue-400 hover:bg-blue-300"
        >CREATE NEW LIST</button
    >
    <button
        on:click={() => showDeleteListModal = true}
        class="text-md p-1 border-2 border-red-500 rounded-md text-white bold bg-red-400 hover:bg-red-300"
        >DELETE LIST</button
    >
    <button
        on:click={() => showDeleteAllModal = true}
        class="text-md p-1 border-2 border-red-500 rounded-md text-white bold bg-red-400 hover:bg-red-300"
        >DELETE ALL</button
    >
</div>

<form on:submit|preventDefault={() => submitHandler()}>
    <button type="submit" class="text-xl mt-2 p-1 font-bold"
        >Add new todo:</button
    >
    <input
        bind:value={val}
        name="new"
        class="mt-2 block w-full border-4 border-slate-600 rounded-md text-xl h-12 bg-slate-100 p-2"
        type="text"
    />
    <button
        on:click={() => clearMarked()}
        class="mr-2 mt-2 text-xl p-2 border-2 border-green-500 rounded-md text-white bold bg-green-400 hover:bg-green-300"
        >CLEAR MARKED</button
    >
    <button
        on:click={() => (showClearListModal = true)}
        class="text-xl p-2 border-2 border-red-500 rounded-md text-white bold bg-red-400 hover:bg-red-300"
        >CLEAR LIST</button
    >
</form>

<ClearListModal bind:showClearListModal />
<NewListModal bind:showCreateListModal />
<DeleteListModal bind:showDeleteListModal />
<DeleteAllModal bind:showDeleteAllModal />

<style>
</style>
