import { RepoData, CommitNode } from "./types";

const PaintCommits: React.FC<{
  exits: RepoData["branches"];
}> = ({ exits }) => {
  let lists: { branch: string; commits: CommitNode[] }[] = Object.keys(
    exits
  ).map((x) => {
    let node = exits[x];
    let res: CommitNode[] = [];
    while (node !== null) {
      if (node) res.push({ ...node });
      node = node.prev;
    }
    return { branch: x, commits: res };
  });

  console.log(lists);

  return <div className="paint-commits-wrapper"></div>;
};

export const DrawRepo: React.FC<{
  repo: RepoData | number;
}> = ({ repo }) => {
  if (typeof repo == 'number') {
    return <div className="draw-no-repos-wrapper"></div>;
  } else 
    return (
      <div className="draw-repo-wrapper">
        <PaintCommits exits={repo.branches} />
      </div>
    );
};
