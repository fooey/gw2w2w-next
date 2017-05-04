import React, { Component } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import numeral from 'numeral';

import MatchWorld from './World';

const COLORS = ['red', 'blue', 'green'];
const LANG_SLUG = 'en';

import OverviewQuery from '../../gql/matchesOverview';


class Overview extends Component {
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
		_.map(COLORS, color => <MatchWorld
			key={color}
			color={color}
			langSlug={LANG_SLUG}
			id={_.get(matchWorlds, `${color}_id`)}
		/>)
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



export default OverviewQuery(Overview);
