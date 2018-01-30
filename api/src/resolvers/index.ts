import { extractFragmentReplacements } from 'prisma-binding';
import { AuthPayload } from './AuthPayload';
import { auth } from './Mutation/auth';
import { post } from './Mutation/post';
import { Query } from './Query';

export const resolvers = {
  Query,
  Mutation: {
    ...auth,
    ...post,
  },
  AuthPayload,
  Post: {
    category: {
      fragment: 'fragment PostFragment on Post { categoryName }',
      resolve: (source, args, context, info) => {
        return {
          name: source.categoryName,
          popularity: Math.random(),
        };
      },
    },
  },
};
export const fragmentReplacements = extractFragmentReplacements(resolvers);
