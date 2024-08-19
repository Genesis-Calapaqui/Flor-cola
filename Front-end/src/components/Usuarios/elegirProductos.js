import { useEffect, useState } from "react"
import "../../styles/pedido.css"
import { useNavigate } from "react-router-dom";

export default function ElegirProductos({onContinue}) {
    const [productList, setProductList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [searching, setSearching] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        setProductList([
            {
                id_producto: 1,
                tipo: "Rose",
                variedad: "Alba",
                color: "White",
                descripcion: "White",
                top_picture: "https://tessacorporation.com/wp-content/uploads/2017/10/Alba-3.jpg",
                side_picture: "https://floramarket.es/wp-content/uploads/2022/03/rosa-alba-1.png",
                longitud_disponible_cm_: "50 to 90",
                tiempo_de_vida_dias_: "14-18",
                tamano_flor: 6.5,
                espinas: 1,
                petalos_por_flor: 47,
                stock: 81
            },
            {
                id_producto: 2,
                tipo: "Rose",
                variedad: "Altamira",
                color: "Novelty",
                descripcion: "Cherry/Red",
                top_picture: "https://www.staroses.com/wp-content/uploads/2020/02/altamira2-1.jpg",
                side_picture: "https://www.staroses.com/wp-content/uploads/2020/02/altamira2-1.jpg",
                longitud_disponible_cm_: "40 to 70",
                tiempo_de_vida_dias_: "16-20",
                tamano_flor: 5.8,
                espinas: 1,
                petalos_por_flor: 56,
                stock: 61
            },
            {
                id_producto: 3,
                tipo: "Rose",
                variedad: "Amorosa",
                color: "Pink",
                descripcion: "Medium Pink",
                top_picture: "https://297820.selcdn.ru/crm1/images/species/4144.jpg?=2023-12-01+06%3A28%3A39",
                side_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9akiiFj_LJvhjSodQjLh6eTd37YmykH6xnm-M6eDaeohen-7RuR4pHXHW19Y4514q4o&usqp=CAU",
                longitud_disponible_cm_: "60 to 90",
                tiempo_de_vida_dias_: "16-20",
                tamano_flor: 6.8,
                espinas: 1,
                petalos_por_flor: 52,
                stock: 131
            }
        ]);
    }, [])

    const handleSelected = (prod) => {
        setSelectedList((prevProds) => {
            if (prevProds.includes(prevProds.find(ro =>ro.producto===prod))) {
                return prevProds.filter(item => item.producto !== prod);
            } else {
                return [...prevProds,{producto:prod,cantidad:1}];
            }
        })
    }


    const handleQuantity = (prod,quantity)=>{
        setSelectedList((prevProds) => {
            return prevProds.map(item =>{
                if(item.producto === prod){
                    return {producto:item.producto,cantidad:parseInt(quantity,10)};
                }
                return item;
            })
        })
    }

    const filteredList = productList.filter(rose =>
        rose.variedad.toLowerCase().includes(searching.toLowerCase()))

    return (
        <div>
            <div className="buttonHold">
                <button className="back" onClick={()=>navigate(-1)}></button>
            </div>
            <input type="text" placeholder="Buscar producto..." className="searchbar" onChange={(e) => setSearching(e.target.value)} />
            <div className="listcontainer">
                <ul className="productList">
                    {searching === "" ? productList.map((rose) => {
                        return (
                            <li className={`flowerop ${selectedList.includes(selectedList.find(it =>it.producto === rose)) ? "selected" : ""}`}
                                key={rose.id_producto}
                                onClick={() => handleSelected(rose)}
                            >
                                <div>
                                    <img src={rose.top_picture} alt="top_image" />
                                </div>
                                <div className="bottomPart">
                                    <h3>{rose.variedad}</h3>
                                    {selectedList.includes(selectedList.find(it =>it.producto === rose)) ?
                                        <input type="number" min={1} max={rose.stock} defaultValue={1}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => handleQuantity(rose,e.target.value)}
                                        ></input>
                                        : null}
                                </div>
                                <p>{rose.stock} unidades</p>
                            </li>
                        )
                    })
                        : filteredList.map((rose) => {
                            return (
                                <li className={`flowerop ${selectedList.includes(selectedList.find(it =>it.producto === rose)) ? "selected" : ""}`}
                                    key={rose.id_producto}
                                    onClick={() => handleSelected(rose)}
                                >
                                    <div>
                                        <img src={rose.top_picture} alt="top_image" />
                                    </div>
                                    <div className="bottomPart">
                                        <h3>{rose.variedad}</h3>
                                        {selectedList.includes(selectedList.find(it =>it.producto === rose)) ?
                                            <input type="number" min={1} max={rose.stock} defaultValue={1}
                                                onClick={(e) => e.stopPropagation()}></input>
                                            : null}
                                    </div>
                                </li>
                            )
                        })}
                </ul>
            </div>
            <div className="bottomHold">
                <button className="continue btn btn-primary" onClick={()=>{onContinue(selectedList);}}>Continuar</button>
            </div>
        </div>
    )
}