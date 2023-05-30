<script lang="ts">
  // adapted from https://github.com/cubedhuang/discord-embed-creator/blob/main/src/components/DiscordEmbed.tsx
  import type { APIEmbed, APIEmbedField } from "discord-api-types/v10";

  export let embed: APIEmbed;

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

    const fieldGridCols: string[] = [];

    for (const row of fieldRows) {
      const step = 12 / row.length;
      for (let i = 1; i < 13; i += step) {
        fieldGridCols.push(`${i}/${i + step}`);
      }
    }
  }
</script>

<div class="embed-container" style:border-left-color={embed.color || "#202225"}>
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
        className={`min-w-0 text-white inline-block font-semibold col-[1/1] mt-2 ${
          embed.url ? "hover:underline text-[#00b0f4]" : "cursor-text"
        }`}
      >
        <Markdown type="header">{embed.title}</Markdown>
      </a>
    {/if}

    {#if embed.description}
      <div className="min-w-0 text-sm font-normal whitespace-pre-line col-[1/1] mt-2">
        <Markdown>{embed.description}</Markdown>
      </div>
    {/if}

    {#if embed.fields.length}
      <div className="min-w-0 grid col-[1/1] mt-2 gap-2">
        {#each embed.fields as field, index}
          <div
            key={index}
            className="min-w-0 text-sm leading-[1.125rem] font-normal"
            style={{ gridColumn: fieldGridCols[index] }}
          >
            <div className="min-w-0 text-white font-semibold mb-0.5">
              <Markdown type="header">
                {field.name}
              </Markdown>
            </div>

            <div className="min-w-0 font-normal whitespace-pre-line">
              <Markdown>{field.value}</Markdown>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if embed.image}
      <div
        className={`min-w-0 block mt-4 max-w-[400px] max-h-[300px] justify-self-start rounded cursor-pointer overflow-hidden ${
          embed.thumbnail ? "col-[1/3]" : "col-[1/1]"
        }`}
      >
        <img className="object-contain max-h-full max-w-full" src={embed.image} alt={embed.image} />
      </div>
    {/if}

    {#if embed.thumbnail}
      <div
        className="min-w-0 row-[1/8] col-[2/2] mt-2 ml-4 shrink-0 justify-self-end block max-w-20 max-h-20 rounded-[3px] cursor-pointer overflow-hidden"
      >
        <img
          className="object-contain max-h-full max-w-full"
          src={embed.thumbnail}
          alt={embed.thumbnail}
        />
      </div>
    {/if}

    {#if embed.footer.text || embed.footer.iconUrl}
      <div
        className={`min-w-0 flex items-center mt-2 row-auto ${
          embed.thumbnail ? "col-[1/3]" : "col-[1/1]"
        }`}
      >
        {#if embed.footer.iconUrl}
          <img
            className="h-5 w-5 rounded-full mr-2 object-contain"
            src={embed.footer.iconUrl}
            alt=""
          />
        {/if}

        <div className="min-w-0 text-xs font-medium">
          {embed.footer.text}
          {#if embed.footer.text && embed.timestamp}
            <span className="inline-block mx-1"> &bull; </span>
          {/if}
          {embed.timestamp ? "Today at 12:00 PM" : null}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .embed-container {
    border-left-width: 4px;
    border-style: solid;
    position: relative;
    display: grid;
    width: fit-content;
    max-width: 520px;
    box-sizing: border-box;
    border-radius: 0.25rem;
    line-height: 1.375rem;
    background: #2f3136;
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
  }
  .embed-author-text:not(.has-url) {
    cursor: text;
  }
  .embed-author-text.has-url:hover {
    text-decoration: underline;
  }
</style>
