<script lang="ts">
	import '../../../../app.css';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Input, Label, Textarea, Button, Helper, Heading } from 'flowbite-svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
</script>

<Heading customSize="text-lg font-extrabold  md:text-xl lg:text-2xl text-center"
	>Add Category</Heading
>
<br />
<form method="post" use:enhance>
	<div class="w-1/2 m-auto space-y-3">
		<Label class="space-y-2 ">
			<span>Name</span>
			<Input
				name="name"
				type="text"
				placeholder="name"
				bind:value={$form.name}
				data-invalid={$errors.name}
			/>
			{#if $errors.name}
				<Helper class="text-red-500 mb-6">{$errors.name}</Helper>
			{/if}
		</Label>

		<Label for="description" class="mb-2">Description</Label>
		<Textarea id="description" rows="4" name="description" bind:value={$form.description} />
		{#if $errors.description}
			<Helper class="text-red-500 mb-6">{$errors.description}</Helper>
		{/if}

		<br />

		<Button type="submit">Submit</Button>
	</div>
</form>
