<script>
    import { Spinner, P } from 'flowbite-svelte';
    import "../app.css";
</script>
<body class="m-0 h-full bg-gray-100 dark:bg-gray-800">
    <div class="absolute inset-1/2 ">
        <Spinner size={"12"} />
        <P style="margin-left: -0.2em">Loading...</P>
    </div>
</body>