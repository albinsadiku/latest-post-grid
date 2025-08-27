export const GET_LATEST_POSTS_QUERY = `
    query GetLatestPosts($first: Int!) {
        posts(first: $first, where: {status: PUBLISH}) {
            nodes {
                id
                title
                excerpt
                date
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                author {
                    node {
                        name
                    }
                }
                uri
            }
        }
    }
`;
