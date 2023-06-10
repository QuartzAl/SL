<script lang="ts">
	import '../../../../app.css';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { Input, Label, Button, Textarea, Heading, Helper } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	// Client API:
	const { form, errors, enhance } = superForm(data.form);
</script>

<Heading customSize="text-lg font-extrabold  md:text-xl lg:text-2xl text-center">Tambah Barang</Heading>
<br />

<div class="w-1/2 m-auto">
	<form method="post" use:enhance>
		<input type="hidden" name="id" bind:value={$form.id} />
		<div>
			<Label for="name" class="mb-2">Nama Barang</Label>
			<Input class="mb-2" type="text" name="name" bind:value={$form.name} />
			{#if $errors.name}
				<Helper color="red">{$errors.name}</Helper>
			{/if}
		</div>
		<div class="grid gap-6 mb-2 md:grid-cols-2">
			<div class="relative max-w-sm mb-2">
				<Label for="date" class="mb-2">Tanggal Masuk</Label>
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
					bind:value={$form.entryDate}
					name="entryDate"
					type="date"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Select date"
				/>
				{#if $errors.entryDate}
					<Helper color="red">{$errors.entryDate}</Helper>
				{/if}
			</div>

			<div>
				<Label for="amount" class="mb-2">Jumlah</Label>
				<Input type="number" name="amount" bind:value={$form.amount} />
				{#if $errors.amount}
					<Helper color="red">{$errors.amount}</Helper>
				{/if}
			</div>
			<div>
				<Label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Kategori</Label
				>
				<select
					bind:value={$form.categoryid}
					name="categoryid"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				>
					{#each data.categories as category}
						<option value={category.id}>{category.name}</option>
					{/each}
				</select>
				{#if $errors.categoryid}
					<Helper color="red">{$errors.categoryid}</Helper>
				{/if}
			</div>
			<div>
				<Label for="condition" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Kondisi</Label
				>
				<select
					bind:value={$form.conditionid}
					name="conditionid"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				>
					{#each data.conditions as condition}
						<option value={condition.id}>{condition.name}</option>
					{/each}
				</select>
				{#if $errors.conditionid}
					<Helper color="red">{$errors.conditionid}</Helper>
				{/if}
			</div>
		</div>
		<div>
			<Label for="description" class="mb-2">Deskripsi</Label>
			<Textarea id="description" rows="4" name="description" bind:value={$form.description} />
			{#if $errors.description}
				<Helper color="red">{$errors.description}</Helper>
			{/if}
		</div>
		<Button class="mt-6 grid gap-6 m-auto " type="submit">Kirim</Button>
	</form>
</div>
