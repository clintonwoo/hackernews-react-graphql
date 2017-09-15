import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'react-apollo';

import Comment from './Comment';

const Comments = (props) => {
  const rows = [];
  props.newsItem.comments.forEach((rootComment) => {
    rows.push(<Comment
      key={rootComment.id}
      parentId={props.newsItem.id}
      indentationLevel={0}
      {...rootComment}
    />);
    rootComment.comments.forEach((one) => {
      rows.push(<Comment
        key={one.id}
        parentId={one.parent}
        indentationLevel={1}
        {...one}
      />);
    });
  });
  
  return (
    <table className="comment-tree" style={{ border: '0' }} >
      <tbody>
        { rows }
      </tbody>
    </table>
  );
}
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
        ...Comment
      }
      ...Comment
    }
    ${Comment.fragments.comment}
  `,
};
// comments {
//   id
//   ...Comment
// }
// ...Comment
// comments {
//   ...Comment
// }
export default Comments;
