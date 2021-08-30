import {RepoData, file} from './types'

export const randomHash = (lim: number = 5) => {
 return ((Math.floor(new Date().getTime() / ((Math.floor(Math.random() * 50) + 1)))) % (10 ** lim)).toString() 
}

export const makeFile = () => {
  return {
    value: 0,
    hash: randomHash(3)
  }
}

export const ShowHideCSS: React.FC<{
    variable: JSX.Element | JSX.Element[];
    show: boolean
}> = ({variable, show}) => {
    return <div style={{
        display: (show ? 'block' : 'none')
    }} className="show-hide-css-wrapper">
        {variable}
    </div>
}

export function InitRepo(name: string, author: string): RepoData {
    let files = Array(5).fill(0).map(_ => makeFile());
    const obj = {
      metaData: {
        name,
        author,
        date: new Date().toString(),
        hash: randomHash()
      },
      head: null,
      branches: {
        master: null,
      },
      fs: { file: JSON.parse(JSON.stringify(files)) },
      stage: { file: JSON.parse(JSON.stringify(files)) },
    };
    return obj;
  }