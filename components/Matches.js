import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import classnames from 'classnames';
import _ from 'lodash';
import numeral from 'numeral';

const COLORS = ['red', 'blue', 'green'];
const LANG_SLUG = 'en';


class Matches extends Component {
    onRefreshClicked() {
        return this.props.data.refetch();
    }

    render() {
        const { data } = this.props;
        const { matches, loading, _matchesMeta } = data;

        if (loading) return <div>Loading</div>;

		console.log('_matchesMeta', _matchesMeta);

        return <div className="container matches">
            {matches && matches.length ? (
				<div className="row">
					{_.map(['NA', 'EU'], region => (
						<div className="col-md" key={region}>
							<div className="card">
								{_.chain(matches)
									.filter({ region })
									.sortBy('id')
									.map((match, i) => <Match key={match.id} match={match} i={i} />)
									.value()}
							</div>
						</div>
					))}
				</div>
            ) : null}
            <div className="row">
				<div className="col">
					<p><button className='btn btn-primary waves-effect waves-light' onClick={() => this.onRefreshClicked()}>Refresh</button></p>
				</div>
			</div>
            <pre>matches: {JSON.stringify(matches, null, '\t')}</pre>
        </div>;
    }
}


const Match = ({ match, i }) =>  {
    return (
		<div key={match.id} className={`match row align-items-center row-${i%2}`}>
			<div className="col-md-auto text-center"><Pie matchScores={match.scores} /></div>
            <div className="col"><MatchWorlds matchWorlds={match.worlds} /></div>
            <div className="col-md-auto"><MatchScores matchScores={match.scores} /></div>
        </div>
    );
};

const MatchWorlds = ({ matchWorlds }) => (
	<div className="match-worlds">{
		_.map(COLORS, color => {
			const world = _.get(matchWorlds, color);
			const className = classnames({
				"match-worlds-world": true,
				[`team-${color}`]: true,
			});

			return (
				<div key={color} className={className}>
					{_.get(world, [LANG_SLUG,'name'], 'ERR')}
				</div>
			);
		})
	}</div>
);

const MatchScores = ({ matchScores }) => (
	<div className="match-scores">{
		_.map(COLORS, (color) => {
			const className = classnames({
				"match-scores-world": true,
				[`team-${color}`]: true,
			});

			return (
				<div key={color} className={className}>
					{numeral(matchScores[color]).format(',')}
				</div>
			);
		})
	}</div>
);

const Pie = ({ matchScores }) => {
    const scores = _.values(_.pick(matchScores, ['red', 'blue', 'green']));
    const pielySrc = `https://piely.net/${scores.join()}.svg`;

    return <img className="match-scores-pie" src={pielySrc} width="64" />;
};



const matches = gql`
    query {
        matches {
            id
            start_time
            end_time
			region,
            scores { red green blue }
            worlds {
                red { ...worldProps }
                blue { ...worldProps }
                green { ...worldProps }
            }
            all_worlds {
                red { ...worldProps }
                blue { ...worldProps }
                green { ...worldProps }
            }
        }
    }

    fragment worldProps on World {
        id
        population
        slugs
        en { name slug }
        es { name slug }
        de { name slug }
        fr { name slug }
        zh { name slug }
    }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (Matches)
export default graphql(matches, {
    options: {
        variables: {
        //   skip: 0,
        //   first: POSTS_PER_PAGE
        },
        pollInterval: 1000 * 4,
    },
    props: ({ data }) => ({
        data,
        // loadMorePosts: () => {
        //   return data.fetchMore({
        //     variables: {
        //       skip: data.allPosts.length
        //     },
        //     updateQuery: (previousResult, { fetchMoreResult }) => {
        //       if (!fetchMoreResult) {
        //         return previousResult
        //       }
        //       return Object.assign({}, previousResult, {
        //         // Append the new posts results to the old one
        //         allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
        //       })
        //     }
        //   })
        // }
    }),
})(Matches);
