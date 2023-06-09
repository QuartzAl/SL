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
		Toggle,
		ButtonGroup
	} from 'flowbite-svelte';
	import '../../../app.css';
	import { writable } from 'svelte/store';
	export let data: PageData;

	interface borrow {
		id: Number;
		borrowerName: String;
		borrowerPhone: String;
		borrowerEmail: String;
		borrowDate: Date;
		returnDate: Date;
		item: {
			name: String;
		};
		amount: Number;
	}

	// do searching stuffs
	let searchTerm = '';
	let filteredBorrows: borrow[] = data.borrows;
	$: if (searchTerm !== '') {
		filteredBorrows = data.borrows.filter((borrow: borrow) =>
			borrow.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			borrow.item.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	} else {
		filteredBorrows = data.borrows;
	}
	type ObjectKey = keyof borrow;

	// Define the sort key and direction
	let sortKey = 'entryDate' as ObjectKey;
	let sortDirection = 1;
	let sortItems: borrow[] = [];
	$: {
		sortItems = [...filteredBorrows];
		console.log(filteredBorrows);
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

	// Sort the items
	$: if (sortKey !== null) {
		if (sortKey == 'item') {
			sortItems = filteredBorrows.sort((a: borrow, b: borrow) => {
				if (a.item.name < b.item.name) {
					return -sortDirection;
				}
				if (a.item.name > b.item.name) {
					return sortDirection;
				}
				return 0;
			});
		} else {
			sortItems = filteredBorrows.sort((a: borrow, b: borrow) => {
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
		sortItems = filteredBorrows;
	}

	let toggleReturned = false;
	let returnedBorrows: borrow[] = [];

	const toggleReturn = () => {
		toggleReturned = !toggleReturned;
	};

	$: {
		console.log(toggleReturned);
		if (toggleReturned ) {
			returnedBorrows = sortItems;
		} else {
			returnedBorrows = sortItems.filter((borrow: borrow) => borrow.returnDate == null);
		}
	}

</script>

<a href="/app/borrow/add">
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

		Borrow
	</Button>
</a>
<Toggle on:change={toggleReturn} >Display Returned Items</Toggle>
<TableSearch
	class="table-fixed"
	placeholder="Search by item name"
	hoverable={true}
	bind:inputValue={searchTerm}
>
	<TableHead>
		<TableHeadCell class="hidden md:table-cell cursor-pointer" on:click={() => sortTable('borrowDate')}>Borrow Date</TableHeadCell>
		<TableHeadCell padding="px-3 py-3 " class="text-center cursor-pointer" on:click={() => sortTable('borrowerName')}>Name</TableHeadCell>
		<TableHeadCell padding="py-3" class="text-center cursor-pointer" on:click={() => sortTable('item')}>Item Name</TableHeadCell>
		<TableHeadCell class="text-center cursor-pointer" on:click={() => sortTable('amount')}>Amount</TableHeadCell>
		<TableHeadCell class="hidden md:table-cell cursor-pointer" on:click={() => sortTable('borrowPhone')}>Phone Number</TableHeadCell>
		<TableHeadCell class="hidden md:table-cell cursor-pointer" on:click={() => sortTable('borrowPhone')}>Email</TableHeadCell>
		<TableHeadCell class="hidden md:table-cell cursor-pointer" on:click={() => sortTable('returnDate')}>Return Date</TableHeadCell>

		<TableHeadCell class="text-center">Action</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each returnedBorrows as borrow}
			<TableBodyRow>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium ">{borrow.borrowDate.toDateString()}</TableBodyCell>
				<TableBodyCell tdClass="px-3 py-4 font-medium text-center">{borrow.borrowerName}</TableBodyCell>
				<TableBodyCell tdClass="py-4" class="text-center px-3">{borrow.item.name}</TableBodyCell>
				<TableBodyCell tdClass="px-6 py-4 font-medium text-center">{borrow.amount}</TableBodyCell>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium ">{borrow.borrowerPhone}</TableBodyCell>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium ">
					{#if borrow.borrowerEmail == null}
						-
					{:else}
					{borrow.borrowerEmail}
					{/if}
				</TableBodyCell>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium ">
					{#if borrow.returnDate == null}
						-
					{:else}
					{borrow.returnDate.toDateString()}
					{/if}
				</TableBodyCell>
				
				<TableBodyCell class="text-center">
					<ButtonGroup>
						{#if borrow.returnDate == null}
						<a href="/app/borrow/add/{borrow.id}" class="">
							<Button type="submit" class="mr-4" size="xs" outline color="blue" name="id" value={borrow.id}
								>Edit</Button
							>
						</a>
						
						<a href="/app/borrow/return/{borrow.id}" class="">
							<Button type="submit" class="mr-4" size="xs" outline color="blue" name="id" value={borrow.id}
								>Return</Button
							>
						</a>
						{/if}
						<form method="post" action="?/delete" use:enhance>
							<Button type="submit" size="xs" outline color="red" name="id" value={borrow.id}
								>Delete</Button
							>
						</form>
					</ButtonGroup>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
