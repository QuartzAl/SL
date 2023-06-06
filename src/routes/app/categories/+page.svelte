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
		Helper
	} from 'flowbite-svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {taintedMessage: null});
</script>

<div class="m-6">
	<a href="/app/categories/add">
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
			Add Category
		</Button>
	</a>
	{#if $errors.id}
	<Alert color="red" dismissable>
		<span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
		</span>
		{$errors.id}
	</Alert>
	{/if}

	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Description</TableHeadCell>
			<TableHeadCell>Action</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each data.categories as category}
				<TableBodyRow>
					<TableBodyCell>{category.name}</TableBodyCell>
					<TableBodyCell>{category.description}</TableBodyCell>
					<TableBodyCell>
						<form method="post" use:enhance>
							<Button
								type="submit"
								size="xs"
								outline
								color="red"
								name="id"
								value={category.id}
								on:click={($form.id = category.id)}>Delete</Button
							>
						</form>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
