
import { useState } from 'react';

function App() {


  const[data,setData] = useState([]);

  const apiCall = async () => {
    try {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then( (response) => response.json())
        .then( (data) => setData(data))
        .catch((err)=> console.err(err));
    } catch (error) {
        alert('failed to fetch data')
        // console.log(error);
    }
  }
  apiCall();



  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIdx = currentPage*recordPerPage;
  const firstIdx = lastIdx - recordPerPage;
  const records = data.slice(firstIdx,lastIdx);
  const numPages = Math.ceil(data.length/ recordPerPage);
  // const numbers = [...Array(numPages+1).keys()].slice(1);

  function prevPage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage-1);
    }
  }
  function nextPage(){
    if(currentPage !== numPages){
      setCurrentPage(currentPage+1);
    }
  }

  // function changePage(id){
  //   setCurrentPage(id);
  // }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody>
           { 
            records.map( (val,i)=>(
                <tr key={i}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.role}</td>
                </tr>
            ))}
        </tbody>
      </table>
      <nav>
        <ul>
          <li>
              <button onClick={prevPage}>Previous</button>
          </li>
          <li>{currentPage}</li>
           <li>
              <button onClick={nextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
