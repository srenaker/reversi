var turn;
var opposite;
var boardSize = 8;
var directions = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

function startGame() {
	// lay out initial pieces
	// TODO: use getId method (??)
	$('#' + boardSize/2 + (boardSize/2 - 1)).addClass('white');
	$("#" + (boardSize/2 - 1) + (boardSize/2)).addClass('white');
	$("#" + (boardSize/2 - 1) + (boardSize/2 - 1)).addClass('white');
	$("#" + boardSize/2 + boardSize/2).addClass('black');
	// $('.start_button').value('Restart game');
	
	turn = 'white';
	opposite = 'black';
	update_turn_div(turn);
	getBoardState(boardSize);
}

function getBoardState() {
	var whiteSquares = [];
	var blackSquares = [];
	for (x = 0; x < boardSize; x++) {
		for (y = 0; y < boardSize; y++) {
			squareId = '#' + x + y;
			if ($(squareId).hasClass('white')) { whiteSquares.push(squareId) };
			if ($(squareId).hasClass('black')){ blackSquares.push(squareId) };
		}
	}
	//alert(whiteSquares);
	//alert(blackSquares);	
}

function getId(coords) {
	id = "#" + coords[0] + coords[1]  ;
	return id;
}

function update_turn_div(turn) {
	$('.whose_turn').html('<h3>' + turn + '\'s turn</h3>');
}

function move(squareId) {
	if (valid_move(squareId)) {
		$('#' + squareId).addClass(turn);				
		if (turn == 'white') {
			turn = 'black';
			opposite = 'white';
		 } else{
			turn = 'white';
			opposite = 'black';
		} 
		update_turn_div(turn);
	} else {
		alert('Invalid move.');
	}
}

function valid_move(squareId) {
	var n;
	for (n in directions) {
		if (look(squareId, directions[n])) {
			return true;
		}
	}
	return false;
}

function evalRow(squareId, offset) {
	// first check that the proximate piece is of opposite color
	if ($('#' + (squareId + offset)).hasClass(opposite)) {
		//alert('found a ' + opposite + ' at ' + (squareId + offset));
		// then check that there's a piece of the same color at the other end
		for (i = squareId + offset; i >= 0; i += offset) { 
			nextSquare = i + offset;
			//alert ('ns ' + nextSquare);
			if ($('#' + nextSquare).hasClass(turn)) {	
				//alert('found a ' + turn);
				// flip all the pieces in between
				for (j = squareId + offset; j > nextSquare; j += offset) { 
					//alert('about to flip ' + j)
					$('#' + j).removeClass(opposite).addClass(turn);
				}
				return true;
			} 
		}
	} else {
		return false;
	}
	
}

function look(squareId, direction) {

	switch(direction) {
		case 'nw':
			return evalRow(squareId, -11);
			break;
		// case 'n':
		// 	for (i=squareId-10; i>=0; i -= 10) { row_array.push(i); }		
		// 	break;		
		// case 'ne':
		// 	for (i=squareId-9; i>=0; i -= 9) { row_array.push(i);	}		
		// 	break;		
		// case 'e':
		// 	for (i=squareId+1; i<=squareId + 10; i += 1) { row_array.push(i); }		
		// 	break;							
		// case 'se':
		// 	for (i=squareId+11; i<=100; i += 11) {	row_array.push(i);	}		
		// 	break;					
		// case 's':
		// 	for (i=squareId+10; i<=100; i += 10) {	row_array.push(i); }		
		// 	break;		
		// case 'sw':
		// 	for (i=squareId+9; i<=100; i += 9) { row_array.push(i); }		
		// 	break;					
		// case 'w':
		// 	for (i=squareId-1; i>=squareId - 10; i -= 1) { row_array.push(i);	}		
		// 	break;					
	}
	
}
