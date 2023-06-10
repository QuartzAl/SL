<script lang="ts">
	import type { PageData } from './$types';
	import '../../../app.css';
	import { P, Heading } from 'flowbite-svelte';

	export let data: PageData;
</script>
<div class="m-5">

	<Heading customSize="text-lg font-extrabold  md:text-xl lg:text-2xl">Profil</Heading>
	<P>
		Username: {data.user.username}
		<br />
		{#if data.user.email != null}
		Email: {data.user.email}
		{/if}
	</P>
	
</div>