<script lang="ts">
    import { currentList, todos } from "./stores";

    export let showEditListModal: boolean;
    let dialog: HTMLDialogElement;
    let input: HTMLInputElement;

    $: if (dialog && !dialog.open && showEditListModal) {
        input.value = $currentList;
        dialog.showModal();
    } else {
        if (dialog) dialog.close();
    }

    function editList() {
        let listName = input.value;
        if (!listName || !listName.length) {
            return;
        }
        listName = listName.trim();
        if (!$todos.has(listName)) {
            $todos.set(listName, $todos.get($currentList));
            $todos.delete($currentList);
            $todos = $todos;
            $currentList = listName;
        }
    }
</script>

<dialog
    class="border-4 border-black rounded-xl"
    bind:this={dialog}
    on:close={() => (showEditListModal = false)}
    on:click|self={() => dialog.close()}
    on:keypress|self={() => null}
>
    <form
        on:submit|preventDefault={() => {
            editList();
            dialog.close();
        }}
        on:click|stopPropagation
        on:keypress|self={() => null}
    >
        <p class="text-center text-black bold text-3xl mb-5">Edit list name:</p>
        <input
            bind:this={input}
            name="new"
            class="my-2 block w-full border-4 border-slate-600 rounded-md text-md h-12 bg-slate-100 p-2"
            type="text"
        />
        <div class="flex justify-center gap-2">
            <button
                type="submit"
                class="border-2 rounded-md border-green-500 bg-green-400 text-white bold p-2 hover:bg-green-300"
                >SAVE</button
            >
            <button
                type="reset"
                class="border-2 rounded-md border-blue-500 bg-blue-400 text-white bold p-2 hover:bg-blue-300"
                on:click={() => dialog.close()}
                on:keypress={() => null}>CANCEL</button
            >
        </div>
    </form>
</dialog>
