$(document).ready(function () {
    $('#create').click(game);
});

$(document).ready(function () {
    $('#create2').click(reset);
});

var reset = function()
{
    $('#table').find('tbody').empty();
    game();
    
}


var game = function () {

    var gridRows = [];
    var gridColumns = [];
    var grid = [];
    var rows = $('#rows').val();
    var columns = $('#columns').val();
    var mines = $('#numMines').val();
    var element = document.createElement('element');
    document.body.appendChild(element);

    function reveal(button2, event) {
        var x = Number(button2.attr('x'));
        var y = Number(button2.attr('y'));
        var button = gridColumns[y][x];
        var number = Number(button.attr('number'));
        var flag = Number(button2.attr('flag'));


        button2.attr('show', true);
        if (event.shiftKey) {
            
            if (button.attr('flag') == 'false') {
                button.attr('flag', true);
                button.text('MINE');
                
            element.innerHTML = ('Active mines: ' + parseInt(--mines));


            } else if (button.attr('flag') == 'true') {
                button.attr('flag', false);
                button.text('');
               
            element.innerHTML = ('Active mines: ' + parseInt(++mines));
            }
        } else if (button.attr('bomb') === 'true') {

            alert("You clicked on a mine!");
            button.text('BOOM');
           
          
        } else if (number === 0) {
            button.text(number);
            for (var columnX = x - 1; columnX <= x + 1; columnX++) {
                for (var rowY = y - 1; rowY <= y + 1; rowY++) {
                    if (gridColumns[rowY] !== undefined && gridColumns[rowY][columnX] !== undefined) {
                        var click = gridColumns[rowY][columnX];
                        if (click.attr('show') === 'false') {
                            reveal(click, event);
                        }
                    }
                }
            }
        } else {
            button.text(number);
        }
    }

    var table = $('#table').find('tbody');
    console.log(table);
    if(rows < 8 || rows > 30 || columns < 8 || columns > 40 || mines < 1){
        alert("invalid input")
    }
    if (mines > (rows * columns) - 1) {
        alert("invalid input");
    }
    for (var i = 0; i < rows; i++) {
        var tableRow = $('<tr>');
        var row = [];
        for (var j = 0; j < columns; j++) {
            var tableData = $('<td>');
            var button = $('<button>').attr('number', 0)
                .attr('x', j).attr('y', i).attr('show', false)
                .attr('bomb', false).attr('flag', false)
                .on('click',  function (e) {reveal($(this), e);
                });
            tableData.append(button);
            tableRow.append(tableData);
            row.push(button);
            gridRows.push(button);
            grid.push(button);
        }
        gridColumns.push(row);
        table.append(tableRow);
    }

   

    for (var mineRand = 0; mineRand < mines; mineRand++) {
        var rowRand = Math.floor(Math.random() * gridRows.length);
        var cells = gridRows[rowRand];
        var x = Number(cells.attr('x'));
        var y = Number(cells.attr('y'));
        cells.attr('bomb', true);
        for (var columnX = x - 1; columnX <= x + 1; columnX++) {
            for (var rowY = y - 1; rowY <= y + 1; rowY++) {
                if (gridColumns[rowY] !== undefined && gridColumns[rowY][columnX] !== undefined) {
                    var click = gridColumns[rowY][columnX];
                    var previousBtn = Number(click.attr('number'));
                    click.attr('number', previousBtn + 1);
                }
            }
        }
        gridRows.splice(rowRand, 1);
    }


}


    
