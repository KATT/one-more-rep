import Link from 'next/link';
import PostList from '../components/PostList';
import withData from '../lib/withData';

export default withData(() => (
  <div>
    Hello World.{' '}
    <Link href="/about">
      <a>About</a>
    </Link>
    <PostList />
  </div>
));
