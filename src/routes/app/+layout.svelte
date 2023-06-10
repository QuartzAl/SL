<script>
	import '../../app.css';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Heading,
		DarkMode
	} from 'flowbite-svelte';
	let toggle = false;
</script>

<svelte:body class="bg-gray-100 dark:bg-gray-800" />
<Navbar let:hidden let:toggle color="form">
	<NavBrand href="/"
		><Heading customSize="text-2xl font-extrabold  md:text-2xl lg:text-4xl">Data Inventaris</Heading
		></NavBrand
	>
	<NavHamburger on:click={toggle} />
	<NavUl class="items-center" {hidden}>
		<NavLi href="/app/profile">Profil</NavLi>
		<NavLi href="/app/categories">Kategori Barang</NavLi>
		<NavLi href="/app/conditions">Kondisi Barang</NavLi>
		<NavLi href="/app">Barang</NavLi>
		<NavLi href="/app/borrow">Peminjaman</NavLi>
		<NavLi>
			<form method="post" action="/app?/signout">
				<Button type="submit" size="xs" outline color="red">Keluar</Button>
			</form>
		</NavLi>
		<NavLi>
			<DarkMode />
		</NavLi>
	</NavUl>
	<NavHamburger />
</Navbar>
<div class="min-h-screen bg-gray-100 dark:bg-gray-800">
	<div class="p-6">
		<slot />
	</div>
</div>
