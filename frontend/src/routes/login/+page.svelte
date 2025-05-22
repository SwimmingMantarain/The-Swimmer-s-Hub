<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    let username = "";
    let password = "";
    let error = "";

    async function handleLogin(event) {
        event.preventDefault();
        error = "";

        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            credentials: "include", // for cookies/session
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Redirect to profile page after successful login
            goto("/profile");
        } else {
            const data = await response.json().catch(() => ({}));
            error = data.message || "Invalid username or password";
        }
    }
</script>

<div class="auth-container">
    <fieldset>
        <legend>Login 🔑</legend>
        <form class="auth-form" on:submit|preventDefault={handleLogin}>
            {#if error}
                <div class="error-message">{error}</div>
            {/if}
            <div class="form-group">
                <label for="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    bind:value={username}
                    required
                    autocomplete="username"
                />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    bind:value={password}
                    required
                    autocomplete="current-password"
                />
            </div>
            <button type="submit" class="auth-button">Log In</button>
        </form>
    </fieldset>
    <div class="auth-footer">
        <p>
            Don't have an account?
            <a href="/register">Register here</a>
        </p>
    </div>
</div>
