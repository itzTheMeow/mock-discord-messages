<script lang="ts">
  /**
   * The author of this message.
   * @param username The username of the user.
   * @param avatarURL Optional avatar URL for the message. Default will use discord's logo.
   * @param color Optional username color.
   */
  export let author: { avatarURL?: string; color?: string; username: string };
  /** The timestamp to show for the message. Leave empty to omit. */
  export let timestamp: Date | undefined = undefined;
</script>

<div class="msg-container">
  <img
    class="msg-avatar"
    src={author.avatarURL || "https://cdn.discordapp.com/embed/avatars/0.png"}
  />
  <h3 class="msg-header">
    <span class="msg-username" style:color={author.color || "inherit"}>{author.username}</span>
  </h3>
</div>

<style>
  .msg-container {
    word-wrap: break-word;
    position: relative;
    padding-left: 72px;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
  }

  .msg-avatar {
    position: absolute;
    left: 16px;
    margin-top: calc(4px - 0.125rem);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    flex: 0 0 auto;
    pointer-events: none;
    z-index: 1;
  }
  .msg-header {
    overflow: hidden;
    display: block;
    position: relative;
    line-height: 1.375rem;
    min-height: 1.375rem;
    white-space: break-spaces;
  }
  .msg-username {
    margin-right: 0.25rem;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.375rem;
    display: inline;
    vertical-align: baseline;
    position: relative;
    overflow: hidden;
  }
</style>
