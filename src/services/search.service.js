import api from './api';

class SearchService {
    apiUrl = "https://api.github.com/graphql"
    searchUser(query, endCursor = "", startCursor = "") {

        let q = `
        {
            search(query: "` + query + `", 
                type: USER, 
                ` + (startCursor != '' ? `last: 50,` : `first: 50,`) + `
                ` + (endCursor != '' ? `after: "` + endCursor + `",` : "") + `
                ` + (startCursor != '' ? `before: "` + startCursor + `",` : "") + `
            ) {
                edges {
                    node {
                        ... on User {
                        id
                        email
                        bio
                        avatarUrl
                        bioHTML
                        url
                        name
                        company
                        }
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                    startCursor
                    hasPreviousPage
                }
                userCount
            }
        }
        `;

        return api.post(this.apiUrl, {
            query: q
        })
    }
}

export default new SearchService();