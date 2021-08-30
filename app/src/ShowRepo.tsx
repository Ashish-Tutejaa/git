import { useEffect, useState } from "react";
import { makeFile } from "./Utils";
import { file, RepoData } from "./types";

export const ShowRepo: React.FC<{
  repo: RepoData;
  setRepos: React.Dispatch<React.SetStateAction<RepoData[]>>;
}> = ({ repo, setRepos }) => {

  let [selectedForStage, setSelectedForStage] = useState<file[]>([]);
  let [toggleSelect, setToggleSelect] = useState<boolean>(false);

  useEffect(() => {
    if(!toggleSelect) {
      setSelectedForStage([]);
    }
  }, [toggleSelect]);

  let fs = repo.fs.file;
  let stage = repo.stage.file;

  console.log("reanimating...");
  console.table(fs);

  let stageFiles = () => {
    setRepos((p) => {
      return p.map(x => {
        if(x.metaData.hash === repo.metaData.hash) {
          let mapper: {[prop: string]: number} = {};
          let mapper2: {[prop: string] : number} = {};

          selectedForStage.forEach(x => {
            mapper[x.hash] = x.value;
          })

          console.log(mapper);
          x.stage.file = [...x.stage.file.map(x => {
            mapper2[x.hash] = 1;
            if(mapper[x.hash]) return {hash: x.hash, value: mapper[x.hash]};
            return x;
          }), ...selectedForStage.filter(x => !mapper2[x.hash])]
          console.log(x)
        }
        return JSON.parse(JSON.stringify(x));
      });
    })
    setToggleSelect(false);
  }

  let addFile = () => {
    setRepos((p) => {
      return JSON.parse(
        JSON.stringify(
          p.map((x) => {
            let y = { ...x };
            if (y.metaData.hash === repo.metaData.hash) {
              x.fs.file.push(makeFile());
            }
            return y;
          })
        )
      );
    });
  };

  let incrementFile = (index: number) => {
    console.log("MAKING INCREMENTING...", index);
    return () =>
      setRepos((p) => {
        console.log("INCREMENTING...", index);
        let newP = p.map((x) => {
          console.log(x.metaData.hash);
          console.log(repo.metaData.hash);
          if (x.metaData.hash === repo.metaData.hash) {
            x.fs.file[index].value++;
          }
          return x;
        });
        console.log(JSON.stringify(newP));
        return JSON.parse(JSON.stringify(newP));
      });
  };

  return (
    <div>
      <h1>
        {repo.metaData.name} | {repo.metaData.author}
      </h1>
      <h2>Working Directory</h2>
      <div className="change-cell-wrapper">
        {[
          ...fs.map((x, i) => {
            return (
              <div onClick={() => {
                if(!toggleSelect) 
                  incrementFile(i)()
                else 
                  setSelectedForStage(p => {
                    let y = [...p];
                    y = y.some(z => z.hash === x.hash) ? y.filter(z => z.hash !== x.hash) : (y.push(x), y);
                    return y;
                  })
              }} className={`change-cell ${selectedForStage.some(y => x.hash === y.hash) ? 'bg-blue' : ''}`}>
                {x.value}
              </div>
            );
          }),
          <div className="change-cell">
            <div onClick={() => addFile()}>add file</div>
            <div onClick={() => {
              if(!toggleSelect)
                setToggleSelect(p => !p)
              else stageFiles();
            }}>stage {toggleSelect ?  'selected' : 'files'}</div>
          </div>,
        ]}
      </div>
      <h2>Staging</h2>
      <div className="change-cell-wrapper">
        {[
          ...stage.map((x, i) => {
            return (
              <div
                onClick={incrementFile(i)}
                className="change-cell"
              >
                {x.value}
              </div>
            );
          }),
        <div className="change-cell">
          Commit
        </div>
        ]}
      </div>
      <h2>Head</h2>
      <h1>
        {repo.head
          ? repo.head.cur.commit.file.join(", ")
          : "There are no commits to show..."}
      </h1>
    </div>
  );
};
