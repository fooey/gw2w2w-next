import { gql, graphql } from 'react-apollo';


const query = gql`
    query {
		langs {
	        name
			slug
			label
		}
    }
`;

export default graphql(query);
