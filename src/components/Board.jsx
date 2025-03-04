import { useState, useEffect } from "react";
import { useDrag } from "@use-gesture/react";

function Board() {
    const divcolor ={2: "#EEE4DA", 4: "#EDE0C8", 8: "#F2B179",
        16: "#F59563", 32: "#F67C5F", 64: "#F65E3B",
        128: "#EDCF72", 256: "#EDCC61", 512: "#EDC850",
        1024: "#EDC53F", 2048: "#EDC22E", 4096: "#3C3A32",
        8192: "#2E3D4D", 16384: "#1D4E89"};
    const [swipeDirection, setSwipeDirection] = useState("");
    const [gridItems, setGridItems] = useState([0,0,0,0,2,0,0,0,0]);

    const [hasSwiped, setHasSwiped] = useState(false);

const bind = useDrag(({ movement: [dx, dy], down }) => {
    if (!hasSwiped) {
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 50) {//swap right
                setGridItems((prevGrid) => {
                    const newGrid = swapItems(prevGrid, 1);
                    return newGrid;
                });
                setHasSwiped(true);
            } else if (dx < -50) {//swap left
                setGridItems((prevGrid) => {
                    const newGrid = swapItems(prevGrid, -1);
                    return newGrid;
                });
                setHasSwiped(true);
            }
        } else {
            if (dy > 50) {//swap down
                setGridItems((prevGrid) => {
                    const newGrid = swapItems(prevGrid, 3);
                    return newGrid;
                });
                setHasSwiped(true);
            } else if (dy < -50) {//swap up
                setGridItems((prevGrid) => {
                    const newGrid = swapItems(prevGrid, -3);
                    return newGrid;
                });
            }
        }
    }

    // Reset `hasSwiped` when the drag ends
    if (!down) {
        setHasSwiped(false);
    }
});


   
    const swapItems = (grid,direction) => {
         
            const newGrid=([...grid])
            if (direction === 1) { // Right swipe
                for (let i = 0; i < 9; i += 3) {
                    if (newGrid[i + 2] === newGrid[i + 1] || newGrid[i + 2] === 0) {
                        newGrid[i + 2] += newGrid[i + 1];
                        newGrid[i + 1] = 0;
                    }
                    if (newGrid[i] === newGrid[i + 1] || newGrid[i + 1] === 0) {
                        newGrid[i + 1] += newGrid[i];
                        newGrid[i] = 0;
                    }
                    if(newGrid[i+2]===0||newGrid[i + 2] === newGrid[i + 1]){
                        newGrid[i+2]+=newGrid[i+1];
                        newGrid[i+1]=0;
                    }
                }
            }

            if (direction === -1) { // Left swipe
                for (let i = 0; i < 9; i += 3) {
                    if (newGrid[i] === newGrid[i + 1] || newGrid[i] === 0) {
                        newGrid[i] += newGrid[i + 1];
                        newGrid[i + 1] = 0;
                    }
                    if (newGrid[i + 2] === newGrid[i + 1] || newGrid[i + 1] === 0) {
                        newGrid[i + 1] += newGrid[i + 2];
                        newGrid[i + 2] = 0;
                    }
                    if(newGrid[i]===0||newGrid[i] === newGrid[i + 1]){
                        newGrid[i]+=newGrid[i+1];
                        newGrid[i + 1] = 0;
                    }
                }
            }

            if (direction === 3) { // Swipe down
                for (let i = 0; i < 3; i++) {
                    if (newGrid[i + 6] === newGrid[i + 3] || newGrid[i + 6] === 0) {
                        newGrid[i + 6] += newGrid[i + 3];
                        newGrid[i + 3] = 0;
                    }
                    if (newGrid[i] === newGrid[i + 3] || newGrid[i + 3] === 0) {
                        newGrid[i + 3] += newGrid[i];
                        newGrid[i] = 0;
                    }
                    if(newGrid[i+6]===0||newGrid[i + 6] === newGrid[i + 3] ){
                        newGrid[i + 6] += newGrid[i + 3];
                        newGrid[i + 3] = 0;
                    }
                }
            }

            if (direction === -3) { // Swipe up
                for (let i = 0; i < 3; i++) {
                    if (newGrid[i] === newGrid[i + 3] || newGrid[i] === 0) {
                        newGrid[i] += newGrid[i + 3];
                        newGrid[i + 3] = 0;
                    }
                    if (newGrid[i + 6] === newGrid[i + 3] || newGrid[i + 3] === 0) {
                        newGrid[i + 3] += newGrid[i + 6];
                        newGrid[i + 6] = 0;
                    }
                    if(newGrid[i]===0||newGrid[i] === newGrid[i + 3] ){
                        newGrid[i] += newGrid[i + 3];
                        newGrid[i + 3] = 0;
                    }
                }
            }
            newGrid[generatrandomindex(newGrid)]=generaterandomnumber(newGrid);
           return newGrid;       
    };

    //generating empty cell index
  const generatrandomindex=(newGrid)=>{
     const emptycell=[];
     let count=0;
     for (let i=0; i<9;i++){
        if(newGrid[i]===0){
            emptycell[count]=i;
            count++;
        }
     }
     const selectedindex=Math.floor(Math.random()*(count));
     return emptycell[selectedindex];
  }

  const generaterandomnumber = (grid) => {
    const maxTile = Math.max(...grid);
    let maxPower = 1;

    if (maxTile >= 16) maxPower = 1;
    if (maxTile >= 64) maxPower = 2;
    if (maxTile >= 256) maxPower = 4;
    if (maxTile >= 1024) maxPower = 6;

    return Math.pow(2, Math.floor(Math.random() * maxPower) + 1);
}; 

    return (
        <div className="w-full sm:max-w-96 bg-gray-800  flex flex-col justify-center items-center m-auto p-4">
            <div
                {...bind()} 
                className="grid grid-cols-3 bg-white rounded-[1rem]"
                style={{ touchAction: "none" }} 
            >
                {gridItems.map((item, index) => (
                    <div key={index} className="w-24 h-24 flex items-center justify-center border border-gray-50 rounded-[0.5rem] bg-gray-300 text-xl">
                        {item !== 0 && (
                            <div
                                style={{
                                    color: "white",
                                    backgroundColor: divcolor[item],
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "3rem",
                                    borderRadius: "0.5rem"
                                }}
                            >
                                {item}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center h-40 w-80 bg-gray-200 rounded-lg text-xl cursor-pointer mt-4 ">
                {swipeDirection ? swipeDirection : "Swipe on Board!"}
            </div>
        </div>
    );
}

export default Board;
