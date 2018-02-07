import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const EXERCISES_PER_PAGE = 10;

function ExerciseList({ data: { loading, error, exercises }, loadMoreExercises }: any) {
  if (error) { return <div>Error loading Exercises</div>; }
  if (exercises && exercises.length) {
    const areMoreExercises = true;
    return (
      <section>
        <ul>
          {exercises.map((exercise: any, index: number) =>
            <li key={exercise.id}>
              <div>
                <span>{index + 1}. </span>
                {exercise.name_t.string}: {exercise.slug}
              </div>
            </li>,
          )}
        </ul>
        {areMoreExercises ?
          <button onClick={() => loadMoreExercises()}> {
            loading ? 'Loading...' : 'Show More'
          } </button> : ''}
        <style jsx>{`
          section {
            padding-bottom: 20px;
          }
          li {
            display: block;
            margin-bottom: 10px;
          }
          div {
            align-items: center;
            display: flex;
          }
          a {
            font-size: 14px;
            margin-right: 10px;
            text-decoration: none;
            padding-bottom: 0;
            border: 0;
          }
          span {
            font-size: 14px;
            margin-right: 5px;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          button:before {
            align-self: center;
            border-style: solid;
            border-width: 6px 4px 0 4px;
            border-color: #ffffff transparent transparent transparent;
            content: "";
            height: 0;
            margin-right: 5px;
            width: 0;
          }
        `}</style>
      </section>
    );
  }
  return <div>Loading</div>;
}

const exercisesQuery: any = gql`
  query exercises($first: Int!, $skip: Int!) {
    exercises(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      slug
      name_t {
        string
      }
    },
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExerciseList)
export default graphql(exercisesQuery, {
  options: {
    variables: {
      skip: 0,
      first: EXERCISES_PER_PAGE,
    },
  },
  props: ({ data }: any) => ({
    data,
    loadMoreExercises: () => {
      return data.fetchMore({
        variables: {
          skip: data.exercises.length,
        },
        updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return Object.assign({}, previousResult, {
            // Append the new Exercises results to the old one
            exercises: [...previousResult.exercises, ...fetchMoreResult.exercises],
          });
        },
      });
    },
  }),
})(ExerciseList);
