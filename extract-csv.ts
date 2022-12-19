const allFiles = await Deno.readDir("./research");

const tileRegex = new RegExp("^((# ).*)$", "i");
const metadataRegex = new RegExp("^(\\[_metadata_:tag]:-)(.*)$", "i");

const extractTitleRegex = new RegExp("(\\[.*]){1}", "i");
const extractMetadataRegex = new RegExp("(#.*)", "i");

const ignoredFiles = [
  "000-migrating-monoliths-to-microservices.md",
  "010-possible-existing-tools.md",
  "020-migration-processes.md",
  "030-article-grouping.md",
  "040-tool-development.md",
];

const files: Array<{
  title: string;
  metadata: Array<{type: string;value: string}>;
}> = [];

for await (const f of allFiles) {
  if (f.isFile === false) {
    continue;
  }

  if (ignoredFiles.includes(f.name)) {
    continue;
  }

  const fileInfo = await getFileInfo(`./research/${f.name}`);
  files.push(fileInfo);
}

const toWrite: string[] = [
  "name,approach,status,language",
]

for (const {title, metadata} of files) {
  const approach = metadata.find(function ({type}) {
    return type === "#approach";
  })?.value || ""
  const status = metadata.find(function ({type}) {
    return type === "#status";
  })?.value || ""
  const language = metadata.find(function ({type}) {
    return type === "#language";
  })?.value || ""

  toWrite.push(`"${title}",${approach},${status},${language}`)
}

await Deno.writeTextFile("out.csv", toWrite.join("\n"))

async function getFileInfo(fileName: string) {
  const text = await Deno.readTextFile(fileName);
  let title = "";
  const metadataLines: string[] = [];
  for (const line of text.split("\n")) {
    if (metadataRegex.test(line) === true) {
      metadataLines.push(line);
    }
    if (tileRegex.test(line) === true) {
      title = line;
    }
  }
  return { title: cleanTitle(title), metadata: cleanMetadata(metadataLines) };
}

function cleanTitle(title: string) {
  const cleanedTitle = extractTitleRegex.exec(title);
  if (cleanedTitle == null) {
    throw new Error();
  }
  const finalTitle = cleanedTitle[0].replace("[", "").replace("]", "");
  return finalTitle;
}

function cleanMetadata(metadatas: string[]) {
  const cleanedMetadatas: Array<{type: string, value: string}> = [];
  for (const metadata of metadatas) {
    const cleanedMetadata = extractMetadataRegex.exec(metadata);
    if (cleanedMetadata == null) {
      throw new Error();
    }

    const [type, ...rest] = cleanedMetadata[0].split("-")
    cleanedMetadatas.push({
      type,
      value: rest.join("-")
    })

  }
  return cleanedMetadatas;
}
