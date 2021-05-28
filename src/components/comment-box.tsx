import * as React from 'react';

export function CommentBox(): JSX.Element {

  return (
    <tr>
      <td colSpan={2} />
      <td>
        <form method="post" action="comment">
          <input type="hidden" name="parent" value="15237896" />
          <input type="hidden" name="goto" value="item?id=15237896" />
          <input type="hidden" name="hmac" value="02641d0660c89c1a83ccf0d171e42497d10d2135" />
          <br />
          <p style={{ color: '#FF6600', fontSize: '16px', fontWeight: 'bold' }}>
            Comment Feature is Disabled.
          </p>
          <br />
          <textarea name="text" rows={6} cols={60} disabled />
          <br />
          <br />
          <input type="submit" value="add comment" disabled />
        </form>
      </td>
    </tr>
  );
}
