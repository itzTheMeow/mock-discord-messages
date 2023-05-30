<script lang="ts">
  import Message from "../src/Message.svelte";
  import MessageEmbed from "../src/MessageEmbed.svelte";
  import { DiscordDarkTheme } from "../src/Theme";

  document.body.style.background = DiscordDarkTheme.background;
  document.body.style.color = DiscordDarkTheme.text;
</script>

<div style="margin-bottom: 3rem">This is a library demo.</div>

<Message
  author={{
    username: "Meow",
    color: "#ff9100",
  }}
  content=""
  timestamp="Today at {new Date().toLocaleTimeString()}"
>
  <MessageEmbed
    embed={{
      author: {
        name: "Info",
        url: "https://example.com",
      },
      title: "Example Title",
      url: "https://example.com",
      description:
        "This is an example description. Markdown works too!\n\nhttps://automatic.links\n> Block Quotes\n```\nCode Blocks\n```\n*Emphasis* or _emphasis_\n`Inline code` or ``inline code``\n[Links](https://example.com)\n<@123>, <@!123>, <#123>, <@&123>, @here, @everyone mentions\n||Spoilers||\n~~Strikethrough~~\n**Strong**\n__Underline__",
      fields: [
        {
          name: "Field Name",
          value: "This is the field value.",
        },
        {
          name: "The first inline field.",
          value: "This field is inline.",
          inline: true,
        },
        {
          name: "The second inline field.",
          value: "Inline fields are stacked next to each other.",
          inline: true,
        },
        {
          name: "The third inline field.",
          value: "You can have up to 3 inline fields in a row.",
          inline: true,
        },
        {
          name: "Even if the next field is inline...",
          value: "It won't stack with the previous inline fields.",
          inline: true,
        },
      ],
      image: {
        url: "https://cubedhuang.com/images/alex-knight-unsplash.webp",
      },
      thumbnail: {
        url: "https://dan.onl/images/emptysong.jpg",
      },
      color: parseInt("00b0f4", 16),
      footer: {
        text: "Example Footer",
        icon_url: "https://slate.dan.onl/slate.png",
      },
      timestamp: new Date(1685162398188).toString(),
    }}
  />
</Message>
<Message
  author={{ username: "Codeblock Test" }}
  content={`\`\`\`makefile
# Makefile

BUILDDIR      = _build
EXTRAS       ?= $(BUILDDIR)/extras

.PHONY: main clean

main:
    @echo "Building main facility..."
    build_main $(BUILDDIR)

clean:
    rm -rf $(BUILDDIR)/*
\`\`\``}
/>

<style>
  /*
    Load GG Sans fonts from external host.
    You probably shouldn't use these in your own project, as they're not open source.
  */
  @font-face {
    font-family: "gg sans";
    src: url("https://file.coffee/u/5OdnQVkcDYPdUkiv0rIe5.woff2");
    font-weight: normal;
  }
  @font-face {
    font-family: "gg sans";
    src: url("https://file.coffee/u/98vDNq1qAGs5u42DLCItB.woff2");
    font-weight: 500;
  }
  @font-face {
    font-family: "gg sans";
    src: url("https://file.coffee/u/7kEfaQmxd95cgQtFToAwK.woff2");
    font-weight: 700;
  }
</style>
