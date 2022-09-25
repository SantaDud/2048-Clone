import Block from "./Block";

const Row = ({ row, board }) => {

    return (
        <div className="row m-0">
            <Block board = {board} col = {0} row = {row} />
            <Block board = {board} col = {1} row = {row} />
            <Block board = {board} col = {2} row = {row} />
        </div>
    );
}

export default Row;