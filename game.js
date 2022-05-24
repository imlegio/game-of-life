let matrix = [];
let playing;

for(let x=0; x<150; x++){
    matrix.push([]);
    for(let y=0; y<150; y++){
        matrix[x].push({x:x, y:y, val:'d'})
    }
}

const createGrid = ()=>{
    let grid = document.createElement('div');
    grid.setAttribute('id', 'grid');
    matrix.forEach(row=>{
        grid.appendChild(createRow(row));
    });
    grid.addEventListener('click', (event)=>{
        [x,y] = event.target.getAttribute('id').split('-');
        cellClicked({x,y,val: matrix[x, y]
        })
    })
    document.getElementById('container').innerHTML = '';
    document.getElementById('container').appendChild(grid); 
}

const createRow = (row)=>{
    let rowEle = document.createElement('div');
    rowEle.setAttribute('id', 'row');
    row.forEach(cell=>{
        let cellEle = document.createElement('span');
        cellEle.setAttribute('id', `${cell.x}-${cell.y}`);
        cellEle.classList.add('cell');
        cellEle.style.backgroundColor = cell.val==='d'?'black':'green'
        rowEle.appendChild(cellEle);
    })
    return rowEle;
}

const cellClicked = (cell)=>{
    matrix[cell.x][cell.y].val = matrix[cell.x][cell.y].val==='d'?'l':'d';
    document.getElementById(`${cell.x}-${cell.y}`).style.backgroundColor = matrix[cell.x][cell.y].val==='d'?'black':'green'
}

// Optimized
const newGeneration = ()=>{
        let newState = [];
        matrix.forEach((row)=>{
            newState.push([]);
            row.forEach((cell)=>{
                newState[cell.x].push({
                    x:cell.x,
            y:cell.y,
            val:newCellState(cell)});
            if(matrix[cell.x][cell.y].val!==newState[cell.x][cell.y].val){
                document.getElementById(`${cell.x}-${cell.y}`).style.backgroundColor = newState[cell.x][cell.y].val === 'd'? 'black':'green';
            }
            })
        });
        matrix = newState;
    }



// Unoptimized
// const newGeneration = ()=>{
//     let newState = [];
//     matrix.forEach((row)=>{
//         newState.push([]);
//         row.forEach((cell)=>{
//             newState[cell.x].push({
//                 x:cell.x,
//         y:cell.y,
//         val:newCellState(cell)});
//         })
//     });
//     matrix = newState;
//     createGrid();
// }

const newCellState = (cell)=>{
    let aliveCount = 0;
    if(cell.x>0){
        if(cell.y>0){
            if(matrix[cell.x-1][cell.y-1].val==='l'){
                aliveCount = aliveCount+1;
            }
        }
        if(matrix[cell.x-1][cell.y].val==='l'){
            aliveCount = aliveCount+1;
        }
        if(cell.y<matrix[cell.x].length-2){
            if(matrix[cell.x-1][cell.y+1].val==='l'){
                aliveCount = aliveCount+1;
            }
        } 
    }
    if(cell.y>0){
        if(matrix[cell.x][cell.y-1].val==='l'){
            aliveCount = aliveCount+1;
        }
    }
    if(cell.y<matrix[cell.x].length-1){
        if(matrix[cell.x][cell.y+1].val==='l'){
            aliveCount = aliveCount+1;
        }
    }
    if(cell.x<matrix.length-2){
        if(cell.y>0){
            if(matrix[cell.x+1][cell.y-1].val==='l'){
                aliveCount = aliveCount+1;
            }
        }
        if(matrix[cell.x+1][cell.y].val==='l'){
            aliveCount = aliveCount+1;
        }
        if(cell.y+1 < matrix[cell.x+1].length-1){
            if(matrix[cell.x+1][cell.y+1].val==='l'){
                aliveCount = aliveCount+1;
            }
        } 
    }
    return aliveCount===2?cell.val:aliveCount===3?'l':'d';
}

document.getElementById('play').addEventListener('click', ()=>{
    playing = setInterval(()=>{
        newGeneration();
    },100);
});

document.getElementById('pause').addEventListener('click', ()=>{
    clearInterval(playing);
});

document.getElementById('next-generation').addEventListener('click', ()=>{
    newGeneration();
})

createGrid();


