<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	import '../app.css';

	let searchTerm = '';
	let items = [
		{ id: 1, maker: 'Toyota', type: 'ABC', make: 2017 },
		{ id: 2, maker: 'Ford', type: 'CDE', make: 2018 },
		{ id: 3, maker: 'Volvo', type: 'FGH', make: 2019 },
		{ id: 4, maker: 'Saab', type: 'IJK', make: 2020 }
	];
	const sortKey = writable('id'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	const sortItems = writable(items.slice()); // make a copy of the items array

	// Define a function to sort the items
	const sortTable = (key: string) => {
		// If the same key is clicked, reverse the sort direction
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...$sortItems].sort((a, b) => {
			const aVal = a[key];
			const bVal = b[key];
			if (aVal < bVal) {
				return -direction;
			} else if (aVal > bVal) {
				return direction;
			}
			return 0;
		});
		sortItems.set(sorted);
	}

	export let data: PageData;
</script>

<div class="m-6">
	<TableSearch placeholder="Search by maker name" hoverable={true} bind:inputValue={searchTerm}>
		<TableHead>
			<TableHeadCell on:click={() => sortTable('maker')}>Name</TableHeadCell>
			<TableHeadCell on:click={() => sortTable('type')}>Amount</TableHeadCell>
			<TableHeadCell on:click={() => sortTable('make')}>Description</TableHeadCell>
			<TableHeadCell>Action</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each data.items as item}
				<TableBodyRow>
					<TableBodyCell>{item.item_name}</TableBodyCell>
					<TableBodyCell>{item.amount}</TableBodyCell>
					<TableBodyCell>{item.description}</TableBodyCell>
					<TableBodyCell>
                        <a href="/tables" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
							Edit
						</a>
						<a href="/tables" class="font-medium text-red-600 hover:underline dark:text-red-500">
							Remove
						</a>
                    </TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
