import React from 'react';

import Comment from './Comment';

const Component = props => (
  <table className="comment-tree" style={{ border: '0' }} >
    <tbody>
      <Comment />
    </tbody>
  </table>
);

export default Component;
