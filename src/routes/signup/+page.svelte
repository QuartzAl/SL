<script lang="ts">
	import '../../app.css';
	import { Label, Input, Helper, Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	let { form, errors, enhance } = superForm(data.form);
</script>

<div class="m-auto w-1/3 shadow-lg p-6 rounded-md mt-20">
	<form method="post" use:enhance>
		<p class="text-3xl text-center text-blue-500 font-sans"><b>DAFTAR</b></p>
		<div class="mb-6">
			<Label for="username" class="block mb-2">Username</Label>
			<Input
				class="block"
				name="username"
				id="username"
				placeholder="Pak John"
				bind:value={$form.username}
			/>
			<Helper class="text-sm mt-2">
				{#if $errors.username}
					{$errors.username}
				{/if}
			</Helper>
		</div>
		<div class="mb-6">
			<Label for="password" class="block mb-2">Kata Sandi</Label>
			<Input
				class="block"
				name="password"
				id="password"
				type="password"
				placeholder="Rahasia123"
				bind:value={$form.password}
			/>
			<Helper class="text-sm mt-2">
				{#if $errors.password}
					{$errors.password}
				{/if}
			</Helper>
		</div>
		<div class="mb-6">
			<Label for="passwordConfirm" class="block mb-2">Konfirmasi Kata Sandi</Label>
			<Input
				class="block"
				name="passwordConfirm"
				id="passwordConfirm"
				type="password"
				placeholder="Rahasia123"
				bind:value={$form.passwordConfirm}
			/>
			<Helper class="text-sm mt-2">
				{#if $errors.passwordConfirm}
					{$errors.passwordConfirm}
				{/if}
			</Helper>
		</div>

		<div class="mb-6">
			<Label for="signPassword" class="block mb-2">Pin Pendaftaran</Label>
			<Input
				class="block"
				id="signPassword"
				name="signPassword"
				type="password"
				placeholder="Pin Rahasia"
				bind:value={$form.signPassword}
			/>
			<Helper class="text-sm mt-2">
				{#if $errors.signPassword}
					{$errors.signPassword}
				{/if}
			</Helper>
		</div>
		<div class="mb-6">
			<Label for="email" class="block mb-2">Email*</Label>
			<Input
				class="block"
				id="email"
				name="email"
				type="email"
				placeholder="PakJohn@gmail.com"
				bind:value={$form.email}
			/>
			<Helper class="text-sm mt-2">
				{#if $errors.email}
					{$errors.email}
				{:else}
					*Opsional
				{/if}
			</Helper>
		</div>

		<div class="flex justify-center">
			<Button type="submit">Kirim</Button>
		</div>
	</form>
</div>
