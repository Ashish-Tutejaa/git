import { RepoData } from "./types";
import { ShowRepo } from "./ShowRepo";

export const Focus: React.FC<{
  repositoriesHook: [RepoData[], React.Dispatch<React.SetStateAction<RepoData[]>>];
  repo: RepoData | number;
  setShowRepo: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ repo, setShowRepo, repositoriesHook: [_, setRepos] }) => {

  if(typeof repo === 'number'){
    return <div className='no-focus-wrapper'>

    </div>
  }

  return <div className="focus-wrapper">
      <button onClick={() => setShowRepo(p => !p)}>Show/Hide Repo</button>
      <ShowRepo setRepos={setRepos} repo={repo} />
    </div>;
};
