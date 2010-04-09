var turn;
var opposite;
var directions = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

function startGame() {
	// lay out initial pieces
	$('#44').html('<img src="/images/white_piece.png"').addClass('white');
	$('#55').html('<img src="/images/white_piece.png"').addClass('white');
	$('#45').html('<img src="/images/black_piece.png"').addClass('black');
	$('#54').html('<img src="/images/black_piece.png"').addClass('black');
	turn = 'white';
	opposite = 'black';
	update_turn_div(turn);
}

function update_turn_div(turn) {
	$('.whose_turn').html('<h3>' + turn + '\'s turn</h3>');
}

function move(square_id) {
	if (valid_move(square_id, turn)) {
		$('#' + square_id).html('<img src="/images/' + turn + '_piece.png"').addClass(turn);				
		if (turn == 'white') {
			turn = 'black';
			opposite = 'white';
		 } else{
			turn = 'white';
			opposite = 'black';
		} 
		update_turn_div(turn);
	} else {
		alert('Nice try. Invalid move.');
	}
}

function valid_move(square_id, turn) {
	var n;
	for (n in directions) {
		if (look(square_id, directions[n])) {
			return true;
		}
	}
	return false;
}

function look(square_id, direction) {
	var square_to_look_at;
	switch(direction) {
		case 'nw':
			square_to_look_at = parseInt(square_id) - 11;
			break;
		case 'n':
			square_to_look_at = parseInt(square_id) - 10;
			break;		
		case 'ne':
			square_to_look_at = parseInt(square_id) - 9;
			break;		
		case 'e':
			square_to_look_at = parseInt(square_id) + 1;
			break;		
		case 'se':
			square_to_look_at = parseInt(square_id) + 11;
			break;		
		case 's':
			square_to_look_at = parseInt(square_id) + 10;
			break;		
		case 'sw':
			square_to_look_at = parseInt(square_id) + 9;
			break;								
		case 'w':
			square_to_look_at = parseInt(square_id) - 1;
			break;					
	}
	
	// make sure square to look at is on the board
	if (square_to_look_at >= 0 && square_to_look_at < 100) {
		// return true if the square to look at has the opposite color, false if it doesn't
		return $('#' + square_to_look_at).hasClass(opposite);		
	} else {
		return false;
	}

}
