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
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #0a769d;
        pointer-events: none;
        z-index: 9999;
        border-radius: 50%;
        transform: scale(0);
        transform-origin: center;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .transition-overlay.active.out {
        transform: scale(3);
        border-radius: 0%;
    }

    .transition-overlay.active.in {
        transform: scale(3);
        border-radius: 0%;
    }

    .transition-overlay.active.in {
        animation: shrinkAndFade 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes shrinkAndFade {
        0% {
            transform: scale(3);
            border-radius: 0%;
        }
        100% {
            transform: scale(0);
            border-radius: 50%;
        }
    }
</style>
