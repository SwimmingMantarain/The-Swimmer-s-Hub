document.addEventListener("DOMContentLoaded", function() {
    // Create a script element to load Showdown.js from CDN
    const showdownScript = document.createElement('script');
    showdownScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js';
    showdownScript.async = true;
    
    // Once Showdown is loaded, initialize the renderer
    showdownScript.onload = function() {
        // Initialize the changelog renderer
        initChangelogRenderer();
    };
    
    // Add the script to the document
    document.head.appendChild(showdownScript);
    
    // Function to initialize the changelog renderer
    function initChangelogRenderer() {
        const changelogBtn = document.getElementById("changelog-btn");
        const changelogModal = document.getElementById("changelog-modal");
        const changelogContent = document.querySelector(".changelog-content");
        
        if (changelogBtn && changelogModal && changelogContent) {
            // Add click event handler to load and render the changelog
            changelogBtn.addEventListener("click", function(e) {
                e.preventDefault();
                
                // Show loading indicator
                changelogContent.innerHTML = '<div class="loading">Loading changelog...</div>';
                changelogModal.style.display = "flex";
                
                // Fetch the CHANGELOG.md file
                fetch('/static/CHANGELOG.md')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to load changelog');
                        }
                        return response.text();
                    })
                    .then(markdown => {
                        // Convert markdown to HTML
                        const converter = new showdown.Converter({
                            tables: true,
                            tasklists: true,
                            strikethrough: true,
                            emoji: true
                        });
                        
                        // Create HTML from markdown
                        const html = converter.makeHtml(markdown);
                        
                        // Update modal content
                        changelogContent.innerHTML = html;
                        
                        // Add CSS classes to enhance styling
                        enhanceChangelogStyling();
                    })
                    .catch(error => {
                        console.error("Error loading changelog:", error);
                        changelogContent.innerHTML = `
                            <div class="error-message">
                                <p>Failed to load changelog.</p>
                                <p>Error: ${error.message}</p>
                            </div>
                        `;
                    });
            });
        }
    }
    
    // Function to enhance the styling of the rendered changelog
    function enhanceChangelogStyling() {
        // Add classes to headings, lists, etc.
        const changelogContent = document.querySelector(".changelog-content");
        
        // Add class to h2 elements (version headings)
        const versionHeadings = changelogContent.querySelectorAll("h2");
        versionHeadings.forEach(heading => {
            heading.classList.add("changelog-version");
        });
        
        // Add class to h3 elements (section headings)
        const sectionHeadings = changelogContent.querySelectorAll("h3");
        sectionHeadings.forEach(heading => {
            heading.classList.add("changelog-section");
        });
        
        // Add class to lists
        const lists = changelogContent.querySelectorAll("ul");
        lists.forEach(list => {
            list.classList.add("changelog-list");
        });
        
        // Add class to list items
        const listItems = changelogContent.querySelectorAll("li");
        listItems.forEach(item => {
            item.classList.add("changelog-item");
        });
    }
});