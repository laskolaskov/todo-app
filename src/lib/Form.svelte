<script lang="ts">
    import { sorter, todos, currentList } from "../lib/stores";
    import ClearListModal from "./ClearListModal.svelte";

    let val: string;
    let showClearListModal = false;

    function submitHandler() {
        if (!val || !val.length) {
            return;
        }
        $todos.get($currentList).push({
            text: val.trim(),
            marked: false,
            date: Date.now(),
        });
        $todos.get($currentList).sort(sorter);
        $todos = $todos;
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

<form on:submit|preventDefault={() => submitHandler()}>
    <button type="submit" class="text-md mt-2 p-1 font-bold"
        >Add new todo:</button
    >
    <input
        bind:value={val}
        name="new"
        class="mt-2 block w-full border-2 border-slate-600 rounded-md text-md h-8 bg-slate-100 p-2"
        type="text"
    />
    <button
        on:click={() => clearMarked()}
        class="mt-2 text-sm p-1 border-2 border-green-500 rounded-md text-white bold bg-green-400 hover:bg-green-300"
        >CLEAR MARKED</button
    >
    <button
        on:click={() => (showClearListModal = true)}
        class="text-sm p-1 border-2 border-red-500 rounded-md text-white bold bg-red-400 hover:bg-red-300"
        >CLEAR LIST</button
    >
</form>

<ClearListModal bind:showClearListModal />

<style>
</style>
