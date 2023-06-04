<script lang="ts">
	import '../../../../app.css';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Input, Label, Textarea, Button, Helper } from 'flowbite-svelte';
    import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<form method="post" use:enhance>

    <Label class="space-y-2">
        <span>Name</span>
        <Input name="name" type="text" placeholder="name" size="sm" bind:value={$form.name} data-invalid={$errors.name} />
        {#if $errors.name}
            <Helper class="text-red-500">{$errors.name}</Helper>
        {/if}
    </Label>

    <Label for="description" class="mb-2">Description</Label>
    <Textarea id="description" rows="4" name="description" bind:value={$form.description}/>
    {#if $errors.description}
            <Helper class="text-red-500">{$errors.description}</Helper>
        {/if}

    <Button type="submit">Submit</Button>
</form>