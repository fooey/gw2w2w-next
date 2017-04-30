import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import _ from 'lodash';


class PostList extends Component {

    onRefreshClicked() {
        console.log('onRefreshClicked');
        this.props.data.refetch();
    }

    render() {
        // const { props } = this;
        const { data } = this.props;
        const { matches, loading, _matchesMeta } = data;

        if (loading) return <div>Loading</div>;

        console.log('data', data);

        return <div>
            <p><button onClick={() => this.onRefreshClicked()}>Refresh</button></p>
            {matches && matches.length ? (
                <table>
                    <tbody>
                        {_.chain(matches).sortBy('id').map(match => <Match key={match.id} match={match} />).value()}
                    </tbody>
                </table>
            ) : null}
            <pre>_matchesMeta: {JSON.stringify(_matchesMeta, null, '\t')}</pre>
            <pre>matches: {JSON.stringify(matches, null, '\t')}</pre>
        </div>;
    }
    // render({ data: { matches, loading, _matchesMeta }}) {
    //
    //     return <div>
    //         {/* <p><button onClick={() => data.refetch()()}>Refresh</button></p> */}
    //         {matches && matches.length ? <table>
    //             {_.chain(matches).sortBy('id').map(match => <Match match={match} />).value()}
    //         </table> : null}
    //         <pre>_matchesMeta: {JSON.stringify(_matchesMeta, null, '\t')}</pre>
    //         <pre>matches: {JSON.stringify(matches, null, '\t')}</pre>
    //     </div>;
    // }
  // if (allPosts && allPosts.length) {
  //   const areMorePosts = allPosts.length < _allPostsMeta.count
  //   return (
  //     <section>
  //       <ul>
  //         {allPosts.map((post, index) =>
  //           <li key={post.id}>
  //             <div>
  //               <span>{index + 1}. </span>
  //               <a href={post.url}>{post.title}</a>
  //               <PostUpvoter id={post.id} votes={post.votes} />
  //             </div>
  //           </li>
  //         )}
  //       </ul>
  //       {areMorePosts ? <button onClick={() => loadMorePosts()}> {loading ? 'Loading...' : 'Show More'} </button> : ''}
  //     </section>
  //   )
  // }
}


const Match = ({ match }) =>  {
    return (
        <tr key={match.id}>
            <td>{match.id}</td>
            <td>
                {_.map(['red', 'blue', 'green'], (color) => {
                    const world = match.worlds[color];
                    return (
                        <div key={color}>
                            {color}:
                            {world.en.name}
                        </div>
                    );
                })}
            </td>
            <td>
                {_.map(['red', 'blue', 'green'], (color) => (
                    <div key={color}>
                        {color}:
                        {match.scores[color]}
                    </div>
                ))}
            </td>
            <td>
                <Pie matchScores={match.scores} />
            </td>
        </tr>
    );
};

const Pie = ({ matchScores }) => {
    const scores = _.values(_.pick(matchScores, ['red', 'blue', 'green']));
    const pielySrc = `https://piely.net/${scores.join()}.svg`;

    return <img src={pielySrc} width="64" />;
};

const matches = gql`
    query {
        matches {
            id
            start_time
            end_time
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
// available on the `data` prop of the wrapped component (PostList)
export default graphql(matches, {
    options: {
        variables: {
        //   skip: 0,
        //   first: POSTS_PER_PAGE
        },
        pollInterval: 1000 * 3,
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
})(PostList);
