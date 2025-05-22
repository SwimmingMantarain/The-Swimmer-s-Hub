<!-- src/routes/+page.svelte -->
<script>
    import { goto } from "$app/navigation";
    import { startTransition } from "$lib/transition.js";

    function handleLoginClick(event) {
        event.preventDefault();
        startTransition(() => {
            goto("/login");
        });
    }
</script>

<div class="home-container">
    <div class="home-title">Welcome to Aqua Metrics</div>
    <div class="home-desc">
        Track your swimming progress, manage your upcoming meets, and view your
        personal bests.<br />
        Are you on SwimRankings? Find your SwimRankings ID for automatic PB updates.<br
        />
        <br />
        Ready to dive in?
    </div>
    <a class="login-link" href="/login" on:click={handleLoginClick}
        >Register or Login ;)</a
    >
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 70vh;
        text-align: center;
        padding: 2rem;
    }
    .home-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #0a769d;
    }
    .home-desc {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        color: #333;
    }
    .login-link {
        background: #0a769d;
        color: #fff;
        padding: 0.9rem 2rem;
        border-radius: 8px;
        font-size: 1.1rem;
        text-decoration: none;
        font-weight: 600;
        transition: background 0.2s;
        cursor: pointer;
    }
    .login-link:hover {
        background: #1298cb;
    }
</style>
