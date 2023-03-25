<script lang="ts">
    import { currentList, todos } from "./stores";

    export let showDeleteListModal: boolean;
    let dialog: HTMLDialogElement;

    function deleteList() {
        $todos.delete($currentList);
        $todos = $todos;
        $currentList = Array.from($todos.keys())[0]
    }

    $: if (dialog && showDeleteListModal) dialog.showModal();
</script>

<dialog
    class="border-4 border-black rounded-xl"
    bind:this={dialog}
    on:close={() => (showDeleteListModal = false)}
    on:click|self={() => dialog.close()}
    on:keypress|self={() => null}
>
    <div on:click|stopPropagation on:keypress|self={() => null}>
        <p class="text-center text-black bold text-3xl mb-5">
            Delete <span class="italic text-red-500">{$currentList}</span> ?
        </p>
        <div class="flex justify-center gap-2">
            <button
                class="border-2 rounded-md border-red-500 bg-red-400 text-white bold p-2 hover:bg-red-300"
                on:click={() => {
                    deleteList();
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
