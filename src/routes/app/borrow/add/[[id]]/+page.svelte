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

<Heading customSize="text-lg font-extrabold  md:text-xl lg:text-2xl text-center"
	>Tambah Peminjaman</Heading
>
<br />

<div class="w-1/2 m-auto">
	<form method="post" use:enhance>
		<input type="hidden" name="id" bind:value={$form.id} />
		<div>
			<Label for="borrowerName" class="mb-2">Nama Peminjam</Label>
			<Input class="mb-2" type="text" name="borrowerName" bind:value={$form.borrowerName} />
			{#if $errors.borrowerName}
				<Helper class="text-red-500">{$errors.borrowerName}</Helper>
			{/if}
		</div>
		<div class="grid gap-6 mb-2 md:grid-cols-2">
			<div class="relative max-w-sm mb-2">
				<Label for="date" class="mb-2">Tanggal Peminjaman</Label>
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" />
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
				<Label for="borrowerPhone" class="mb-2">Nomor Telepon Peminjam</Label>
				<Input class="mb-2" type="text" name="borrowerPhone" bind:value={$form.borrowerPhone} />
				{#if $errors.borrowerPhone}
					<Helper class="text-red-500">{$errors.borrowerPhone}</Helper>
				{/if}
			</div>

			<div>
				<Label for="amount" class="mb-2">Jumlah</Label>
				<Input type="number" name="amount" bind:value={$form.amount} />
				{#if $errors.amount}
					<Helper class="text-red-500">{$errors.amount}</Helper>
				{/if}
			</div>
			<div>
				<Label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Barang</Label
				>
				<select
					bind:value={$form.itemId}
					name="itemId"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				>
					{#each data.items as item}
						<option value={item.id}>{item.name}</option>
					{/each}
				</select>
				{#if $errors.itemId}
					<Helper class="text-red-500">{$errors.itemId}</Helper>
				{/if}
			</div>
		</div>
		<div>
			<Label for="borrowerEmail" class="mb-2">Email Peminjam*</Label>
			<Input class="mb-2" type="text" name="borrowerEmail" bind:value={$form.borrowerEmail} />
			{#if $errors.borrowerEmail}
				<Helper class="text-red-500">{$errors.borrowerEmail}</Helper>
			{:else}
				<Helper class="text-gray-500">*opsional</Helper>
			{/if}
		</div>
		<Button class="mt-6 grid gap-6 m-auto" type="submit">Submit</Button>
	</form>
</div>
