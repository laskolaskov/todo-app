<script lang="ts">
    import { currentList, initData, todos } from "./stores";

    export let showDeleteAllModal: boolean;
    let dialog: HTMLDialogElement;

    function deleteAll() {
        $todos = initData
        $currentList = Array.from($todos.keys())[0]
    }

    $: if (dialog && showDeleteAllModal) dialog.showModal();
</script>

<dialog
    class="border-4 border-black rounded-xl"
    bind:this={dialog}
    on:close={() => (showDeleteAllModal = false)}
    on:click|self={() => dialog.close()}
    on:keypress|self={() => null}
>
    <div on:click|stopPropagation on:keypress|self={() => null}>
        <p class="text-center text-black bold text-3xl mb-5">
            Delete <span class="text-red-500">all lists</span> ?
        </p>
        <div class="flex justify-center gap-2">
            <button
                class="border-2 rounded-md border-red-500 bg-red-400 text-white bold p-2 hover:bg-red-300"
                on:click={() => {
                    deleteAll();
                    dialog.close();
                }}
                on:keypress={() => null}>YES</button
            >
            <button
                class="border-2 rounded-md border-blue-500 bg-blue-400 text-white bold p-2 hover:bg-blue-300"
                on:click={() => dialog.close()}
                on:keypress={() => null}>NO</button
            >
        </div>
    </div>
</dialog>
