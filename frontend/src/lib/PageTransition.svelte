<!-- src/lib/PageTransition.svelte -->
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
    >
        <div class="transition-content">
            <div class="swimmer-icon">🏊‍♂️</div>
            <div class="loading-text">Swimming to next page...</div>
            <div class="wave-loader">
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
            </div>
        </div>
    </div>
{/if}

<style>
    .transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(
            135deg,
            #0f172a 0%,
            #1e293b 50%,
            #0ea5e9 100%
        );
        pointer-events: none;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transform: translateX(100%);
        transition: none;
    }

    .transition-overlay.active {
        pointer-events: all;
        visibility: visible;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .transition-overlay.active.out {
        opacity: 1;
        transform: translateX(0);
    }

    .transition-overlay.active.in {
        opacity: 0;
        transform: translateX(-100%);
    }

    .transition-content {
        text-align: center;
        color: white;
        opacity: 0;
        transform: translateY(20px);
    }

    .transition-overlay.active .transition-content {
        animation: contentFadeIn 0.4s ease-out 0.2s both;
    }

    .transition-overlay.active.in .transition-content {
        animation: contentFadeOut 0.3s ease-out both;
    }

    .swimmer-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: swim 2s ease-in-out infinite;
    }

    .loading-text {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 2rem;
        color: rgba(255, 255, 255, 0.9);
    }

    .wave-loader {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
    }

    .wave-bar {
        width: 4px;
        height: 20px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 2px;
        animation: waveAnimation 1.2s ease-in-out infinite;
    }

    .wave-bar:nth-child(1) {
        animation-delay: 0s;
    }
    .wave-bar:nth-child(2) {
        animation-delay: 0.1s;
    }
    .wave-bar:nth-child(3) {
        animation-delay: 0.2s;
    }
    .wave-bar:nth-child(4) {
        animation-delay: 0.3s;
    }
    .wave-bar:nth-child(5) {
        animation-delay: 0.4s;
    }

    @keyframes contentFadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes contentFadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }

    @keyframes swim {
        0%,
        100% {
            transform: translateX(0) rotate(0deg);
        }
        25% {
            transform: translateX(10px) rotate(5deg);
        }
        50% {
            transform: translateX(0) rotate(0deg);
        }
        75% {
            transform: translateX(-10px) rotate(-5deg);
        }
    }

    @keyframes waveAnimation {
        0%,
        100% {
            transform: scaleY(1);
            opacity: 0.7;
        }
        50% {
            transform: scaleY(1.8);
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        .swimmer-icon {
            font-size: 3rem;
        }

        .loading-text {
            font-size: 1rem;
        }
    }
</style>
