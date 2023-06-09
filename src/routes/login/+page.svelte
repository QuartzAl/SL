<script lang="ts">
	import '../../app.css';
	import {Helper } from 'flowbite-svelte';

	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	let {form, errors, enhance } = superForm(data.form)
</script>

<div class="m-auto w-1/3 shadow-lg p-6 rounded-md mt-20">
	<form method="POST" use:enhance>
		<p class="text-3xl text-center text-blue-500 font-sans"><b>LOGIN</b></p>
		<br />
		<div class="mb-6">
			<label for="Username" 
			class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"

				>Your Username</label
			>
			<input
				type="text"
				id="username"
				name="username"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="John Doe"
				bind:value={$form.username}
			/>
			{#if $errors.username}
			<Helper class="text-red-500 text-xs italic">{$errors.username}</Helper>
			{/if}
		</div>
		<div class="mb-6">
			<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Your password</label
			>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="My Password"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				bind:value={$form.password}
			/>
			{#if $errors.username}
			<Helper class="text-red-500 text-xs italic">{$errors.username}</Helper>
			{/if}
		</div>
		<div class="flex items-start mb-6">
			<div class="flex items-center h-5">
				<input
					id="remember"
					type="checkbox"
					name="remember"
					value=""
					class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
				/>
			</div>
			<label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>Remember me</label
			>
		</div>
		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-auto block"
			>Submit</button
		>
		<br /><br />
		<p class="text-center">
			New User? <a class="font-medium hover:underline text-blue-700" href="/signup">SIGN UP</a>
		</p>
	</form>
</div>
