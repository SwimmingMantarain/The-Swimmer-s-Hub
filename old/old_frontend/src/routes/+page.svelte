<!-- src/routes/+page.svelte -->
<script>
    import { goto } from "$app/navigation";
    import { fadeTransition } from "$lib/transition.js";
    import { onMount } from "svelte";

    let mounted = false;

    function handleLoginClick(event) {
        event.preventDefault();
        fadeTransition(() => {
            goto("/login");
        });
    }

    onMount(() => {
        mounted = true;
    });
</script>

<div class="home-container" class:mounted>
    <div class="hero-content">
        <div class="logo">🏊‍♂️</div>

        <h1 class="home-title">
            Welcome to <span class="gradient-text">The Swimmer Hub</span>
        </h1>

        <p class="home-description">
            Track your swimming progress, manage your upcoming meets, and view
            your personal bests.
            <br /><br />
            Are you on SwimRankings? Find your SwimRankings ID for automatic PB updates.
        </p>

        <div class="cta-section">
            <p class="ready-text">Ready to dive in?</p>
            <a class="login-button" href="/login" on:click={handleLoginClick}>
                Register or Login
            </a>
        </div>
    </div>

    <!-- Floating decorations -->
    <div class="float-element element-1">🏆</div>
    <div class="float-element element-2">⏱️</div>
    <div class="float-element element-3">📊</div>
    <div class="float-element element-4">🥇</div>
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        text-align: center;
        padding: 2rem;
        position: relative;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }

    .home-container.mounted {
        opacity: 1;
        transform: translateY(0);
    }

    .hero-content {
        z-index: 2;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .logo {
        font-size: 4rem;
        margin-bottom: 2rem;
        animation: float 3s ease-in-out infinite;
        filter: drop-shadow(0 4px 8px rgba(14, 165, 233, 0.3));
    }

    .home-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 800;
        margin-bottom: 2rem;
        line-height: 1.2;
    }

    .gradient-text {
        background: linear-gradient(135deg, #0ea5e9, #3b82f6, #8b5cf6);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradientShift 3s ease-in-out infinite;
    }

    .home-description {
        font-size: 1.2rem;
        line-height: 1.6;
        margin-bottom: 3rem;
        color: #94a3b8;
        max-width: 600px;
    }

    .cta-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-size: 1.1rem;
        color: #cbd5e1;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }

    .login-button {
        display: inline-block;
        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
        color: white;
        padding: 1rem 2.5rem;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
    }

    .login-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
    }

    .float-element {
        position: absolute;
        font-size: 2rem;
        opacity: 0.6;
        animation: float 6s ease-in-out infinite;
        pointer-events: none;
    }

    .element-1 {
        top: 15%;
        left: 10%;
        animation-delay: 0s;
    }

    .element-2 {
        top: 25%;
        right: 15%;
        animation-delay: 1.5s;
    }

    .element-3 {
        bottom: 30%;
        left: 15%;
        animation-delay: 3s;
    }

    .element-4 {
        bottom: 20%;
        right: 10%;
        animation-delay: 4.5s;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    @keyframes gradientShift {
        0%,
        100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }

    @media (max-width: 768px) {
        .home-container {
            padding: 1rem;
        }

        .home-title {
            font-size: 2.5rem;
        }

        .home-description {
            font-size: 1.1rem;
        }

        .float-element {
            font-size: 1.5rem;
        }
    }
</style>
