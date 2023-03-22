<script lang="ts">
    import { sorter, todos, type Entry } from "./stores";
    export let todo: Entry;

    function clickHandler() {
        todo.marked = !todo.marked;
        $todos.sort(sorter);
        $todos = $todos;
    }
</script>

<div
    on:click={() => clickHandler()}
    on:keypress={() => null}
    class="{'mt-4 p-2 text-xl border-2 rounded-md bg-white hover:bg-gray-100'} {todo.marked
        ? 'bg-gray-200 text-gray-500 border-gray-500 italic line-through'
        : 'text-black border-blue-500'}"
>
    <p>{todo.text}</p>
</div>

<style>
</style>
