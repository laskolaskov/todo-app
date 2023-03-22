<script lang="ts">
    import { sorter, todos } from "../lib/stores";
    import ClearListModal from "./ClearListModal.svelte";

    let val: string;
    let showModal = false;
    function submitHandler() {
        if (!val) {
            return;
        }
        $todos.push({
            text: val,
            marked: false,
            date: Date.now(),
        });
        $todos.sort(sorter);
        //assignment triggers Svelte reactivity
        $todos = $todos;
        //clear input value
        val = "";
    }

    function clearMarked() {
        $todos = $todos.filter((item) => !item.marked);
    }
</script>

<form on:submit|preventDefault={() => submitHandler()}>
    <button type="submit" class="text-xl p-2 font-bold">Add new todo:</button>
    <input
        bind:value={val}
        name="new"
        class="mt-4 block w-full border-4 border-slate-600 rounded-md text-xl h-12 bg-slate-100 p-2"
        type="text"
    />
    <button
        on:click={() => clearMarked()}
        class="mr-2 mt-2 text-xl p-2 border-2 border-green-500 rounded-md text-white bold bg-green-400 hover:bg-green-300"
        >CLEAR MARKED</button
    >
    <button
        on:click={() => (showModal = true)}
        class="text-xl p-2 border-2 border-red-500 rounded-md text-white bold bg-red-400 hover:bg-red-300"
        >CLEAR LIST</button
    >
</form>

<ClearListModal bind:showModal />

<style>
</style>
