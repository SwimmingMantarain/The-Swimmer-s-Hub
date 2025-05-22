<!-- src/routes/+layout.svelte -->
<script>
    import PageTransition from "$lib/PageTransition.svelte";
</script>

<main>
    <slot />
</main>

<PageTransition />

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #f5f5f5;
    }

    main {
        min-height: 100vh;
    }
</style>
