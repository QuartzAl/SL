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
		filteredBorrows = data.borrows.filter(
			(borrow: borrow) =>
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
		if (toggleReturned) {
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

		Tambah Peminjaman
	</Button>
</a>
<Toggle on:change={toggleReturn}>Tampilkan Barang yang telah dikembalikan</Toggle>
<TableSearch
	class="table-auto"
	placeholder="Cari berdasarkan peminjam atau barang"
	hoverable={true}
	bind:inputValue={searchTerm}
>
	<TableHead>
		<TableHeadCell
			class="hidden md:table-cell cursor-pointer"
			on:click={() => sortTable('borrowDate')}>Tanggal Pinjam</TableHeadCell
		>
		<TableHeadCell
			padding="px-3 py-3 "
			class="text-center cursor-pointer"
			on:click={() => sortTable('borrowerName')}>Peminjam</TableHeadCell
		>
		<TableHeadCell
			padding="py-3"
			class="text-center cursor-pointer"
			on:click={() => sortTable('item')}>Nama Barang</TableHeadCell
		>
		<TableHeadCell
			padding="py-3"
			class="text-center cursor-pointer w-auto"
			on:click={() => sortTable('amount')}>Jumlah</TableHeadCell
		>
		<TableHeadCell
			class="hidden md:table-cell cursor-pointer"
			on:click={() => sortTable('borrowerPhone')}>Nomor Telepon</TableHeadCell
		>
		<TableHeadCell
			class="hidden md:table-cell cursor-pointer"
			on:click={() => sortTable('borrowerEmail')}>Email</TableHeadCell
		>
		{#if toggleReturned}
			<TableHeadCell
				class="hidden md:table-cell cursor-pointer text-center"
				on:click={() => sortTable('returnDate')}>Tanggal Kembali</TableHeadCell
			>
		{/if}
		<TableHeadCell class="text-center">Tindakan</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each returnedBorrows as borrow}
			<TableBodyRow>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium "
					>{borrow.borrowDate.toDateString()}</TableBodyCell
				>
				<TableBodyCell tdClass="px-3 py-4 font-medium text-center"
					>{borrow.borrowerName}</TableBodyCell
				>
				<TableBodyCell tdClass="py-4" class="text-center px-3">{borrow.item.name}</TableBodyCell>
				<TableBodyCell tdClass="py-4 font-medium text-center w-auto">{borrow.amount}</TableBodyCell>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium "
					>{borrow.borrowerPhone}</TableBodyCell
				>
				<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium ">
					{#if borrow.borrowerEmail == null}
						-
					{:else}
						{borrow.borrowerEmail}
					{/if}
				</TableBodyCell>
				{#if toggleReturned}
					<TableBodyCell tdClass="hidden md:table-cell px-6 py-4 font-medium text-center">
						{#if borrow.returnDate == null}
							-
						{:else}
							{borrow.returnDate.toDateString()}
						{/if}
					</TableBodyCell>
				{/if}

				<TableBodyCell
					class="text-center flex justify-center"
					tdClass="py-4 font-medium text-center"
				>
					<form method="post" action="?/delete" use:enhance>
						<ButtonGroup>
							{#if borrow.returnDate == null}
								<Button class="mt-4" size="xs" outline color="blue" name="id" value={borrow.id}>
									<a href="/app/borrow/add/{borrow.id}" class=""> Ubah </a>
								</Button>

								<Button class="mt-4" size="xs" outline color="blue" name="id" value={borrow.id}>
									<a href="/app/borrow/return/{borrow.id}" class=""> Kembalikan </a>
								</Button>
							{/if}
							<Button
								type="submit"
								class="mt-4"
								size="xs"
								outline
								color="red"
								name="id"
								value={borrow.id}>Hapus</Button
							>
						</ButtonGroup>
					</form>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
