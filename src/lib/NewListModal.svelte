<script lang="ts">
    import { currentList, todos } from "./stores";

    export let showCreateListModal: boolean;
    export let unclosable: boolean;
    let listName: string;
    let dialog: HTMLDialogElement;

    $: if (dialog && showCreateListModal) dialog.showModal();

    function createList() {
        if (!listName || !listName.length) {
            return;
        }
        listName = listName.trim();
        if (!$todos.has(listName)) {
            $todos.set(listName, []);
            $todos = $todos;
            $currentList = listName;
        }
        listName = "";
        dialog.close();
    }
</script>

<dialog
    class="border-4 border-black rounded-xl"
    bind:this={dialog}
    on:close={() => (showCreateListModal = false)}
    on:click|self={() => dialog.close()}
    on:keypress|self={() => null}
>
    <form
        on:submit|preventDefault={() => {
            createList();
        }}
        on:click|stopPropagation
        on:keypress|self={() => null}
    >
        <p class="text-center text-black bold text-3xl mb-5">
            Enter list name:
        </p>
        <input
            bind:value={listName}
            name="new"
            class="my-2 block w-full border-4 border-slate-600 rounded-md text-md h-12 bg-slate-100 p-2"
            type="text"
        />
        <div class="flex justify-center gap-2">
            <button
                type="submit"
                class="border-2 rounded-md border-green-500 bg-green-400 text-white bold p-2 hover:bg-green-300"
                >CREATE</button
            >
            {#if !unclosable}
                <button
                    type="reset"
                    class="border-2 rounded-md border-blue-500 bg-blue-400 text-white bold p-2 hover:bg-blue-300"
                    on:click={() => dialog.close()}
                    on:keypress={() => null}>CANCEL</button
                >
            {/if}
        </div>
    </form>
</dialog>
