<script lang="ts">
	import '../../../app.css';
	import type { PageData } from './$types';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
        Button
	} from 'flowbite-svelte';

	export let data: PageData;
</script>

<div class="m-6">

    <a href="/app/categories/add">
		<Button class="my-6">
			<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
			>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
		
        Add Category
    </Button>
</a>

	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Description</TableHeadCell>
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each data.categories as category}
			<TableBodyRow>
				<TableBodyCell>{category.name}</TableBodyCell>
				<TableBodyCell>{category.description}</TableBodyCell>
				<TableBodyCell>
                    <form method="post">
                        <Button type="submit" size="xs" outline color="red" name="id" value={category.id}>Delete</Button>
                    </form>
				</TableBodyCell>
			</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	
</div>