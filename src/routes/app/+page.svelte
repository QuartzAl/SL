<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Button,
		Pagination
	} from 'flowbite-svelte';
	import '../../app.css';
	export let data: PageData;

	let searchTerm = '';
	let filteredItems: item[] = data.items;
	$: if (searchTerm !== '') {
		filteredItems = data.items.filter((item: item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	} else {
		filteredItems = data.items;
	}
	type ObjectKey = keyof item;

	let sortKey = 'entryDate' as ObjectKey;
	let sortDirection = 1;
	let sortItems: item[] = [];
	$: {
		sortItems = [...filteredItems];
		console.log(filteredItems);
	}

	interface item {
		id: number;
		name: string;
		description: string;
		amount: Number;
		category: {
			name: string;
		};
		condition: {
			name: string;
		};
		entryDate: Date;
	}

	// Define a function to sort the items
	const sortTable = (key: string) => {
		// If the same key is clicked, reverse the sort direction
		if (sortKey === key) {
			sortDirection = sortDirection * -1;
		} else {
			sortKey = key as ObjectKey;
			sortDirection = 1;
		}
	};

	$: if (sortKey !== null) {
		console.log(sortKey);
		if (sortKey == 'category') {
			sortItems = filteredItems.sort((a: item, b: item) => {
				if (a.category.name < b.category.name) {
					return -sortDirection;
				}
				if (a.category.name > b.category.name) {
					return sortDirection;
				}
				return 0;
			});
		} else if (sortKey == 'condition') {
			sortItems = filteredItems.sort((a: item, b: item) => {
				if (a.condition.name < b.condition.name) {
					return -sortDirection;
				}
				if (a.condition.name > b.condition.name) {
					return sortDirection;
				}
				return 0;
			});
		} else {
			sortItems = filteredItems.sort((a: item, b: item) => {
				if (a[sortKey] < b[sortKey]) {
					return -sortDirection;
				}
				if (a[sortKey] > b[sortKey]) {
					return sortDirection;
				}
				return 0;
			});
		}
	} else {
		sortItems = filteredItems;
	}
</script>

<a href="/app/add">
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

		Add Item
	</Button>
</a>
<TableSearch
	class=""
	placeholder="Search by item name"
	hoverable={true}
	bind:inputValue={searchTerm}
>
	<TableHead>
		<TableHeadCell on:click={() => sortTable('entryDate')}>Entry Date</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('name')}>Name</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('amount')}>Amount</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('category')}>Category</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('condition')}>Condition</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('description')}>Description</TableHeadCell>

		<TableHeadCell class="text-center">Action</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each sortItems as item}
			<TableBodyRow>
				<TableBodyCell>{item.entryDate.toDateString()}</TableBodyCell>
				<TableBodyCell>{item.name}</TableBodyCell>
				<TableBodyCell>{item.amount}</TableBodyCell>
				<TableBodyCell>{item.category.name}</TableBodyCell>
				<TableBodyCell>{item.condition.name}</TableBodyCell>
				<TableBodyCell class="break-words">{item.description}</TableBodyCell>
				<TableBodyCell class="text-center">
					<a href="/app/add/{item.id}" class="">
						<Button type="submit" size="xs" outline color="blue" name="id" value={item.id}
							>Edit</Button
						>
					</a>
					<form method="post" action="?/delete" use:enhance>
						<Button type="submit" size="xs" outline color="red" name="id" value={item.id}
							>Delete</Button
						>
					</form>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
		<TableBodyRow>
			<TableBodyCell>hello \n</TableBodyCell>
			<TableBodyCell />
			<TableBodyCell>t}</TableBodyCell>
			<TableBodyCell>ory.name}</TableBodyCell>
			<TableBodyCell>tion.name}</TableBodyCell>
			<TableBodyCell class="max-w-xs whitespace-normal">description}</TableBodyCell>
			<TableBodyCell class="text-center">
				<a href="/app/add/id}" class="">
					<Button type="submit" size="xs" outline color="blue" name="id" value="id}">Edit</Button>
				</a>
				<form method="post" action="?/delete" use:enhance>
					<Button type="submit" size="xs" outline color="red" name="id" value="id}">Delete</Button>
				</form>
			</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</TableSearch>
