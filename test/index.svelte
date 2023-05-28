<script lang="ts">
  import Message from "../src/Message.svelte";
  import { DiscordDarkTheme } from "../src/Theme";

  document.body.style.background = DiscordDarkTheme.background;
  document.body.style.color = DiscordDarkTheme.text;
</script>

<div style="margin-bottom: 3rem">This is a library demo.</div>

<Message
  author={{
    username: "Meow",
    color: "rgb(56, 255, 0)",
    avatarURL:
      "https://cdn.discordapp.com/avatars/532045776122150913/40842a9c8b8b01d00d1093d0f34f0499.webp",
  }}
  content="need [inline](link) links"
  timestamp="Today at 1:47 PM"
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
