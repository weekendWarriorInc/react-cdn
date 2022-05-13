 
import Ele from "/App/components/Ele.js";
import {data} from "/assets/data.js"
console.log(data)
const List = ({ item }) => {
    return (
      <div key={item.id.toString()}>
        <div className="id">{item.id}</div>
        <div className="title">{item.title}</div>
        <div className="body">{item.body}</div>
      </div>
    );
  };
  export default List
