<script lang="ts">
	import '../../../app.css';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Alert,
		Helper,
		ButtonGroup
	} from 'flowbite-svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {taintedMessage: null});
</script>

<div class="m-6">

	<Button class="my-6" href="/app/categories/add">
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
		Tambah Kategori
	</Button>
	{#if $errors.id}
	<Alert color="red" dismissable>
		<span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
		</span>
		{$errors.id}
	</Alert>
	{/if}

	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell>Nama</TableHeadCell>
			<TableHeadCell>Deskripsi</TableHeadCell>
			<TableHeadCell class="text-center">Tindakan</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each data.categories as category}
				<TableBodyRow>
					<TableBodyCell>{category.name}</TableBodyCell>
					<TableBodyCell>
						{#if category.description != ""}
							{category.description}
						{:else}
							<Helper color="disabled">Tidak ada deskripsi</Helper>
						{/if}
					</TableBodyCell>
					<TableBodyCell class="text-center">
						<ButtonGroup>
						<form method="post" use:enhance>
								<Button size="xs" outline color="blue" href="/app/categories/add/{category.id}">Ubah</Button
									><Button
									type="submit"
									size="xs"
									outline
									color="red"
									name="id"
									value={category.id}
									on:click={($form.id = category.id)}>Hapus</Button
								>
						
						</form>
					</ButtonGroup>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
