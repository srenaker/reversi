var turn;
var opposite;
var boardSize = 8;
var directions = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

function startGame() {
	// blank out board
	$('.square').removeClass('white').removeClass('black');
	// lay out initial pieces
	// TODO: use getId method (??)
	$('#' + boardSize/2 + (boardSize/2 - 1)).addClass('white');
	$("#" + (boardSize/2 - 1) + (boardSize/2)).addClass('white');
	$("#" + (boardSize/2 - 1) + (boardSize/2 - 1)).addClass('black');
	$("#" + boardSize/2 + boardSize/2).addClass('black');
	$('.start_button').val('Restart game');
	
	turn = 'white';
	opposite = 'black';
	update_turn_div(turn);
	update_score();
}

function getBoardState() {
	var score = [0, 0];
	for (x = 0; x < boardSize; x++) {
		for (y = 0; y < boardSize; y++) {
			squareId = '#' + x + y;
			if ($(squareId).hasClass('white')) { score[0]++; }
			if ($(squareId).hasClass('black')){ score[1]++; }
		}
	}
	return score;
}

function update_turn_div(turn) {
	$('.whose_turn').html('<h3>' + turn + '\'s turn</h3>');
}

function update_score() {
	score = getBoardState(boardSize);
	$('.white_score').html(score[0]);
	$('.black_score').html(score[1]);	
}

function move(squareId) {
	if (valid_move(squareId)) {
		squareIdStr = squareId + '';
		if (squareIdStr.length == 1) {
			squareIdStr = '0' + squareIdStr;
		}
		$('#' + squareIdStr).addClass(turn);				
		if (turn == 'white') {
			turn = 'black';
			opposite = 'white';
		 } else{
			turn = 'white';
			opposite = 'black';
		} 
		update_turn_div(turn);
		update_score();
	} else {
		alert('Invalid move.');
	}
}

function valid_move(squareId) {
	var n;
	var is_valid = false;
	for (n in directions) {
		if (look(squareId, directions[n])) {
			is_valid = true;
		}
	}
	return is_valid;
}

function evalRowNeg(squareId, offset, limit) {
	// first check that the proximate piece is of opposite color
	if ($('#' + (squareId - offset)).hasClass(opposite)) {
		// then check that there's a piece of the same color at the other end
		for (i = squareId - offset; i >= limit;	i -= offset) { 
			nextSquare = i - offset;
			if ($('#' + nextSquare).hasClass(turn)) {	
				// flip all the pieces in between
				for (j = squareId - offset; j > nextSquare; j -= offset) { 
					$('#' + j).removeClass(opposite).addClass(turn);
				}
				return true;
			} 
		}
	} else {
		return false;
	}
}

function evalRowPos(squareId, offset, limit) {
	// first check that the proximate piece is of opposite color
	if ($('#' + (squareId + offset)).hasClass(opposite)) {
		// then check that there's a piece of the same color at the other end
		for (i = squareId + offset; i <= limit;	i += offset) { 
			nextSquare = i + offset;
			if ($('#' + nextSquare).hasClass(turn)) {	
				// flip all the pieces in between
				for (j = squareId + offset; j < nextSquare; j += offset) { 
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
	// TODO: can I use .round for this?

	switch(direction) {
		case 'w':
			squareIdStr = squareId + '';
			limit = squareIdStr.charAt(0) + '0'; 		
			return evalRowNeg(squareId, 1, limit);
		case 'nw':
			return evalRowNeg(squareId, 11, 0);
		case 'n':
			return evalRowNeg(squareId, 10, 0);
		case 'ne':
			return evalRowNeg(squareId, 9, 0);
		case 'e':
			squareIdStr = (squareId + 10) + '';
			limit = squareIdStr.charAt(0) + '0'; 
			return evalRowPos(squareId, 1, limit)
		case 'se':
			return evalRowPos(squareId, 11, 100)
		case 's':
			return evalRowPos(squareId, 10, 100)
		case 'sw':
			return evalRowPos(squareId, 9, 100)	
	}
}
