function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
let totalPages = 0;
let gridData = JSON.parse( httpGet('https://emp-api-rakesh.herokuapp.com/employees') );
let gridContent = document.getElementById('gridBody');
let pageNumDisplay = document.getElementById('pagination');
let myTable = document.getElementById('grid');
let currentPage = 1;
let fileteredData = [];

const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 

    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

    
myTable.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    debugger
    const tbody = gridContent;
    Array.from(tbody.querySelectorAll('tr'))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
      .forEach(tr => tbody.appendChild(tr) );
})));



appendDatatoGrid(gridData);
PageChange(gridData, 1);

function appendTableCell(tr, tdValue){
    let tableCell = document.createElement('td');
    tableCell.innerText = tdValue;
    tr.appendChild(tableCell);
}
function appendDatatoGrid(data){
    gridContent.innerHTML= '';
for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let tableRow = document.createElement('tr');
    appendTableCell(tableRow, element.id);
    appendTableCell(tableRow, element.firstName);
    appendTableCell(tableRow, element.lastName);
    appendTableCell(tableRow, element.company);
    appendTableCell(tableRow, element.email);
    gridContent.appendChild(tableRow);
}
}
 function nextPage(){
    if(currentPage == totalPages){
        return;
    }
currentPage++;
debugger;
if (fileteredData && fileteredData.length > 0){
    PageChange(fileteredData, currentPage);
}

else{
    PageChange(gridData, currentPage);
}
    }
    function prevPage(){
        if(currentPage == 1){
            return;
        }
        currentPage--;
        debugger;
        if (fileteredData && fileteredData.length > 0){
            PageChange(fileteredData, currentPage);
        }
        
        else{
            PageChange(gridData, currentPage);
        }
            }
function setCurrentPage(){
    let currentPageNum =  document.getElementById('current_page');
    currentPageNum.innerText = currentPage;
    console.log(currentPageNum.innerText);
    let lastPageNum =  document.getElementById('total_pages');
    lastPageNum.innerText = totalPages;
}

function PageChange(data, pagenumber){
    totalPages = parseInt( data.length/12);
    let pagedData = data.slice((pagenumber - 1) * 12, pagenumber * 12);
    appendDatatoGrid(pagedData);
    setCurrentPage();
}

function searchGrid(){
   let input = document.getElementById("searchBox");
   searchText = input.value.toLowerCase();
   if(searchText && searchText.length > 0){
    let fileteredData= gridData.filter(function (el) {
        return el.firstName.toLowerCase().indexOf(searchText) > -1 ||  el.lastName.toLowerCase().indexOf(searchText) > -1;
     });
     if ( !fileteredData){
        fileteredData=[];
    }
appendDatatoGrid(fileteredData);
   }
   else{
       appendDatatoGrid(gridData);
   }
}





  



