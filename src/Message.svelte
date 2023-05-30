<script lang="ts">
  import { DiscordDarkTheme, type DiscordTheme } from "Theme";
  import Markdown from "markdown.svelte";
  import { type MarkdownRenderingContext } from "utils";

  /**
   * The author of this message.
   * @param username The username of the user.
   * @param avatarURL Optional avatar URL for the message. Default will use discord's logo.
   * @param color Optional username color.
   */
  export let author: { avatarURL?: string; color?: string; username: string };
  /** Message content to render. Can be left out and the element slot used instead. */
  export let content: string | undefined = undefined;
  /** The timestamp string to show for the message. Leave empty to omit. */
  export let timestamp: string | undefined = undefined;
  /** Theme to use for the message rendering. Defaults to `DiscordDarkTheme`. */
  export let theme: DiscordTheme = DiscordDarkTheme;
  /** Object with users and channels to use for markdown parsing. */
  export let context: MarkdownRenderingContext | undefined = undefined;
</script>

<div class="msg-container" style:background={theme.background} style:color={theme.text}>
  <img
    class="msg-avatar"
    src={author.avatarURL || "https://cdn.discordapp.com/embed/avatars/0.png"}
    crossorigin="anonymous"
  />
  <div class="msg-header">
    <span class="msg-username" style:color={author.color || "inherit"}>{author.username}</span>
    {#if timestamp}
      <span class="msg-timestamp" style:color={theme.textMuted}>
        {timestamp}
      </span>
    {/if}
  </div>
  <div class="msg-content">
    <Markdown {content} />
  </div>
</div>

<style>
  .msg-container {
    word-wrap: break-word;
    position: relative;
    padding-left: 72px;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
    /* Load a font called gg sans to use it. */
    font-family: "gg sans", "Roboto", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
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
  .msg-timestamp {
    font-size: 0.75rem;
    line-height: 1.375rem;
    color: var(--text-muted);
    vertical-align: baseline;
    display: inline-block;
    height: 1.25rem;
    cursor: default;
    pointer-events: none;
    font-weight: 500;
  }

  .msg-content {
    user-select: text;
    margin-left: -72px;
    padding-left: 72px;
    font-size: 1rem;
    line-height: 1.375rem;
    white-space: pre-wrap;
    white-space: break-spaces;
    word-wrap: break-word;
    user-select: text;
    overflow: hidden;
  }
</style>
