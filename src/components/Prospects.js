import { useState, useEffect } from "react";
import { AiOutlineSearch } from 'react-icons/ai';

import AddProspect from "./AddProspect";
import ROOT_URL from "../utils/constants";
import useFetch from "../customHooks/useFetch";
import Pagination from "./Pagination";

const initial_state = {
  allProspects: [],
  count: null,
  activePageIndex: 1,
}

function Prospects() {
  let [prospectState, setProspectState] = useState(initial_state);
  let [prospectsToShow, setProspectsToShow] = useState([]);
  let [apiError, setAPIError] = useState("");
  let [addProspect, setAddProspect] = useState(false);
  let [selectProspect, setSelectProspect] = useState("");

  let { makeApiCall } = useFetch();

  useEffect(() => {
    fetchProspects(ROOT_URL);
  }, [addProspect, prospectState.activePageIndex]);

  const fetchProspects = async (url=ROOT_URL, method="GET") => {
    let limit = 10;
    let offset = (prospectState.activePageIndex - 1) * 10;
    setSelectProspect("");
    let data = await makeApiCall(url+ `/?offset=${offset}&limit=${limit}` , method);
    if (data.prospects) {
      setProspectState({...prospectState, count: data.count, allProspects: data.prospects});
      setProspectsToShow(data.prospects);
    } else if (data.prospect === "Deleted successfully") {
      fetchProspects();
    } else{
      setAPIError(data.error);
    }
  }

  const getDate = (date) => {
    let newDate = new Date(date)
    return newDate.toLocaleDateString();
  }

  const handleChange = (event) => {
    if (event.target.value) {
      let final = prospectsToShow.filter((elm) => elm.name.toLowerCase().startsWith(event.target.value.toLowerCase()));
      setProspectsToShow(final);
    } else {
      setProspectsToShow(prospectState.allProspects);
    }
  }

  const handleRadio = (id) => {
    setSelectProspect(id);
  }

  const handleDelete = () => {
    if (selectProspect) {
      fetchProspects(ROOT_URL + "/" + selectProspect, "DELETE")
    }
  }

  const handleActivePageIndex = (index) => {
    setSelectProspect("");
    setSelectProspect("");
    setProspectState({...prospectState, activePageIndex: index})
  }

  if (!prospectState.allProspects.length) {
    return (
      <div className="spinner-border m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }
  return (
    <div className="list-holder">
      <div className="container">
        <h2 className="my-3 mb-3">Prospect Set</h2>
        <div className="d-flex justify-content-between py-2">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link active-tob" aria-current="page" href="/">Customer</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/event">Prospect Customer</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/email">Employee</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/compaign">Test Set</a>
            </li>
          </ul>
          <div className="">
            <label className="visually-hidden" htmlFor="autoSizingInputGroup">Username</label>
            <div className="input-group">
              <div className="input-group-text"><AiOutlineSearch /></div>
              <input onChange={handleChange} type="text" className="form-control" id="autoSizingInputGroup" placeholder="Prospect name" />
          </div>
        </div>
        </div>
        <p className="text-danger text-center m-0 p-0">{apiError ? apiError : ""}</p>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr className="table-head">
              <th></th>
              <th>Prospect Name</th>
              <th>Demographic</th>
              <th>Source</th>
              <th>Added By</th>
              <th>Date Added</th>
              <th>Set Type</th>
              <th>How many</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {prospectsToShow.map((elm, index) => {
              return(
              <tr key={index} >
                <td><input type="radio" name="selected" value={elm._id} onChange={() => handleRadio(elm._id)}/></td>
                <td>{elm.name}</td>
                <td>{elm.demography}</td>
                <td>{elm.source}</td>
                <td>{elm.addedBy}</td>
                <td>{getDate(elm.updatedAt)}</td>
                <td>{elm.setType}</td>
                <td>{elm.teamMemberCount}</td>
                <td>{elm.details}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
        <ul className="d-flex justify-content-between py-5">
          <li className= "table-bottom" onClick={() => setAddProspect(true)}>Add Prospect Set</li>
          <li className= {selectProspect ? "table-bottom" : "table-botto not-select"} >Edit Prospect Set</li>
          <li className= {selectProspect ? "table-bottom" : "table-botto not-select"} onClick={handleDelete}>Delete Prospect Set</li>
          <li className= "table-bottom">Import Prospect Set</li>
          <li>
            <Pagination 
              noOfPages={prospectState.count} 
              handleActivePageIndex={handleActivePageIndex} 
              activePageIndex={prospectState.activePageIndex}
            />
          </li>
        </ul>
      </div>
      {addProspect 
        ? <div className="add-prospect">
            <AddProspect setAddProspect={setAddProspect}/>
          </div> 
        : ""
      }
    </div>
  )
}

export default Prospects;