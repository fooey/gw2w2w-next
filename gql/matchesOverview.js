import { gql, graphql } from 'react-apollo';


const query = gql`
    query {
        matches {
            id
            start_time
            end_time
			region,
            scores { red green blue }
            worlds {
				red_id
				green_id
				blue_id
            }
        }
    }
`;

export default graphql(query, {
    options: {
        pollInterval: 1000 * 4,
    },
});
