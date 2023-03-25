<script lang="ts">
    import { currentList, todos } from "./stores";

    export let showModal: boolean;
    let dialog: HTMLDialogElement;

    function clearList() {
        $todos.set($currentList, []);
        $todos = $todos
    }

    $: if (dialog && showModal) dialog.showModal();
</script>

<dialog
    class="border-4 border-black rounded-xl"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
    on:keypress|self={() => null}
>
    <div on:click|stopPropagation on:keypress|self={() => null}>
        <p class="text-center text-black bold text-3xl mb-5">Are you sure ?</p>
        <button
            class="float-right border-2 rounded-md border-blue-500 bg-blue-400 text-white bold p-2 hover:bg-blue-300"
            on:click={() => dialog.close()}
            on:keypress={() => null}>CANCEL</button
        >
        <button
            class="border-2 rounded-md border-red-500 bg-red-400 text-white bold p-2 hover:bg-red-300"
            on:click={() => {
                clearList()
                dialog.close()
            }}
            on:keypress={() => null}>CLEAR</button
        >
    </div>
</dialog>
