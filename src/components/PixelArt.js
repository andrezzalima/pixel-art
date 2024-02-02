import { useState } from "react";
import styles from "./PixelArt.module.css"


export function PixelArt() {
    const matrizInicial = Array.from({ length: 28 }, () => Array(35).fill(" "))

    const [color, setColor] = useState("#ffffff");
    const [drawing, setDrawing] = useState(false);
    const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
    const [matriz, setMatriz] = useState(matrizInicial)

    function handleChange(value) {
        setColor((pvValue => value));
    }

    function handleMouse() {
        setDrawing((pvDrawing) => !pvDrawing);
        
    }


    function handleMouseEnter(i, j) {
        if (drawing) {
            matriz[i][j] = color;
            setMousePos({ x: j, y: i });

        }
    }

    function resetMatriz() {
        setMatriz(matrizInicial)
    }


    return (

        <div className="h-screen bg-gray-800 p-8">
            <h1 className={styles.title} >Pixel Art</h1>
            <div className="flex m-4">
                <div className="flex flex-col justify-center gap-8 w-1/4">
                    <div>
                        <input
                            className="w-20 h-20 outline-0 border-0 rounded-md"
                            type="color"
                            value={color}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="bg-red-200 rounded-md text-slate-50 p-2" onClick={resetMatriz}>Resetar</button>
                    </div>
                </div>
                <div>
                    {matrizInicial.map((linha, i) => (
                        <div key={i} className="flex">
                            {linha.map((coluna, j) => (
                                <div
                                    key={j}
                                    className="bg-transparent w-4 h-4  border border-gray-600"
                                    style={{
                                        backgroundColor:
                                            drawing && mousePos.x === j && mousePos.y === i
                                                ? color
                                                : matriz[i][j],
                                        cursor: drawing ? "pointer" : "default",
                                    }}
                                    onMouseDown={() => handleMouse()}
                                    onMouseUp={handleMouse}
                                    onMouseMove={() => handleMouse ? handleMouseEnter(i, j) : null}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
