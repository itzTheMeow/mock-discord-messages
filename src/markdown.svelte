<script lang="ts">
  import parseMarkdown from "discord-markdown-parser";
  import "highlight.js/styles/base16/helios.css";
  import { DiscordDarkTheme, themeString, type DiscordTheme } from "./Theme";
  import "./markdown.scss";
  import {
    renderMarkdown,
    type MarkdownRenderingContext,
    type MarkdownRenderingType,
  } from "./utils";

  export let content: string | undefined;
  export let context: MarkdownRenderingContext = {};
  export let type: MarkdownRenderingType = "content";
  export let theme: DiscordTheme = DiscordDarkTheme;
</script>

<span class="mdm-rendered-markdown" style={themeString(theme)}>
  {@html renderMarkdown(parseMarkdown(content || "", "extended"), context, type)}
</span>
