import { Timeline, DataSet } from "vis";

const typescriptRelease: any[] = require("../data/releases.json");

const preGithubReleases = [
  {
    content: "v0.8",
    start: "October 1, 2012"
  },
  {
    content: "v0.9",
    start: "June 18, 2013"
  }
];

const periods = [];

const githubReleases = typescriptRelease
  .filter(release => !release.prerelease)
  .map<any>(release => ({
    content: (release.tag_name as string).substr(0, 4),
    start: release.created_at
  }));

const openSource: any[] = require("../data/open-source.json");
const asyncAwait: any[] = require("../data/async-await.json");
const decorators: any[] = require("../data/decorators.json");
const typings: any[] = require("../data/typings.json");

let groups = new DataSet();
function createGroup(name: string, items: any[], stalk: boolean) {
  const id = 10 - groups.length;
  groups.add({
    id,
    content: name
  });
  return items.map(item => ({
    ...item,
    group: id,
    type: "box",
    className: stalk ? "stalk" : "nostalk"
  }));
}

const options = {
  height: "100%",
  maxHeight: "100%",
  groupOrder: "id",
  min: new Date(2012, 0, 1),
  max: new Date(2019, 2, 1)
};

const items = createGroup("releases", preGithubReleases.concat(githubReleases), true)
  .concat(createGroup("openSource", openSource, false))
  .concat(createGroup("asyncAwait", asyncAwait, false))
  .concat(createGroup("decorators", decorators, false))
  .concat(createGroup("typings", typings, false))
  .concat([
    {
      content: "Sporadic Releases",
      start: "2012-10-01",
      end: "2016-05-01",
      type: "background"
    },
    {
      content: "Minor Release Every 2 Months",
      start: "2016-09-01",
      end: "2019-01-01",
      type: "background"
    }
  ])
  .map((item, index) => ({ ...item, id: index }));

const timeline = new Timeline(document.body, items, options);
// timeline.setOptions(options);
timeline.setGroups(groups);
// timeline.setItems(items);
