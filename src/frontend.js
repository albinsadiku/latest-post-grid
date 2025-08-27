import { GET_LATEST_POSTS_QUERY } from './graphql-query.js';

document.addEventListener('DOMContentLoaded', () => {
    const postGrids = document.querySelectorAll('.latest-post-grid');
    postGrids.forEach(grid => {
        const postCount = parseInt(grid.getAttribute('data-post-count')) || 4;
        loadPosts(grid, postCount);
    });
});

/**
 * Load posts from GraphQL API and render them
 * @param {HTMLElement} gridElement - The container element for posts
 * @param {number} postCount - Number of posts to fetch
 * @returns {Promise<void>}
 */
async function loadPosts(gridElement, postCount) {
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: GET_LATEST_POSTS_QUERY,
            variables: { first: postCount }
        })
    });

    const result = await response.json();
    const posts = result?.data?.posts?.nodes || [];
    renderPosts(gridElement, posts);
}

/**
 * Render posts inside the grid
 * @param {HTMLElement} gridElement - The container element
 * @param {Array<Object>} posts - Array of post objects
 * @returns {void}
 */
function renderPosts(gridElement, posts) {
    if (posts.length === 0) {
        gridElement.innerHTML = `<p>No posts found.</p>`;
        return;
    }

    let html = '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">';
    posts.forEach(post => {
        html += `
            <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                ${post.featuredImage?.node?.sourceUrl ? `
                    <div class="aspect-video overflow-hidden">
                        <a href="${post.uri}">
                            <img src="${post.featuredImage.node.sourceUrl}" 
                                 alt="${post.featuredImage.node.altText || post.title}" 
                                 loading="lazy"
                                 class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                        </a>
                    </div>
                ` : ''}

                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2 leading-tight">
                        <a href="${post.uri}" class="text-gray-900 hover:text-blue-600 transition-colors duration-200 no-underline">${post.title}</a>
                    </h3>
                    <div class="flex flex-wrap gap-2 mb-3 text-sm text-gray-600">
                        <span>By ${post.author?.node?.name || 'Unknown'}</span>
                        <span>${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    ${post.excerpt ? `
                        <div class="text-gray-700 text-sm mb-4 overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                            ${post.excerpt}
                        </div>
                    ` : ''}
                    <a href="${post.uri}" class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors duration-200 no-underline">
                        Read More
                    </a>
                </div>
            </article>
        `;
    });
    html += '</div>';
    gridElement.innerHTML = html;
}
