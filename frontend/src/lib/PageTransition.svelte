<!-- src/lib/components/PageTransition.svelte -->
<script>
    import { isTransitioning, transitionDirection } from "$lib/transition.js";
    import { onMount } from "svelte";

    let mounted = false;

    onMount(() => {
        mounted = true;
    });
</script>

{#if mounted}
    <div
        class="transition-overlay"
        class:active={$isTransitioning}
        class:out={$isTransitioning && $transitionDirection === "out"}
        class:in={$isTransitioning && $transitionDirection === "in"}
    ></div>
{/if}

<style>
    .transition-overlay {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100vh;
        height: 100vh;
        background: #0a769d;
        pointer-events: none;
        z-index: 9999;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .transition-overlay.active.out {
        transform: translate(-50%, -50%) scale(2.5);
    }

    .transition-overlay.active.in {
        transform: translate(-50%, -50%) scale(0);
    }
</style>
