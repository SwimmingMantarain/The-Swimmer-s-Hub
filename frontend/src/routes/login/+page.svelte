<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let username = "";
    let password = "";
    let error = "";
    let isLoading = false;
    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    async function handleLogin(event) {
        event.preventDefault();
        error = "";
        isLoading = true;

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                goto("/profile");
            } else {
                const data = await response.json().catch(() => ({}));
                error = data.message || "Invalid username or password";
                // Add shake animation to form on error
                const form = document.querySelector(".auth-form");
                form.classList.add("shake");
                setTimeout(() => form.classList.remove("shake"), 500);
            }
        } catch (err) {
            error = "Network error. Please try again.";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="auth-container" class:mounted>
    <div class="auth-card">
        <div class="auth-header">
            <div class="auth-icon">🔑</div>
            <h1 class="auth-title">Welcome Back</h1>
            <p class="auth-subtitle">Sign in to your Swimmer Hub account</p>
        </div>

        <form class="auth-form" on:submit|preventDefault={handleLogin}>
            {#if error}
                <div class="error-message">
                    <span class="error-icon">⚠️</span>
                    {error}
                </div>
            {/if}

            <div class="form-group">
                <label for="username" class="form-label">Username</label>
                <div class="input-container">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        bind:value={username}
                        required
                        autocomplete="username"
                        class="form-input"
                        disabled={isLoading}
                    />
                    <div class="input-focus-border"></div>
                </div>
            </div>

            <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <div class="input-container">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        bind:value={password}
                        required
                        autocomplete="current-password"
                        class="form-input"
                        disabled={isLoading}
                    />
                    <div class="input-focus-border"></div>
                </div>
            </div>

            <button type="submit" class="auth-button" disabled={isLoading}>
                {#if isLoading}
                    <div class="spinner"></div>
                    Signing in...
                {:else}
                    Sign In
                {/if}
            </button>
        </form>

        <div class="auth-footer">
            <p class="footer-text">
                Don't have an account?
                <a href="/register" class="auth-link">Create one here</a>
            </p>
        </div>
    </div>

    <!-- Background decoration -->
    <div class="bg-decoration">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
    </div>
</div>

<style>
    .auth-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        position: relative;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }

    .auth-container.mounted {
        opacity: 1;
        transform: translateY(0);
    }

    .auth-card {
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 3rem;
        width: 100%;
        max-width: 420px;
        box-shadow:
            0 25px 50px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        position: relative;
        z-index: 2;
        animation: cardEntrance 0.8s ease-out 0.2s both;
    }

    .auth-header {
        text-align: center;
        margin-bottom: 2.5rem;
    }

    .auth-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        animation: iconFloat 3s ease-in-out infinite;
    }

    .auth-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .auth-subtitle {
        color: #94a3b8;
        font-size: 0.95rem;
        margin: 0;
    }

    .auth-form {
        margin-bottom: 2rem;
    }

    .auth-form.shake {
        animation: shake 0.5s ease-in-out;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #e2e8f0;
        font-size: 0.9rem;
    }

    .input-container {
        position: relative;
    }

    .form-input {
        width: 100%;
        padding: 0.875rem 1rem;
        background: rgba(30, 41, 59, 0.5);
        border: 1px solid rgba(71, 85, 105, 0.5);
        border-radius: 10px;
        color: #e2e8f0;
        font-size: 1rem;
        transition: all 0.3s ease;
        outline: none;
    }

    .form-input:focus {
        border-color: rgba(14, 165, 233, 0.5);
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
    }

    .form-input:focus + .input-focus-border {
        transform: scaleX(1);
    }

    .form-input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .input-focus-border {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
        transform: scaleX(0);
        transition: transform 0.3s ease;
        border-radius: 1px;
    }

    .error-message {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #fca5a5;
        padding: 0.875rem;
        border-radius: 10px;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        animation: errorPulse 0.5s ease-out;
    }

    .error-icon {
        flex-shrink: 0;
    }

    .auth-button {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;
    }

    .auth-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(14, 165, 233, 0.3);
    }

    .auth-button:active:not(:disabled) {
        transform: translateY(0);
    }

    .auth-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    .spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .auth-footer {
        text-align: center;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(71, 85, 105, 0.3);
    }

    .footer-text {
        color: #94a3b8;
        font-size: 0.9rem;
        margin: 0;
    }

    .auth-link {
        color: #0ea5e9;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
    }

    .auth-link:hover {
        color: #38bdf8;
        text-decoration: underline;
    }

    .bg-decoration {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 1;
    }

    .wave {
        position: absolute;
        background: linear-gradient(
            45deg,
            rgba(14, 165, 233, 0.1),
            rgba(59, 130, 246, 0.1)
        );
        border-radius: 50%;
        animation: waveFloat 8s ease-in-out infinite;
    }

    .wave-1 {
        width: 300px;
        height: 300px;
        top: 10%;
        left: -10%;
        animation-delay: 0s;
    }

    .wave-2 {
        width: 200px;
        height: 200px;
        bottom: 10%;
        right: -5%;
        animation-delay: 2s;
    }

    .wave-3 {
        width: 150px;
        height: 150px;
        top: 60%;
        left: 80%;
        animation-delay: 4s;
    }

    @keyframes cardEntrance {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes iconFloat {
        0%,
        100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-5px);
        }
    }

    @keyframes shake {
        0%,
        100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-5px);
        }
        75% {
            transform: translateX(5px);
        }
    }

    @keyframes errorPulse {
        0% {
            transform: scale(0.95);
            opacity: 0;
        }
        100% {
            transform: scale(1);
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

    @keyframes waveFloat {
        0%,
        100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.5;
        }
        25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-10px) translateX(-5px) scale(0.9);
            opacity: 0.3;
        }
        75% {
            transform: translateY(-30px) translateX(15px) scale(1.05);
            opacity: 0.6;
        }
    }

    @media (max-width: 768px) {
        .auth-container {
            padding: 1rem;
        }

        .auth-card {
            padding: 2rem;
        }

        .wave {
            opacity: 0.3;
        }
    }
</style>
