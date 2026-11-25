// Console easter egg: mirrors the homepage's raised D and O using CSS
// light-dark() so shading adapts automatically to DevTools light/dark mode.
(() => {
  const base = "font:11px/1.05 ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;";
  const tone = (l, d) => `${base}color:${l};color:light-dark(${l},${d})`;

  const shades = {
    1: ["█", "#a6a9ae", "#232528"],
    2: ["█", "#b8bbbf", "#2d2f33"],
    3: ["█", "#c8cacd", "#383a3e"],
    4: ["█", "#d5d7da", "#46484c"],
    5: ["█", "#e2e3e5", "#56595e"],
    6: ["█", "#ededef", "#686b70"],
    a: ["·", "#bcbfc4", "#141518"],
    b: ["░", "#9ea1a6", "#0d0e10"],
  };

  const art = `
  666666666666              666666666
  65555555555566          6655555555566
  6544444444444556      65544444444444556
  54444444444444455    5544444444444444455
  44444444444444444    4444444444444444444
  43333333333333334    4333333333333333334
 a33333333333333333a  a3333333333333333333a
 a2233333333333322aa  aa22333333333333322aa
 a22222222222222baaa  aaab2222222222222baaa
 a111111111111bbaaa    aaabb111111111bbaaa
 aabbbbbbbbbbbaaa        aaabbbbbbbbbaaa
 aaaaaaaaaaaaa              aaaaaaaaa`;

  const styles = [base];
  const body = art.replace(/([1-6ab])\1*/g, (run, k) => {
    const [glyph, light, dark] = shades[k];
    styles.push(tone(light, dark));
    return `%c${glyph.repeat(run.length)}`;
  });

  styles.push(tone("#5f6368", "#9aa0a6"));
  console.log(`%c${body}\n\n%c  David Ollerhead — https://davidollerhead.com`, ...styles);
})();
