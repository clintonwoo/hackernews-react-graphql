import * as React from 'react';
import gql from 'graphql-tag';

import { Comment } from './Comment';
import { NewsItem } from '../../data/models/news-item';

interface ICommentsProps {
  newsItem: NewsItem;
}

export const Comments: React.SFC<ICommentsProps> = props => {
  const rows = [];

  const renderComment = (comment, indent) => {
    return <Comment key={comment.id} parentId={comment.parent} indentationLevel={indent} {...comment} />;
  };

  props.newsItem.comments.forEach(rootComment => {
    rows.push(renderComment(rootComment, 0));

    rootComment.comments.forEach(commentOne => {
      rows.push(renderComment(commentOne, 1));

      commentOne.comments.forEach(commentTwo => {
        rows.push(renderComment(commentTwo, 2));

        commentTwo.comments.forEach(commentThree => {
          rows.push(renderComment(commentThree, 3));

          commentThree.comments.forEach(commentFour => {
            rows.push(renderComment(commentFour, 4));

            commentFour.comments.forEach(commentFive => {
              rows.push(renderComment(commentFive, 5));
            });
          });
        });
      });
    });
  });

  return (
    <table className="comment-tree" style={{ border: '0' }}>
      <tbody>{rows}</tbody>
    </table>
  );
};

Comments.propTypes = {
  newsItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        creationTime: PropTypes.number.isRequired,
        submitterId: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

Comments.fragments = {
  comment: gql`
    fragment Comments on Comment {
      id
      comments {
        id
        comments {
          id
          comments {
            id
            comments {
              id
              ...Comment
            }
            ...Comment
          }
          ...Comment
        }
        ...Comment
      }
      ...Comment
    }
    ${Comment.fragments.comment}
  `,
};
