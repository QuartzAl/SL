<script lang="ts">
	import type { PageData } from './$types';
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

	let searchTerm = '';
	

	let helper = {start: 1, end: 10, total: 100}

  const previous = () => {
    alert('Previous btn clicked. Make a call to your server to fetch data.');
  };
  const next = () => {
    alert('Next btn clicked. Make a call to your server to fetch data.');
  };

	export let data: PageData;
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
<TableSearch placeholder="Search by item name" hoverable={true} bind:inputValue={searchTerm}>
	<TableHead>
		<TableHeadCell>Entry Date</TableHeadCell>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Amount</TableHeadCell>
		<TableHeadCell>Category</TableHeadCell>
		<TableHeadCell>Condition</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>

		<TableHeadCell class="text-center">Action</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each data.items as item}
			<TableBodyRow>
				<TableBodyCell>{item.entryDate.toDateString()}</TableBodyCell>
				<TableBodyCell>{item.name}</TableBodyCell>
				<TableBodyCell>{item.amount}</TableBodyCell>
				<TableBodyCell>{item.category.name}</TableBodyCell>
				<TableBodyCell>{item.condition.name}</TableBodyCell>
				<TableBodyCell>{item.description}</TableBodyCell>
				<TableBodyCell class="text-center">
					<a
						href="/add/{item.id}"
						class="mx-2 font-medium hover:underline"
					>
						<Button type="submit" size="xs" outline color="blue" name="id" value={item.id}>Edit</Button>
					</a>
					<form method="post">
                        <Button type="submit" size="xs" outline color="red" name="id" value={item.id}>Delete</Button>
                    </form>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
<div class="flex flex-col items-center justify-center">
	<div class="text-sm text-gray-700 dark:text-gray-400">
		Showing <span class="font-semibold text-gray-900 dark:text-white">{helper.start}</span> to
		<span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span>
		of <span class="font-semibold text-gray-900 dark:text-white">{helper.total}</span> Entries
	</div>

	<Pagination table>
		<div slot="prev" class="flex items-center gap-2">
			<svg
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/></svg
			>
			Prev
		</div>
		<div slot="next" class="flex items-center gap-2">
			Next
			<svg
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			>
		</div>
	</Pagination>
</div>
