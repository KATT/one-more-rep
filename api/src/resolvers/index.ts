import { extractFragmentReplacements } from 'prisma-binding';
import { Exercise, Locale, LocalizedString, LocalizedStringVariation } from '../generated/prisma';
import { Context, getUserLocale } from '../utils';
import { AuthPayload } from './AuthPayload';
import { auth } from './Mutation/auth';
import { post } from './Mutation/post';
import { Query } from './Query';

// TODO 🤔 prob not ideal to have hardcoded
const fallbackLocale: Locale = 'En_GB';

function localize(sourceName: string, fieldName: string) {
  const fragment = `
    fragment LocalizeFragment on ${sourceName} {
      ${fieldName} {
        variations {
          id
          string
          locale
        }
      }
    }
  `;

  return {
    [`${fieldName}_t`] : {
      fragment,
      resolve: (source, args, context: Context, info) => {
        const sourceString: LocalizedString = source[fieldName];
        const userSelectedLocale: Locale = getUserLocale(context);

        const primary = sourceString.variations.find(({ locale }) => locale === userSelectedLocale);
        const fallback = primary ? null : sourceString.variations
          .find(({ locale }) => locale === fallbackLocale) ||
          sourceString.variations.find(({string: text}) => !!text);

        return {
          string: primary ? primary.string : fallback.string,
          isFallback: !primary,
          fallback,
        };
      },
    },
  };
}

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
    ...localize('Exercise', 'name'),
  },
};
export const fragmentReplacements = extractFragmentReplacements(resolvers);
