<script>
	import '../../app.css';
	import { Label, Input, Helper, Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
</script>

<div class="m-auto w-1/3 shadow-lg p-6 rounded-md mt-20">
	<form method="post" use:enhance>
		<p class="text-3xl text-center text-blue-500"><b>SIGN UP</b></p>
		<div class="mb-6">
			<Label for="username" class="block mb-2">Username</Label>
			<Input required name="username" id="username" placeholder="username" />
		</div>
		<div class="mb-6">
			<Label for="password" class="block mb-2">Password</Label>
			<Input required name="password" id="password" type="password" placeholder="••••••" />
		</div>
		<div class="mb-6">
			<Label for="email" class="block mb-2">Email*</Label>
			<Input id="email" name="email" type="email" placeholder="email" />
			<Helper class="text-sm mt-2">*Optional</Helper>
		</div>

		<Button type="submit" class="m-auto block">Submit</Button>
	</form>
</div>
