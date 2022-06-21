function Pagination(props) {
  let totalPages = Math.ceil(Number(props.noOfPages) / 10);
  let pageArray = []
  for (let i = 0; i < totalPages; i++) {
    pageArray.push(i+1);
  }
  return (
    <ul className="d-flex">
      {pageArray.map((elm) => {
        return(
        <li 
          key={elm} 
          className={props.activePageIndex === elm ? "mx-2 pageNo pageNo-border" : "pageNo mx-2"} 
          onClick={()=> props.handleActivePageIndex(elm)}
        >
          {elm}
        </li>
      )})}
    </ul>
  )
}

export default Pagination;