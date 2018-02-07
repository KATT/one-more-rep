import ExerciseList from '../components/ExerciseList';
import Layout from '../components/Layout';
import withData from '../lib/withData';

export default withData(() => (
  <Layout>
    Hello World.{' '}
    <ExerciseList />
  </Layout>
));
