import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
const html = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);

test("demonstração permanece sem indexação e sem domínio fictício", async () => {
  assert.match(html, /name="robots" content="noindex, nofollow, noarchive"/);
  assert.match(
    await readFile(new URL("../dist/robots.txt", import.meta.url), "utf8"),
    /Disallow: \//,
  );
  assert.doesNotMatch(
    await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8"),
    /<loc>/,
  );
  assert.match(html, /não é o site oficial/);
});
test("conteúdo comercial confirmado, sem preços, equipe inventada ou horários divergentes", () => {
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  assert.equal(schema["@type"], "BeautySalon");
  assert.equal(schema.address.streetAddress, "Rua Xavantes, 564");
  assert.equal(schema.telephone, "+55-13-99600-5918");
  assert.equal(schema.openingHours, undefined);
  assert.equal(schema.employee, undefined);
  assert.equal(schema.aggregateRating, undefined);
  assert.doesNotMatch(html, /R\$|wa\.me\/000|example\.com/);
});
test("seções, links internos, CTA e semântica completos", () => {
  for (const id of [
    "inicio",
    "servicos",
    "sobre",
    "portfolio",
    "equipe",
    "contato",
  ])
    assert.match(html, new RegExp(`id="${id}"`));
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(html.includes(`id="${id}"`));
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /https:\/\/online\.maapp\.com\.br\/danymundorosabeauty/);
  assert.match(html, /5513996005918/);
  assert.match(html, /<dialog[^>]+aria-labelledby="photo-dialog-title"/);
});
test("assets locais, imagens acessíveis e documentação privada fora do dist", async () => {
  const resources = [...html.matchAll(/(?:src|href|data-full)="(\/[^"#?]+)"/g)].map(
    (match) => match[1],
  );
  for (const resource of new Set(resources))
    await access(new URL(`../dist${resource}`, import.meta.url));
  for (const [, attributes] of html.matchAll(/<img\b([^>]+)>/g)) {
    assert.match(attributes, /alt="[^"]*"/);
    if (!attributes.includes('id="dialog-image"'))
      assert.match(attributes, /width="\d+"/);
  }
  assert.ok(
    (await readdir(new URL("../dist", import.meta.url))).every(
      (file) => !file.endsWith(".md") && file !== ".env",
    ),
  );
});
