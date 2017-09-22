import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'react-apollo';

import Comment from './Comment';

const Comments = (props) => {
  const rows = [];
  function buildComment(comment, indent) {
    return (
      <Comment
        key={comment.id}
        parentId={comment.parent}
        indentationLevel={indent}
        {...comment}
      />
    );
  }
  props.newsItem.comments.forEach((rootComment) => {
    rows.push(buildComment(rootComment, 0));
    
    rootComment.comments.forEach((commentOne) => {
      rows.push(buildComment(commentOne, 1));

      commentOne.comments.forEach((commentTwo) => {
        rows.push(buildComment((commentTwo), 2));

        commentTwo.comments.forEach((commentThree) => {
          rows.push(buildComment(commentThree, 3));

          commentThree.comments.forEach((commentFour) => {
            rows.push(buildComment(commentFour, 4));
            
            commentFour.comments.forEach((commentFive) => {
              rows.push(buildComment(commentFive, 5));
            });
          });
        });
      });
    });
  });

  return (
    <table className="comment-tree" style={{ border: '0' }} >
      <tbody>
        { rows }
      </tbody>
    </table>
  );
};
Comments.propTypes = {
  newsItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      creationTime: PropTypes.number.isRequired,
      submitterId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};
Comments.fragments = {
  comment: gql`
    fragment Comments on Comment {
      id,
      comments {
        id,
        comments {
          id,
          comments {
            id,
            comments {
              id,
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

export default Comments;
