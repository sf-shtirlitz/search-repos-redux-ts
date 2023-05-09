import { useState } from 'react';
import { useFetchRepositoriesQuery } from '../store/apis';
 
const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const { data, isFetching, error } = useFetchRepositoriesQuery(search);
 
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(term);
  };
 
  let content;
  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data?.objects.map((result: any, index: number) => {
      return (
        <div key={result.package.name}>
          {index + 1} - {result.package.name}
        </div>
      );
    });
  }
 
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      <div>{content}</div>
    </div>
  );
};
 
export default RepositoriesList;