import React from 'react';


const CommentBox = props => (
  <tr>
    <td colSpan="2" />
    <td>
      <form method="post" action="comment">
        <input type="hidden" name="parent" value="15237896" />
        <input type="hidden" name="goto" value="item?id=15237896" />
        <input type="hidden" name="hmac" value="02641d0660c89c1a83ccf0d171e42497d10d2135" />
        <textarea name="text" rows="6" cols="60" />
        <br />
        <br />
        <input type="submit" value="add comment" />
      </form>
    </td>
  </tr>
);

export default CommentBox;
