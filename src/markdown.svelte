<script lang="ts">
  import { DiscordDarkTheme, themeString, type DiscordTheme } from "Theme";
  import parseMarkdown from "discord-markdown-parser";
  import "highlight.js/styles/base16/helios.css";
  import { renderMarkdown, type MarkdownRenderingContext, type MarkdownRenderingType } from "utils";
  import "./markdown.scss";

  export let content: string | undefined;
  export let context: MarkdownRenderingContext | undefined = undefined;
  export let type: MarkdownRenderingType = "content";
  export let theme: DiscordTheme = DiscordDarkTheme;
</script>

<span class="mdm-rendered-markdown" style={themeString(theme)}>
  {@html renderMarkdown(parseMarkdown(content || "", "extended"), context, type)}
</span>
