<!-- src/lib/PageTransition.svelte -->
<script>
    import { isTransitioning } from "$lib/transition.js";
</script>

{#if $isTransitioning}
    <div class="fade-overlay">
        <div class="fade-content">
            <div class="spinner"></div>
        </div>
    </div>
{/if}

<style>
    .fade-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    }

    .fade-content {
        text-align: center;
        color: white;
    }

    .spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid #0ea5e9;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
