<script lang="ts">
    import { currentList, todos } from "./stores";

    export let showCreateListModal: boolean;
    let listName: string;
    let dialog: HTMLDialogElement;

    $: if (dialog && showCreateListModal) dialog.showModal();

    function createList() {
        if(!listName.trim().length) {
            return
        }
        $todos.set(listName, [])
        $todos = $todos
        $currentList = listName
        listName = ""
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
        on:submit|preventDefault={() => console.log(listName)}
        on:keypress|self={() => null}
    >
        <p class="text-center text-black bold text-3xl mb-5">Enter name:</p>
        <input
            bind:value={listName}
            name="new"
            class="my-2 block w-full border-4 border-slate-600 rounded-md text-xl h-12 bg-slate-100 p-2"
            type="text"
        />
        <div class="flex justify-center gap-2">
            <button
                type="submit"
                class="border-2 rounded-md border-green-500 bg-green-400 text-white bold p-2 hover:bg-green-300"
                on:click={() => {
                    createList()
                    dialog.close();
                }}
                on:keypress={() => null}>CREATE</button
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
