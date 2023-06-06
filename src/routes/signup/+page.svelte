<script>
	import '../../app.css';
	import { Label, Input, Helper, Button } from 'flowbite-svelte';
	import {enhance} from '$app/forms';
</script>

<div class="m-6">
	<form method="post" use:enhance>
		<div class="mb-6">
			<Label for="username" class="block mb-2">Username</Label>
			<Input required name="username" id="username" placeholder="Default input" />
		</div>
		<div class="mb-6">
			<Label for="password" class="block mb-2">Password</Label>
			<Input required name="password" id="password" type="password" placeholder="Default input" />
		</div>
		<div class="mb-6">
			<Label for="email" class="block mb-2">Email*</Label>
			<Input id="email" name="email" type="email" placeholder="Default input" />
			<Helper class="text-sm mt-2">*Optional</Helper>
		</div>

		<Button type="submit">Submit</Button>
	</form>
</div>
