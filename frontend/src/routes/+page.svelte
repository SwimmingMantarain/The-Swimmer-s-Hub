<!-- src/routes/+page.svelte -->
<script>
    import { goto } from "$app/navigation";
    import { startTransition } from "$lib/transition.js";
    import { onMount } from "svelte";

    let mounted = false;

    function handleLoginClick(event) {
        event.preventDefault();
        startTransition(() => {
            goto("/login");
        });
    }

    onMount(() => {
        mounted = true;
    });
</script>

<div class="home-container" class:mounted>
    <div class="hero-content">
        <div class="logo-container">
            <div class="logo">🏊‍♂️</div>
        </div>

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
                <span>Register or Login</span>
                <div class="button-shine"></div>
            </a>
        </div>
    </div>

    <div class="floating-elements">
        <div class="float-element element-1">🏆</div>
        <div class="float-element element-2">⏱️</div>
        <div class="float-element element-3">📊</div>
        <div class="float-element element-4">🥇</div>
    </div>
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
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .home-container.mounted {
        opacity: 1;
        transform: translateY(0);
    }

    .hero-content {
        z-index: 2;
        position: relative;
    }

    .logo-container {
        margin-bottom: 2rem;
        animation: floatLogo 3s ease-in-out infinite;
    }

    .logo {
        font-size: 4rem;
        filter: drop-shadow(0 4px 8px rgba(14, 165, 233, 0.3));
    }

    .home-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 800;
        margin-bottom: 2rem;
        line-height: 1.2;
        animation: fadeInUp 1s ease-out 0.3s both;
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
        animation: fadeInUp 1s ease-out 0.6s both;
    }

    .cta-section {
        animation: fadeInUp 1s ease-out 0.9s both;
    }

    .ready-text {
        font-size: 1.1rem;
        color: #cbd5e1;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }

    .login-button {
        display: inline-block;
        position: relative;
        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
        color: white;
        padding: 1rem 2.5rem;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow:
            0 4px 15px rgba(14, 165, 233, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        overflow: hidden;
    }

    .login-button:hover {
        transform: translateY(-2px);
        box-shadow:
            0 8px 25px rgba(14, 165, 233, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.2);
    }

    .login-button:active {
        transform: translateY(0);
    }

    .button-shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: left 0.5s;
    }

    .login-button:hover .button-shine {
        left: 100%;
    }

    .floating-elements {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
    }

    .float-element {
        position: absolute;
        font-size: 2rem;
        opacity: 0.6;
        animation: float 6s ease-in-out infinite;
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

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes floatLogo {
        0%,
        100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
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

    @keyframes float {
        0%,
        100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
        }
        25% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-10px) rotate(-3deg);
            opacity: 0.4;
        }
        75% {
            transform: translateY(-25px) rotate(2deg);
            opacity: 0.7;
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
