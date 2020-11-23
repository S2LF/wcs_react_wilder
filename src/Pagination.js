const { useState } = require("react");
const { default: Pagination } = require("react-js-pagination");


function Paginate(){


    
      const todos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
      'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
      's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    const todosPerPage = 3;
    const [activePage, setCurrentPage] = useState(1);
    
    const indexOfLastTodo = activePage * todosPerPage;
    const indexOfFirtTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirtTodo, indexOfLastTodo);
    
    const renderTodos = currentTodos.map((todo, index) => {
      return <li key={index}>{todo}</li>;
    });
    
    const handlePageChange = ( pageNumber ) => {
        console.log( `active page is ${pageNumber}`);
        setCurrentPage(pageNumber);
    }

    return (
      <>
        <div className="result">{renderTodos}</div>
        <div className="div-pagination">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={3}
            totalItemsCount={todos.length}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
          />
        </div>
      </>
    )
}

export default Paginate;