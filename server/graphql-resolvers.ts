import {debug} from 'debug';
import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';
import type {IResolvers} from 'graphql-tools';

import {NewsItemModel, CommentModel, UserModel} from '../src/data/models';
import type {CommentService} from './services/comment-service';
import type {FeedService} from './services/feed-service';
import type {NewsItemService} from './services/news-item-service';
import type {UserService} from './services/user-service';
import type {PrismaClient} from '@prisma/client';

const logger = debug('app:Graphql-Resolvers');
logger.log = console.log.bind(console);


export interface IGraphQlSchemaContext {
    commentService: CommentService;
    feedService: FeedService;
    newsItemService: NewsItemService;
    userService: UserService;
    userId: string | undefined;
    prisma: PrismaClient;
}

export const resolvers: IResolvers<any, IGraphQlSchemaContext> = {
    /*
      http://dev.apollodata.com/tools/graphql-tools/resolvers.html

      Resolver function signature:
        fieldName(obj, args, context, info) { result }

      obj: The object that contains the result returned from the
        resolver on the parent field, or, in the case of a top-level
        Query field, the rootValue passed from the server configuration.
        This argument enables the nested nature of GraphQL queries.

      context: This is an object shared by all resolvers in a particular
        query, and is used to contain per-request state, including
        authentication information, dataloader instances, and anything
        else that should be taken into account when resolving the query
    */

    /*          QUERY RESOLVERS        */

    Query: {
        async article(_, {id}, context): Promise<unknown | void> {
            return context.prisma.article.findUnique({
                where: {
                    id
                }
            })
        },

        async feed(root, {type, first, skip}, context): Promise<(unknown | void)[]> {
            const limit = first < 1 || first > 30 ? 30 : first; // Could put this constant limit of 30 items into config

            const articles = await context.prisma.article.findMany()

            return articles
        },

        async user(_, {zendeskId}, context): Promise<unknown | void> {
            logger('Me: userId:', zendeskId);

            return context.prisma.user.findFirst({
                where: {
                    zendeskId: zendeskId
                }
            })
        },

    },

    /*       MUTATION RESOLVERS       */

    Mutation: {
        async voteOnArticle(_, {articleId, userId, vote}, context): Promise<unknown> {
            await context.prisma.vote.create({
                data: {
                    value: vote,
                    articleId,
                    userId,
                }
            })

            const votes = await context.prisma.vote.findMany({
                where: {
                    articleId
                }
            })

            let sum = 0
            for (const v of votes) {
                sum += v.value
            }

            return context.prisma.article.update({
                where: {
                    id: articleId
                },
                data: {
                    score: sum / votes.length
                }
            })
        },

        async submitArticle(_, {title, url, description, userId}, context): Promise<unknown> {
            return context.prisma.article.create({
                data: {
                    url,
                    title,
                    description,
                    userId
                }
            })
        },
        async tagArticle(_, {articleId, userId, tag}, context): Promise<unknown> {
            return context.prisma.tag.create({
                data: {
                    text: tag,
                    articleId,
                    userId,
                }
            })
        },
        async initializeUser(_, {zendeskId}, context: IGraphQlSchemaContext): Promise<unknown> {
            const user = await context.prisma.user.findFirst({
                where: {
                    zendeskId
                }
            })
            if (user) return user

            return context.prisma.user.create({
                data: {
                    zendeskId
                }
            })
        }
    },

    /*       GRAPHQL TYPE RESOLVERS        */

    Date: new GraphQLScalarType({
        // http://dev.apollodata.com/tools/graphql-tools/scalars.html#Date-as-a-scalar
        name: 'Date',
        description: 'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
        parseValue(value): number {
            // Turn an input into a date which we want as a number
            // value from the client
            return new Date(value).valueOf();
        },
        serialize(value): number {
            // Convert Date to number primitive .getTime() or .valueOf()
            // value sent to the client
            return value instanceof Date ? value.valueOf() : value;
        },
        parseLiteral(ast): number | null {
            // ast value is always in string format
            // parseInt turns a string number into number of a certain base
            return ast.kind === Kind.INT ? parseInt(ast.value, 10) : null;
        },
    }),

    Article: {
        async user(article, _, context): Promise<unknown | void> {
            return context.prisma.user.findUnique({
                where: {
                    id: article.userId
                }
            })
        },
        async tags(article, _, context): Promise<unknown[]> {
            return context.prisma.tag.findMany({
                where: {
                    articleId: article.id
                }
            })
        },
        async votes(article, _, context): Promise<unknown[]> {
            return context.prisma.vote.findMany({
                where: {
                    articleId: article.id
                }
            })
        }
    },

    Vote: {
        async user(obj, _, context): Promise<unknown | void> {
            return context.prisma.user.findUnique({
                where: {
                    id: obj.userId
                }
            })
        },
        async article(obj, _, context): Promise<unknown | void> {
            return context.prisma.article.findUnique({
                where: {
                    id: obj.articleId
                }
            })
        },
    },

    Tag: {
        async user(obj, _, context): Promise<unknown | void> {
            return context.prisma.user.findUnique({
                where: {
                    id: obj.userId
                }
            })
        },
        async article(obj, _, context): Promise<unknown | void> {
            return context.prisma.article.findUnique({
                where: {
                    id: obj.articleId
                }
            })
        },
    },

    User: {
        async articles(user, _, context): Promise<unknown[]> {
            return context.prisma.article.findMany({
                where: {
                    userId: user.id
                }
            })
        },
        async votes(user, _, context): Promise<unknown[]> {
            return context.prisma.vote.findMany({
                where: {
                    userId: user.id
                }
            })
        },
        async tags(user, _, context): Promise<unknown[]> {
            return context.prisma.tag.findMany({
                where: {
                    userId: user.id
                }
            })
        },
    },
};
