import * as React from 'react';

import useSound from 'use-sound';

export function CommentBox(): JSX.Element {

  const [playActive] = useSound(
    '/click.mp3',
    { volume: 0.5 }
  );

  return (
    <tr>
      <td colSpan={2} />
      <td>
        <form method="post" onSubmit={() => playActive()} action="comment">
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
