export interface file{
  value: number;
  hash: string;
}

interface WorkingDirectory {
  file: file[];
}

interface StagingIndex {
  file: file[];
}

interface Commit {
  file: file[];
}

export interface CommitNode {
  hash: string;
  prev: null | CommitNode;
  next: null | CommitNode;
  cur: {
    commit: Commit;
  };
}

interface RepoMetaData {
  name: string;
  author: string;
  date: string;
  hash: string;
}

export interface RepoData {
  metaData: RepoMetaData;
  head: CommitNode | null;
  branches: {
    [branch: string]: CommitNode | null;
  };
  fs: WorkingDirectory;
  stage: StagingIndex;
}
