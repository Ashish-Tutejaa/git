import { InitRepo } from "./Utils";
import { RepoData } from "./types";

export const TopBar: React.FC<{
  setRepositories: React.Dispatch<React.SetStateAction<RepoData[]>>;
  focusHook: [number, React.Dispatch<React.SetStateAction<number>>]
}> = ({ setRepositories, focusHook: [focus, setFocus] }) => {
  return (
    <div className="nav-wrapper">

      <button
        onClick={() => setRepositories((p) => {
          const newRepo: RepoData = InitRepo(`repo-${Math.floor(Math.random() * 420)}`, "you");
          return [...p, newRepo];
        })}
        children="Make a new repo" />

      {/* <button onClick={() => setFocus(null) }>
        {focus ? "Show All Repos" : "Show this Repo"}
      </button> */}

    </div>
  );
};
