<!-- src/routes/+layout.svelte -->
<script>
    import PageTransition from "$lib/PageTransition.svelte";
</script>

<main>
    <slot />
</main>

<PageTransition />

<style>
    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        color: #e2e8f0;
        min-height: 100vh;
        overflow-x: hidden;
    }

    :global(::selection) {
        background: rgba(14, 165, 233, 0.3);
        color: #e2e8f0;
    }

    :global(::-webkit-scrollbar) {
        width: 8px;
    }

    :global(::-webkit-scrollbar-track) {
        background: #1e293b;
    }

    :global(::-webkit-scrollbar-thumb) {
        background: #475569;
        border-radius: 4px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: #64748b;
    }

    main {
        min-height: 100vh;
        position: relative;
    }

    /* Add subtle animated background */
    :global(body::before) {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:
            radial-gradient(
                circle at 20% 80%,
                rgba(14, 165, 233, 0.1) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 80% 20%,
                rgba(59, 130, 246, 0.1) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 40% 40%,
                rgba(168, 85, 247, 0.05) 0%,
                transparent 50%
            );
        pointer-events: none;
        z-index: -1;
        animation: backgroundFloat 20s ease-in-out infinite;
    }

    @keyframes backgroundFloat {
        0%,
        100% {
            opacity: 0.7;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
    }
</style>
