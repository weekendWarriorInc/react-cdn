 
import Ele from "/App/components/Ele.js";
import {data} from "/App/assets/data.js"
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
