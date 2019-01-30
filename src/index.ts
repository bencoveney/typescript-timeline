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

const githubReleases = typescriptRelease
  .filter(release => !release.prerelease)
  .map(release => ({
    content: release.tag_name,
    start: release.created_at
  }));

const openSource: any[] = require("../data/open-source.json");
const asyncAwait: any[] = require("../data/async-await.json");
const decorators: any[] = require("../data/decorators.json");
const typings: any[] = require("../data/typings.json");

let groupCount = 0;
let groups = new DataSet();
function createGroup(name: string, items: any[]) {
  const id = groups.length + 1;
  groups.add({
    id,
    content: name
  });
  return items.map(item => ({ ...item, group: id, type: "box" }));
}

/*
  Groups

  var now = moment().minutes(0).seconds(0).milliseconds(0);
  var groupCount = 3;
  var itemCount = 20;

  // create a data set with groups
  var names = ['John', 'Alston', 'Lee', 'Grant'];
  var groups = new vis.DataSet();
  for (var g = 0; g < groupCount; g++) {
    groups.add({id: g, content: names[g]});
  }

  // create a dataset with items
  var items = new vis.DataSet();
  for (var i = 0; i < itemCount; i++) {
    var start = now.clone().add(Math.random() * 200, 'hours');
    var group = Math.floor(Math.random() * groupCount);
    items.add({
      id: i,
      group: group,
      content: 'item ' + i +
          ' <span style="color:#97B0F8;">(' + names[group] + ')</span>',
      start: start,
      type: 'box'
    });
  }

  // create visualization
  var container = document.getElementById('visualization');
  var options = {
    groupOrder: 'content'  // groupOrder can be a property name or a sorting function
  };

  var timeline = new vis.Timeline(container);
  timeline.setOptions(options);
  timeline.setGroups(groups);
  timeline.setItems(items);
*/

/*
  Background areas

  var items = new vis.DataSet([
    {id: 'A', content: 'Period A', start: '2014-01-16', end: '2014-01-22', type: 'background'},
    {id: 'B', content: 'Period B', start: '2014-01-25', end: '2014-01-30', type: 'background', className: 'negative'},
    {id: 1, content: 'item 1<br>start', start: '2014-01-23'},
    {id: 2, content: 'item 2', start: '2014-01-18'},
    {id: 3, content: 'item 3', start: '2014-01-21'},
    {id: 4, content: 'item 4', start: '2014-01-19', end: '2014-01-24'},
    {id: 5, content: 'item 5', start: '2014-01-28', type:'point'},
    {id: 6, content: 'item 6', start: '2014-01-26'}
  ]);

  var container = document.getElementById('visualization');
  var options = {
    start: '2014-01-10',
    end: '2014-02-10',
    editable: true
  };

  var timeline = new vis.Timeline(container, items, options);
*/

const options = {
  height: "100%",
  maxHeight: "100%",
  groupOrder: "content"
};

const items = new DataSet();
createGroup("releases", preGithubReleases.concat(githubReleases))
  .concat(createGroup("openSource", openSource))
  .concat(createGroup("asyncAwait", asyncAwait))
  .concat(createGroup("decorators", decorators))
  .concat(createGroup("typings", typings))
  .map((item, index) => ({ ...item, id: index }))
  .forEach(item => items.add(item));


const timeline = new Timeline(document.body, items, options);
// timeline.setOptions(options);
timeline.setGroups(groups);
// timeline.setItems(items);
