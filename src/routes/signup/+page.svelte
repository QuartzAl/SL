<script lang="ts">
	import "../../app.css";
	import "flowbite";
	import { enhance } from "$app/forms";
</script>

<div>
	<h1>Create an account</h1>
	<form method="POST" use:enhance>
		<label for="username">Username</label><br />
		<input id="username" name="username" /><br />
		<label for="password">Password</label><br />
		<input type="password" id="password" name="password" /><br />
		<button type="submit" value="Signup" >Signup</button>
	</form>
</div>