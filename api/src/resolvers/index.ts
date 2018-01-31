import { extractFragmentReplacements } from 'prisma-binding';
import { Exercise, Locale, LocalizedStringVariation } from '../generated/prisma';
import { Context } from '../utils';
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
  Exercise: {
    name_string: {
      fragment: 'fragment ExerciseFragment on Exercise { name { variations { id, string, locale } } }',
      resolve: (source: Exercise, args, context: Context, info) => {
        console.log({source: JSON.stringify(source, null, 4)});
        // FIXME CHANGEME
        const userSelectedLocale: Locale = 'En_GB';
        const fallbackLocale: Locale = 'En_GB';

        const primary = source.name.variations
          .find(({ locale }) => locale === userSelectedLocale);
        const fallback = source.name.variations
          .find(({ locale }) => locale === fallbackLocale);

        return {
          string: primary ? primary.string : fallback.string,
          isFallback: !!primary,
          fallback,
        };
      },
    },
  },
};
export const fragmentReplacements = extractFragmentReplacements(resolvers);
