import type { RuleTypesExtended } from "discord-markdown-parser";
import hljs from "highlight.js";
import type { ASTNode, SingleASTNode } from "simple-markdown";
import twemoji from "twemoji";

export function escapeHTML(html: string): string {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export type MarkdownRenderingContext = Partial<{
  channel(id: string): { name: string } | null;
  role(id: string): { name: string } | null;
  user(id: string): { username: string } | null;
}>;
export type MarkdownRenderingType = "content" | "reply" | "header";

export function renderMarkdown(
  parsed: ASTNode[],
  data: MarkdownRenderingContext = {},
  context: MarkdownRenderingType = "content"
): string {
  // adapted from https://github.com/ItzDerock/discord-html-transcripts/blob/master/src/generator/renderers/content.tsx
  const renderNodes = (nodes: ASTNode): string =>
    Array.isArray(nodes) ? nodes.map((node) => renderASTNode(node)).join("") : renderASTNode(nodes);

  function renderASTNode(node: SingleASTNode): string {
    if (!node) return "";

    const type = <RuleTypesExtended>node.type;

    switch (type) {
      case "text":
        return escapeHTML(node.content);

      case "link":
        return `<a href="${node.target}">${renderNodes(node.content)}</a>`;

      case "url":
      case "autolink":
        return `<a href="${node.target}" target="_blank" rel="noreferrer">${renderNodes(
          node.content
        )}</a>`;

      case "blockQuote":
        if (context == "reply") return renderNodes(node.content);
        return `<blockquote><span></span><div>${renderNodes(node.content)}</div></blockquote>`;

      case "br":
      case "newline":
        if (context == "reply") return " ";
        else if (context == "content") return "<br/>";
        else return "";

      case "channel": {
        if (context == "header") return renderNodes(node.content);
        const channel = data?.channel?.(node.id);
        return `<span mention>${channel ? `#${channel.name}` : `<#${node.id}>`}</span>`;
      }

      case "role": {
        if (context == "header") return renderNodes(node.content);
        const role = data?.role?.(node.id);
        return `<span mention>${role ? `@${role.name}` : `<@&${node.id}>`}</span>`;
      }

      case "user": {
        if (context == "header") return renderNodes(node.content);
        const user = data?.user?.(node.id);
        return `<span mention>${user ? `@${user.username}` : `<@${node.id}>`}</span>`;
      }

      case "here":
      case "everyone":
        if (context == "header") return renderNodes(node.content);
        return `<span mention>@${type}</span>`;

      case "codeBlock":
        if (context !== "reply") {
          const language = node.lang
            ? hljs.getLanguage(node.lang)
              ? node.lang
              : "plaintext"
            : "plaintext";
          return `<pre code><code class="hljs language-${language}">${
            hljs.highlight(node.content, { language }).value
          }</code></pre>`;
        }
        return `<code inline>${escapeHTML(node.content)}</code>`;

      case "inlineCode":
        return `<code inline>${escapeHTML(node.content)}</code>`;

      case "em":
        return `<em>${renderNodes(node.content)}</em>`;

      case "strong":
        return `<strong>${renderNodes(node.content)}</strong>`;

      case "underline":
        return `<u>${renderNodes(node.content)}</u>`;

      case "strikethrough":
        return `<s>${renderNodes(node.content)}</s>`;

      case "emoticon":
        return typeof node.content == "string"
          ? escapeHTML(node.content)
          : renderNodes(node.content);

      case "spoiler":
        return `<span spoiler onclick="this.classList.add('revealed')">${renderNodes(
          node.content
        )}</span>`;

      case "emoji":
      case "twemoji":
        if (context == "header") return renderNodes(node.content);
        //TODO: emoji
        /*return (
          <DiscordCustomEmoji
            name={node.name}
            url={parseDiscordEmoji(node as APIMessageComponentEmoji)}
            embedEmoji={context.type === RenderType.EMBED}
            largeEmoji={context._internal?.largeEmojis}
          />
        );*/
        return "";

      case "timestamp":
        // can adapt from https://github.com/ItzDerock/discord-components/blob/main/packages/core/src/components/discord-time/discord-time.tsx
        // later if needed
        if (context == "header") return renderNodes(node.content);
        return `<span spoiler class="revealed">${new Date(
          node.timestamp * 1000
        ).toLocaleString()}</span>`;

      default: {
        console.log(`Unknown node type: ${type}`, node);
        return typeof node.content == "string"
          ? escapeHTML(node.content)
          : renderNodes(node.content);
      }
    }
  }

  return parsed.map(renderNodes).join("");
}

export function parseDiscordEmoji(emoji: { id?: string; name: string; animated?: boolean }) {
  if (emoji.id)
    return `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`;

  const codepoints = twemoji.convert
    .toCodePoint(
      emoji.name.indexOf(String.fromCharCode(0x200d)) < 0
        ? emoji.name.replace(/\uFE0F/g, "")
        : emoji.name
    )
    .toLowerCase();

  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codepoints}.svg`;
}
