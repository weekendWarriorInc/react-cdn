const { useState, useEffect } = React;

const Reacts = () => {
  const [val, setVal] = useState([]);
  const fetchData = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await response.json();
    setVal(data);
    return data;
  };
  useEffect( () => {
  
    fetchData()
    
  }, []);

  if (!val.length) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>    
        {val.map((item) => (
          <List key={item.id.toString()} item={item} />
        ))}
      </div>
    );
  }
};
const List = ({ item }) => {
  return (
    <div >
      <div className="id">{item.id}</div>
      <div className="title">{item.title}</div>
      <div className="body">{item.body}</div>
    </div>
  );
};

ReactDOM.render(<Reacts />, document.getElementById("app"));
