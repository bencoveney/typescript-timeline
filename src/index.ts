import { Timeline } from "vis";

const typescriptRelease: any[] = require("./typescript-releases.json");

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

const githubReleases = typescriptRelease
  .filter(release => !release.prerelease)
  .map(release => ({
    content: release.tag_name,
    start: release.created_at
  }));

const ideReleases = [
  {
    content: "Visual Studio 2013 Update 2",
    start: "April 2, 2014"
  },
  {
    content: "TypeScript 1.0 Tools for Visual Studio 2012",
    start: "02/04/2014, 23:17:48"
	},
	{
		content: "Eclipse plugin",
		start: "2013-07-31 15:32"
	},
	{
		content: "ts-node REPL",
		start: "15 Jul 2015"
	},
	{
		content: "atom-typescript",
		start: "21 Jun 2014"
	}
];

const miscEvents = [{
	content: "",
	start: ""
}];

const options = {
  height: "100%",
  maxHeight: "100%"
};

const data = preGithubReleases
  .concat(githubReleases)
	.concat(ideReleases)
	.concat(miscEvents)
  .map((buh, index) => ({ ...buh, id: index }));

new Timeline(document.body, data, options);
