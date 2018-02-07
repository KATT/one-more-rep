import Link from 'next/link';
import ExerciseList from '../components/ExerciseList';
import withData from '../lib/withData';

export default withData(() => (
  <div>
    Hello World.{' '}
    <Link href="/about">
      <a>About</a>
    </Link>
    <ExerciseList />
  </div>
));
