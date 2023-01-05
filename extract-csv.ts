const titleRegex = new RegExp("^((# ).*)$", "i");
const metadataRegex = new RegExp("^(\\[_metadata_:tag]:-)(.*)$", "i");

const extractTitleRegex = new RegExp("(\\[.*]){1}", "i");
const extractUrlRegex = new RegExp("(\\(.*\\)){1}", "i");
const extractMetadataRegex = new RegExp("(#.*)", "i");

const ignoredFiles = [
  "000-migrating-monoliths-to-microservices.md",
  "010-possible-existing-tools.md",
  "020-migration-processes.md",
  "030-article-grouping.md",
  "040-tool-development.md",
];

type F = {
  url: string,
  title: string;
  metadata: Array<{type: string;value: string}>;
}

const files: Array<F> = [];

for await (const f of Deno.readDir("./research")) {
  if (f.isFile === false) {
    continue;
  }

  if (ignoredFiles.includes(f.name)) {
    continue;
  }

  const fileInfo = await getFileInfo(`./research/${f.name}`);
  files.push(fileInfo);
}

await outputAllFiles(files);
await outputAllApproaches(files);
await outputAllStatus(files);
await outputAllLanguages(files);

async function outputAllFiles(files: Array<F>) {
  const toWrite: string[] = [
    "url,name,approach,status,language",
  ]

  for (const {url, title, metadata} of files) {
    const approach = metadata.find(function ({type}) {
      return type === "#approach";
    })?.value || ""
    const status = metadata.find(function ({type}) {
      return type === "#status";
    })?.value || ""
    const language = metadata.find(function ({type}) {
      return type === "#language";
    })?.value || ""

    toWrite.push(`${url},"${title}",${approach},${status},${language}`)
  }

  await Deno.writeTextFile("files.csv", toWrite.join("\n"))
}

async function outputAllApproaches(files: Array<F>) {
  const approaches = new Map<string, Array<F>>();
  for (const file of files) {
    for (const {type, value} of file.metadata) {
      if (type === "#approach") {
        const f = approaches.get(value) || [];
        f.push(file);
        approaches.set(value, f);
      }
    }
  }
  const toWrite: string[] = []
  const keys: string[] = ["", ""];
  for (const key of approaches.keys()) {
    keys.push(key);
  }
  toWrite.push(keys.join(","));

  for (const file of files) {
    const line = [file.url, `"${file.title}"`];
    for (const value of approaches.values()) {
      const doesExist = value.find((needle) => needle.url === file.url)
      if (doesExist == null) {
        line.push("")
      } else {
        line.push("x")
      }
    }
    toWrite.push(line.join(","))
  }

  await Deno.writeTextFile("approaches.csv", toWrite.join("\n"))
}

async function outputAllStatus(files: Array<F>) {
  const status = new Map<string, Array<F>>();
  for (const file of files) {
    for (const {type, value} of file.metadata) {
      if (type === "#status") {
        const f = status.get(value) || [];
        f.push(file);
        status.set(value, f);
      }
    }
  }
  const toWrite: string[] = []
  const keys: string[] = ["", ""];
  for (const key of status.keys()) {
    keys.push(key);
  }
  toWrite.push(keys.join(","));

  for (const file of files) {
    const line = [file.url, `"${file.title}"`];
    for (const value of status.values()) {
      const doesExist = value.find((needle) => needle.url === file.url)
      if (doesExist == null) {
        line.push("")
      } else {
        line.push("x")
      }
    }
    toWrite.push(line.join(","))
  }

  await Deno.writeTextFile("status.csv", toWrite.join("\n"))
}

async function outputAllLanguages(files: Array<F>) {
  const languages = new Map<string, Array<F>>();
  for (const file of files) {
    for (const {type, value} of file.metadata) {
      if (type === "#language") {
        const f = languages.get(value) || [];
        f.push(file);
        languages.set(value, f);
      }
    }
  }
  const toWrite: string[] = []
  const keys: string[] = ["", ""];
  for (const key of languages.keys()) {
    keys.push(key);
  }
  toWrite.push(keys.join(","));

  for (const file of files) {
    const line = [file.url, `"${file.title}"`];
    for (const value of languages.values()) {
      const doesExist = value.find((needle) => needle.url === file.url)
      if (doesExist == null) {
        line.push("")
      } else {
        line.push("x")
      }
    }
    toWrite.push(line.join(","))
  }

  await Deno.writeTextFile("languages.csv", toWrite.join("\n"))
}

async function getFileInfo(fileName: string) {
  const text = await Deno.readTextFile(fileName);
  let title = "";
  const metadataLines: string[] = [];
  for (const line of text.split("\n")) {
    if (metadataRegex.test(line) === true) {
      metadataLines.push(line);
    }
    if (titleRegex.test(line) === true) {
      title = line;
    }
  }
  const obj =  {url:cleanUrl(title), title: cleanTitle(title), metadata: cleanMetadata(metadataLines) };
  return obj;
}

function cleanUrl(title: string) {
  const cleanedUrl = extractUrlRegex.exec(title);
  if (cleanedUrl == null) {
    throw new Error();
  }
  const finalUrl = cleanedUrl[0].replace("(", "").replace(")", "");
  return finalUrl;
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
