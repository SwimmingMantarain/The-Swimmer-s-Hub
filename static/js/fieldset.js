// JavaScript to toggle minimize/maximize functionality for fieldsets
document.addEventListener("DOMContentLoaded", () => {
    const fieldsets = document.querySelectorAll("fieldset");

    fieldsets.forEach(fieldset => {
        const legend = fieldset.querySelector("legend");

        // Add click event to the legend
        legend.addEventListener("click", () => {
            const content = Array.from(fieldset.children).filter(child => child !== legend);

            content.forEach(element => {
                if (element.style.display === "none") {
                    element.style.display = "";
                    legend.style.color = "#338ab3"; // Reset to theme color
                    legend.style.backgroundColor = "#001526";
                    legend.style.boxShadow = "0 0 10px rgba(51, 138, 179, 0.5)";
                } else {
                    element.style.display = "none";
                    legend.style.color = "#ff6f61"; // Highlight legend when minimized
                    legend.style.backgroundColor = "#002240";
                    legend.style.boxShadow = "0 0 10px rgba(255, 111, 97, 0.8)";
                }
            });
        });

        // Start with fieldset expanded
        fieldset.style.overflow = "hidden";
    });
});