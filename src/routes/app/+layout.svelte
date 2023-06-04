<script>
    import "../../app.css";
	import { DarkMode } from "flowbite-svelte";
    
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Heading } from 'flowbite-svelte';

</script>
<body class="bg-gray-100 dark:bg-gray-800"/>
<Navbar let:hidden let:toggle color="form">
	<NavBrand href="/"><Heading customSize="text-2xl font-extrabold  md:text-2xl lg:text-4xl">Inventory Data</Heading></NavBrand>
	<NavUl class="items-center">
		<NavLi href="/app/profile">Profile</NavLi>
		<NavLi href="/app/categories">Categories</NavLi>
        <NavLi href="/app/conditions">Conditions</NavLi>
		<NavLi href="/app">Items</NavLi>
        <NavLi href="/app/borrow">Borrow</NavLi>
        <NavLi>
            <form method="POST">
                <Button type="submit" size="xs" outline color="red">Sign Out</Button>
            </form>
        </NavLi>
        <NavLi>
            <DarkMode  />
        </NavLi>
	</NavUl>
	<NavHamburger />
</Navbar>
<div class="m-6">
    <slot/>
</div>