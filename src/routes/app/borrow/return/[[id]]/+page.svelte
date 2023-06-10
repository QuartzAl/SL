<script lang="ts">
	import '../../../../../app.css';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { Input, Label, Button, Textarea, Heading, Helper } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	// Client API:
	const { form, errors, enhance } = superForm(data.form);
	// get day + 1 day and store in variable
	const today = new Date();
	today.setDate(today.getDate() + 1);
</script>

<Heading customSize="text-lg font-extrabold  md:text-xl lg:text-2xl text-center"
	>Pengembalian Barang</Heading
>
<br />
<div class="w-1/4 m-auto">
	<form method="post" use:enhance>
		<input type="hidden" name="id" bind:value={$form.id} />
		<div class="relative max-w-sm mb-2">
			<Label for="date" class="mb-2">Tanggal Barang Kembali</Label>
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" />
			<input
				bind:value={$form.returnDate}
				name="returnDate"
				type="date"
				max={today.toISOString().split('T')[0]}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Select date"
			/>
			{#if $errors.returnDate}
				<Helper class="text-red-500">{$errors.returnDate}</Helper>
			{/if}
		</div>

		<Button class="mt-6 grid gap-6 m-auto" type="submit">Kirim</Button>
	</form>
</div>
