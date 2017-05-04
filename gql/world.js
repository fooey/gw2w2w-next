import { gql, graphql } from 'react-apollo';

const query = gql`
	query WorldQuery($id: ID!) {
	  world(id: $id) {
	    id
	    en { name slug }
	    es { name slug }
	    de { name slug }
	    fr { name slug }
	    zh { name slug }
	  }
	}
`;


export default graphql(query, {
	options: ({ id }) => ({
		variables: { id },
		shouldBatch: true,
	}),
});
