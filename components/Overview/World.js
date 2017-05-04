import React, { PureComponent } from 'react';
import _ from 'lodash';
import classnames from 'classnames';


import WorldQuery from '../../gql/world';


class MatchWorld extends PureComponent {
    render() {
        const { data, color, langSlug } = this.props;
		const { loading, world } = data;

		const className = classnames({
			"match-worlds-world": true,
			[`team-${color}`]: true,
		});

        if (loading) return <div>Loading</div>;

        return (
			<div className={className}>
				{_.get(world, [langSlug,'name'], 'ERR')}
			</div>
		);
    }
}

export default WorldQuery(MatchWorld);
