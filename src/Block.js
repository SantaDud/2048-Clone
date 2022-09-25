const Block = ({ row, col, board}) => {

    return (
        <p className="col block">
            { board[row][col] }
        </p>
    );
}

export default Block;