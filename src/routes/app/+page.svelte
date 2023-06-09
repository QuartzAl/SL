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
		Pagination,
		ButtonGroup
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
		amount: number;
		category: {
			name: string;
		};
		condition: {
			name: string;
		};
		entryDate: Date;
	}
	//  interface for  { _sum: { amount: 2 }, itemId: 1 },
	interface itemSum {
		_sum: {
			amount: number;
		};
		itemId: number;
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

	function getBorrowed(id: Number){
		let amountBorrowed = 0;
		data.items.forEach((item: item) => {
			if(item.id == id){
				let temp = data.borrowedItems.filter((Itemsum: itemSum) => Itemsum.itemId == item.id);
				if (temp.length > 0){
					amountBorrowed = temp[0]._sum.amount;
				}
			}
		});
		return amountBorrowed;
		
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
	class="table-fixed"
	placeholder="Search by item name"
	hoverable={true}
	bind:inputValue={searchTerm}
>
	<TableHead>
		<TableHeadCell class="hidden md:table-cell cursor-pointer" on:click={() => sortTable('entryDate')}>Entry Date</TableHeadCell>
		<TableHeadCell padding="px-3 py-3 " class="text-center cursor-pointer" on:click={() => sortTable('name')}>Name</TableHeadCell>
		<TableHeadCell padding="py-3" class="text-center cursor-pointer" on:click={() => sortTable('amount')}>Amount Total</TableHeadCell>
		<TableHeadCell padding="py-3" class="text-center cursor-pointer" on:click={() => sortTable('amount')}>Amount Available</TableHeadCell>
		<TableHeadCell class="text-center cursor-pointer" on:click={() => sortTable('category')}>Category</TableHeadCell>
		<TableHeadCell class="hidden md:table-cell cursor-pointer" on:click={() => sortTable('condition')}>Condition</TableHeadCell>
		<TableHeadCell class="hidden md:table-cell cursor-pointer" on:click={() => sortTable('description')}>Description</TableHeadCell>

		<TableHeadCell class="text-center">Action</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each sortItems as item}
			<TableBodyRow>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium ">{item.entryDate.toDateString()}</TableBodyCell>
				<TableBodyCell tdClass="px-3 py-4 font-medium text-center">{item.name}</TableBodyCell>
				<TableBodyCell tdClass="py-4" class="text-center px-3">{item.amount}</TableBodyCell>
				<TableBodyCell tdClass="py-4" class="text-center px-3">{item.amount - getBorrowed(item.id)}</TableBodyCell>
				<TableBodyCell tdClass="px-6 py-4 font-medium ">{item.category.name}</TableBodyCell>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium ">{item.condition.name}</TableBodyCell>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium ">{item.description}</TableBodyCell>
				<TableBodyCell class="text-center">
					<ButtonGroup>
						<a href="/app/add/{item.id}" class="">
							<Button type="submit" class="mr-4" size="xs" outline color="blue" name="id" value={item.id}
								>Edit</Button
							>
						</a>
						<form method="post" action="?/delete" use:enhance>
							<Button type="submit" size="xs" outline color="red" name="id" value={item.id}
								>Delete</Button
							>
						</form>
					</ButtonGroup>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
