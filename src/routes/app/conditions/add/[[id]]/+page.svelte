<script lang="ts">
	import '../../../../../app.css';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Input, Label, Textarea, Button, Helper, Heading } from 'flowbite-svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
	errors.clear();
</script>

<Heading customSize="text-lg font-extrabold  md:text-xl lg:text-2xl text-center"
	>Tambah Kondisi Barang</Heading
>
<form method="post" use:enhance>
	<input type="hidden" name="id" bind:value={$form.id} />
	<div class="w-1/2 m-auto space-y-3">
		<Label class="space-y-2">
			<span>Nama</span>
			<Input
				name="name"
				type="text"
				placeholder="rusak, baik, dll"
				bind:value={$form.name}
				data-invalid={$errors.name}
			/>
			{#if $errors.name}
				<Helper class="text-red-500">{$errors.name}</Helper>
			{/if}
		</Label>

		<Label for="description" class="mb-2">Deskripsi</Label>
		<Textarea id="description" placeholder="barang rusak harus dibuang / barang masih dapat diperbaiki / barang masih dapat digunakan" rows="4" name="description" bind:value={$form.description} />
		{#if $errors.description}
			<Helper class="text-red-500">{$errors.description}</Helper>
		{/if}

		<Button type="submit">Kirim</Button>
	</div>
</form>
