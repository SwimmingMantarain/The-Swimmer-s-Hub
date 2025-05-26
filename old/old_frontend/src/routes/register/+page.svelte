<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let username = "";
    let email = "";
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
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                goto("/profile");
            } else {
                const data = await response.json().catch(() => ({}));
                error = data.message || "Invalid username or password";
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
            <h1 class="auth-title">Welcome</h1>
            <p class="auth-subtitle">Create your Swimmer Hub account</p>
        </div>

        <form class="auth-form" on:submit|preventDefault={handleLogin}>
            {#if error}
                <div class="error-message">
                    ⚠️ {error}
                </div>
            {/if}

            <div class="form-group">
                <label for="username">Username</label>
                <input
                    type="text"
                    id="username"
                    bind:value={username}
                    required
                    disabled={isLoading}
                />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    bind:value={email}
                    required
                    disabled={isLoading}
                />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    bind:value={password}
                    required
                    disabled={isLoading}
                />
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
            <p>
                Already gave an account?
                <a href="/login">Login Here</a>
            </p>
        </div>
    </div>
</div>

<style>
    .auth-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
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
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    }

    .auth-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .auth-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        animation: float 3s ease-in-out infinite;
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

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #e2e8f0;
        font-size: 0.9rem;
    }

    .form-group input {
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

    .form-group input:focus {
        border-color: #0ea5e9;
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
    }

    .form-group input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .error-message {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #fca5a5;
        padding: 0.875rem;
        border-radius: 10px;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
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
    }

    .auth-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(14, 165, 233, 0.3);
    }

    .auth-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
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

    .auth-footer p {
        color: #94a3b8;
        font-size: 0.9rem;
        margin: 0;
    }

    .auth-footer a {
        color: #0ea5e9;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
    }

    .auth-footer a:hover {
        color: #38bdf8;
        text-decoration: underline;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-5px);
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

    @media (max-width: 768px) {
        .auth-container {
            padding: 1rem;
        }

        .auth-card {
            padding: 2rem;
        }
    }
</style>
