// Console easter egg: mirrors the homepage's raised D and recessed O using
// CSS light-dark() so shading adapts automatically to DevTools light/dark mode.
(() => {
  const base = "font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;line-height:1.05;";

  const palette = {
    "0": ["█", "#8e96a3", "#171a2b"],
    "1": ["█", "#a4acb8", "#21263d"],
    "2": ["█", "#b7bec9", "#2b324f"],
    "3": ["█", "#c7cdd6", "#353e61"],
    "4": ["█", "#d4d9e1", "#434f7a"],
    "5": ["█", "#dfe3ea", "#546496"],
    "6": ["█", "#eaeef3", "#6d80ba"],
    "a": ["·", "#b8bec8", "#0e1017"],
    "b": ["░", "#9da4b0", "#090a0f"],
  };

  const art = [
    "   6666666666                  0000",
    "   66555555555666          000001110000",
    "   654444444444456        001222222222100",
    "   6544444444444445      01222222222222210",
    "   54444444444444445    1223333333333333221",
    "   44333333333333344    2333333333333333322",
    "  a33333333333333333aa a4333333333333333344",
    "  a3333333333333333aaaaaa54444444444444445aa",
    "  a222222222222222baa  aaa655444444444556aa",
    "  a1222222222211bbba    aaba66665556666bba",
    "  aabbbbbbbbbbbbbaa      aaabbbbaabbbbbaa",
    "   aabbbbbbbbbaaa           aaaabbbaaaa",
    "     aaaaaaaa",
  ].join("\n");

  let fmt = "\n";
  const styles = [];
  let prev = null;

  for (const ch of art) {
    if (ch === "\n") {
      fmt += "\n";
      continue;
    }
    const token = palette[ch];
    const key = token ? ch : " ";
    if (key !== prev) {
      fmt += "%c";
      styles.push(
        token
          ? `${base}color:${token[1]};color:light-dark(${token[1]},${token[2]});`
          : base,
      );
      prev = key;
    }
    fmt += token ? token[0] : " ";
  }

  fmt += "\n\n%c  David Ollerhead — https://davidollerhead.com";
  styles.push(
    "font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;color:#5f6368;color:light-dark(#5f6368,#8994c2);",
  );

  console.log(fmt, ...styles);
})();
