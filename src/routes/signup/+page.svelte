<script lang="ts">
	import '../../app.css';
	import { Label, Input, Helper, Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	let { form, errors, enhance } = superForm(data.form);
	let show = false;
</script>

<div class="m-auto w-1/3 shadow-lg p-6 rounded-md mt-20">
	<form method="post" use:enhance>
		<p class="text-3xl text-center text-blue-500 font-sans"><b>DAFTAR</b></p>
		<div class="mb-6">
			<Label for="username" class="block mb-2">Nama Pengguna</Label>
			<Input
				class="block"
				name="username"
				id="username"
				placeholder="Pak John"
				bind:value={$form.username}
			>
				<svg
					slot="left"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
					/>
				</svg>
			</Input>
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
				type={show ? 'text' : 'password'}
				placeholder="Rahasia123"
				bind:value={$form.password}
			>
				<button slot="left" on:click={() => (show = !show)} class="pointer-events-auto">
					{#if show}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
							/></svg
						>
					{/if}
				</button>
			</Input>
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
				type={show ? 'text' : 'password'}
				placeholder="Rahasia123"
				bind:value={$form.passwordConfirm}
			>
				<button slot="left" on:click={() => (show = !show)} class="pointer-events-auto">
					{#if show}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
							/></svg
						>
					{/if}
				</button>
			</Input>
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
				type={show ? 'text' : 'password'}
				placeholder="Pin Rahasia"
				bind:value={$form.signPassword}
			>
				<button slot="left" on:click={() => (show = !show)} class="pointer-events-auto">
					{#if show}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
							/></svg
						>
					{/if}
				</button>
			</Input>
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
			>
				<svg
					slot="left"
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path
						d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
					/></svg
				>
			</Input>

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
