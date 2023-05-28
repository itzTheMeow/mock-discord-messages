import type { RuleTypesExtended } from "discord-markdown-parser";
import type { ASTNode, SingleASTNode } from "simple-markdown";

export function escapeHTML(html: string): string {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderMarkdown(
  parsed: ASTNode[],
  data?: {},
  context?: "content" | "reply"
): string {
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

        return ""; //TODO: quote

      case "br":
      case "newline":
        if (context == "reply") return " ";
        return "<br/>";

      case "channel": {
        const id: string = node.id;
        //const channel = await context.callbacks.resolveChannel(id);

        //TODO: get channel from data and render
        /*return (
          <DiscordMention
            type={
              channel ? (channel.isDMBased() ? "channel" : getChannelType(channel.type)) : "channel"
            }
          >
            {channel ? (channel.isDMBased() ? "DM Channel" : channel.name) : `<#${id}>`}
          </DiscordMention>
        );*/
        return "";
      }

      case "role": {
        const id: string = node.id;
        //const role = await context.callbacks.resolveRole(id);

        //TODO: get role from data and render
        /* return (
          <DiscordMention
            type="role"
            color={context.type === RenderType.REPLY ? undefined : role?.hexColor}
          >
            {role ? role.name : `<@&${id}>`}
          </DiscordMention>
        );*/
        return "";
      }

      case "user": {
        const id: string = node.id;
        //const user = await context.callbacks.resolveUser(id);

        //TODO: get user from data and render
        //return <DiscordMention type="user">{user ? user.username : `<@${id}>`}</DiscordMention>;
        return "";
      }

      case "here":
      case "everyone":
        //TODO: mention
        /*return (
          <DiscordMention type={"role"} highlight>
            {`@${type}`}
          </DiscordMention>
        );*/
        return "";

      case "codeBlock":
        if (context !== "reply") {
          //return <DiscordCodeBlock language={node.lang} code={node.content} />;
          //TODO: codeblock
          return "";
        }
        return `<code>${escapeHTML(node.content)}</code>`;

      case "inlineCode":
        return `<code>${escapeHTML(node.content)}</code>`;

      case "em":
        return `<i>${renderNodes(node.content)}</i>`;

      case "strong":
        return `<b>${renderNodes(node.content)}</b>`;

      case "underline":
        return `<u>${renderNodes(node.content)}</u>`;

      case "strikethrough":
        return `<s>${renderNodes(node.content)}</s>`;

      case "emoticon":
        return typeof node.content == "string"
          ? escapeHTML(node.content)
          : renderNodes(node.content);

      case "spoiler":
        //TODO: spoiler
        //return <DiscordSpoiler>{await renderNodes(node.content, context)}</DiscordSpoiler>;
        return "";

      case "emoji":
      case "twemoji":
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
        //TODO: timestamp
        //return <DiscordTime timestamp={parseInt(node.timestamp) * 1000} format={node.format} />;*/
        return "";

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
