<script lang="ts">
  import { DiscordDarkTheme, themeString, type DiscordTheme } from "./Theme";

  // adapted from https://github.com/cubedhuang/discord-embed-creator/blob/main/src/components/DiscordEmbed.tsx
  import type { APIEmbed, APIEmbedField } from "discord-api-types/v10";
  import Markdown from "markdown.svelte";
  import type { MarkdownRenderingContext } from "./utils";

  /** The embed JSON to render. */
  export let embed: APIEmbed;
  /** Theme to use for the message rendering. Defaults to `DiscordDarkTheme`. */
  export let theme: DiscordTheme = DiscordDarkTheme;
  /** Object with users and channels to use for markdown parsing. */
  export let context: MarkdownRenderingContext = {};

  let fieldGridCols: string[] = [];
  $: {
    const fieldRows: APIEmbedField[][] = [];

    for (const field of embed.fields || []) {
      if (
        // If there are no rows
        fieldRows.length === 0 ||
        // Or the current field is not inline
        !field.inline ||
        // Or the previous row's field is not inline
        !fieldRows[fieldRows.length - 1][0].inline ||
        // Or the previous row's number of fields is at least 3
        fieldRows[fieldRows.length - 1].length >= 3
      ) {
        // Start a new row
        fieldRows.push([field]);
      } else {
        // Otherwise, add the field to the last row
        fieldRows[fieldRows.length - 1].push(field);
      }
    }

    const newcols: string[] = [];
    for (const row of fieldRows) {
      const step = 12 / row.length;
      for (let i = 1; i < 13; i += step) {
        newcols.push(`${i}/${i + step}`);
      }
    }
    fieldGridCols = newcols;
  }
</script>

<div
  class="embed-container"
  style={themeString(theme)}
  style:border-color={embed.color?.toString(16).padStart(6, "0").padStart(7, "#") || ""}
>
  <div class="embed-inner">
    {#if embed.author?.name || embed.author?.icon_url}
      <div class="embed-author">
        {#if embed.author.icon_url}
          <img
            class="embed-author-image"
            src={embed.author.icon_url}
            alt=""
            crossorigin="anonymous"
          />
        {/if}

        <a
          href={embed.author.url || undefined}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          class="embed-author-text {embed.author.url ? 'has-url' : ''}"
        >
          {embed.author.name}
        </a>
      </div>
    {/if}

    {#if embed.title}
      <a
        href={embed.url || undefined}
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        class="embed-title {embed.url ? 'has-url' : ''}"
      >
        <Markdown content={embed.title} {theme} {context} type="header" />
      </a>
    {/if}

    {#if embed.description}
      <div class="embed-description">
        <Markdown content={embed.description} {theme} {context} />
      </div>
    {/if}

    {#if embed.fields?.length}
      <div class="embed-fields">
        {#each embed.fields as field, index (index)}
          <div class="embed-field" style:grid-column={fieldGridCols[index]}>
            <div class="embed-field-title">
              <Markdown content={field.name} {theme} {context} type="header" />
            </div>
            <div class="embed-field-content">
              <Markdown content={field.value} {theme} {context} />
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if embed.image?.url}
      <div class="embed-image" style:grid-column={embed.thumbnail?.url ? "1/3" : "1/1"}>
        <img src={embed.image.url} alt={embed.image.url} />
      </div>
    {/if}

    {#if embed.thumbnail?.url}
      <div class="embed-thumbnail">
        <img src={embed.thumbnail.url} alt={embed.thumbnail.url} />
      </div>
    {/if}

    {#if embed.footer?.text || embed.footer?.icon_url || embed.timestamp}
      <div class="embed-footer" style:grid-column={embed.thumbnail?.url ? "1/3" : "1/1"}>
        {#if embed.footer?.icon_url}
          <img class="embed-footer-image" src={embed.footer.icon_url} alt="" />
        {/if}

        <div class="embed-footer-content">
          {#if embed.footer?.text}
            {embed.footer.text}
          {/if}
          {#if embed.footer?.text && embed.timestamp}
            <span class="embed-footer-split">&bull;</span>
          {/if}
          {#if embed.timestamp}
            {new Date(embed.timestamp).toLocaleString()}
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .embed-container {
    border-left: 4px solid var(--backgroundTertiary);
    position: relative;
    display: grid;
    width: fit-content;
    max-width: 520px;
    box-sizing: border-box;
    border-radius: 0.25rem;
    line-height: 1.375rem;
    background: var(--backgroundSecondary);
    margin-top: 0.125rem;
    margin-bottom: 0.125rem;
  }
  .embed-inner {
    overflow: hidden;
    padding: 0.5rem 1rem 1rem 0.75rem;
    display: inline-grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
  }

  .embed-author {
    min-width: 0px;
    display: flex;
    align-items: center;
    grid-column: 1/1;
    margin-top: 0.5rem;
  }
  .embed-author-image {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    object-fit: contain;
  }
  .embed-author-text {
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
    text-decoration: none;

    &:not(.has-url) {
      cursor: text;
    }
    &.has-url:hover {
      text-decoration: underline;
    }
  }

  .embed-title {
    grid-column: 1/1;
    display: inline-block;
    margin-top: 0.5rem;
    font-weight: 600;
    min-width: 0;
    text-decoration: none;

    &:not(.has-url) {
      cursor: text;
    }
    &.has-url {
      color: var(--link);
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .embed-description {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 400;
    white-space: pre-line;
    min-width: 0;
    grid-column: 1/1;
  }

  .embed-fields {
    display: grid;
    margin-top: 0.5rem;
    min-width: 0;
    gap: 0.5rem;
    grid-column: 1/1;
  }
  .embed-field {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 400;
    min-width: 0;
  }
  .embed-field-title {
    margin-bottom: 0.125rem;
    color: #ffffff;
    font-weight: 600;
    min-width: 0;
  }
  .embed-field-content {
    font-weight: 400;
    white-space: pre-line;
    min-width: 0;
  }

  .embed-image {
    display: block;
    overflow: hidden;
    margin-top: 1rem;
    justify-self: start;
    min-width: 0;
    border-radius: 0.25rem;
    cursor: pointer;
    max-width: 400px;
    max-height: 300px;

    img {
      object-fit: contain;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .embed-thumbnail {
    display: block;
    overflow: hidden;
    margin-top: 0.5rem;
    margin-left: 1rem;
    justify-self: end;
    min-width: 0;
    max-width: 5rem;
    max-height: 5rem;
    cursor: pointer;
    grid-row: 1/8;
    grid-column: 2/2;
    border-radius: 3px;

    img {
      object-fit: contain;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .embed-footer {
    display: flex;
    margin-top: 0.5rem;
    align-items: center;
    min-width: 0;
    grid-row: auto;
  }
  .embed-footer-image {
    object-fit: contain;
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 9999px;
  }
  .embed-footer-content {
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 500;
    min-width: 0;
  }
  .embed-footer-split {
    display: inline-block;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
</style>
