<script>
	import '../../app.css';
	import { DarkMode } from 'flowbite-svelte';

	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Heading } from 'flowbite-svelte';
</script>

<body class="bg-gray-100 dark:bg-gray-800" />
<Navbar let:hidden let:toggle color="form">
	<NavBrand href="/"
		><Heading customSize="text-2xl font-extrabold  md:text-2xl lg:text-4xl">Inventory Data</Heading
		></NavBrand
	>
	<NavHamburger on:click={toggle} />
	<NavUl class="items-center" {hidden}>
		<NavLi href="/app/profile" active={true}>Profile</NavLi>
		<NavLi href="/app/categories" active={true}>Categories</NavLi>
		<NavLi href="/app/conditions" active={true}>Conditions</NavLi>
		<NavLi href="/app" active={true}>Items</NavLi>
		<NavLi href="/app/borrow" active={true}>Borrow</NavLi>
		<NavLi>
			<form method="post" action="/app?/signout">
				<Button type="submit" size="xs" outline color="red">Sign Out</Button>
			</form>
		</NavLi>
		<NavLi>
			<DarkMode />
		</NavLi>
	</NavUl>
	<NavHamburger />
</Navbar>
<div class="m-6">
	<slot />
</div>
