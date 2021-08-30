import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { DrawRepo } from "./DrawRepo";
import { Focus } from "./Focus";
import { Repository } from "./Repository";
import { TopBar } from "./TopBar";
import { RepoData } from "./types";
import { ShowHideCSS } from "./Utils";

function App() {
  const [repositories, setRepositories] = useState<RepoData[]>([]);
  const [focus, setFocus] = useState<number>(-1);
  const [showRepo, setShowRepo] = useState<boolean>(false);

  const memoizedRepos = useMemo(() => {
    console.log("REPOS:", repositories);
    return repositories.map((_, i) => {
      return (
        <Repository
          selected={focus === i}
          setFocus={() => {
            setFocus(i);
            return null;
          }}
        />
      );
    });
  }, [repositories, focus]);

  return (
    <div className="app-wrapper">
      <div className="control-wrapper">
        <TopBar
          focusHook={[focus, setFocus]}
          setRepositories={setRepositories}
        />

        <div className="board-wrapper">
          {showRepo && focus && <DrawRepo repo={focus == -1 ? focus : repositories[focus]} />}

          {repositories && (
            <ShowHideCSS show={!showRepo} variable={memoizedRepos} />
          )}
        </div>
      </div>

      <Focus repositoriesHook={[repositories, setRepositories]} setShowRepo={setShowRepo} repo={focus == -1 ? focus : repositories[focus]} />
    </div>
  );
}

export default App;
