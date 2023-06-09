<script lang="ts">
	import '../../../../../app.css';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { Input, Label, Button, Textarea, Heading, Helper } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	// Client API:
	const { form, errors, enhance } = superForm(data.form);
</script>

<Heading customSize="text-lg font-extrabold  md:text-xl lg:text-2xl text-center">Add Borrow</Heading
>
<br />
<div class="w-1/2 m-auto">
	<form method="post" use:enhance>
		<input type="hidden" name="id" bind:value={$form.id} />
		<div>
			<Label for="borrowerName" class="mb-2">Borrower Name</Label>
			<Input
				class="mb-2"
				type="text"
				name="borrowerName"
				bind:value={$form.borrowerName}
			/>
			{#if $errors.borrowerName}
				<Helper class="text-red-500">{$errors.borrowerName}</Helper>
			{/if}
		</div>
		<div class="grid gap-6 mb-2 md:grid-cols-2">
			<div class="relative max-w-sm mb-2">
				<Label for="date" class="mb-2">Borrow Date</Label>
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<input
					bind:value={$form.borrowDate}
					name="borrowDate"
					type="date"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Select date"
				/>
				{#if $errors.borrowDate}
					<Helper class="text-red-500">{$errors.borrowDate}</Helper>
				{/if}
			</div>
			<div>
				<Label for="borrowerPhone" class="mb-2">Borrower Phone</Label>
				<Input
					class="mb-2"
					type="text"
					name="borrowerPhone"
					bind:value={$form.borrowerPhone}
				/>
				{#if $errors.borrowerPhone}
					<Helper class="text-red-500">{$errors.borrowerPhone}</Helper>
				{/if}
			</div>
			<div>
				<Label for="borrowerEmail" class="mb-2">Borrower Email*</Label>
				<Input
					class="mb-2"
					type="text"
					name="borrowerEmail"
					bind:value={$form.borrowerEmail}
				/>
				{#if $errors.borrowerEmail}
					<Helper class="text-red-500">{$errors.borrowerEmail}</Helper>
				{:else}
					<Helper class="text-gray-500">*optional</Helper>
				{/if}
			</div>


			<div>
				<Label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Item Borrowed</Label
				>
				<select
					bind:value={$form.itemId}
					name="itemId"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				>
					<option selected>Select borrowed Item</option>
					{#each data.items as item}
						<option value={item.id}>{item.name}</option>
					{/each}
				</select>
				{#if $errors.itemId}
					<Helper class="text-red-500">{$errors.itemId}</Helper>
				{/if}
			</div>

			<div>
				<Label for="amount" class="mb-2">Amount</Label>
				<Input type="number" name="amount" bind:value={$form.amount} />
				{#if $errors.amount}
					<Helper class="text-red-500">{$errors.amount}</Helper>
				{/if}
			</div>
			
		</div>
		<Button class="mt-6 grid gap-6 m-auto" type="submit">Submit</Button>
	</form>
</div>
