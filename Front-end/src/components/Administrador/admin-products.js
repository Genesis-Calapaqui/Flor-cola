import React, { useEffect, useState } from "react";
import { faTrash, faSearch, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/productAdmin.css";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    tipo: "",
    variedad: "",
    color: "",
    descripcion: "",
    topPicture: "",
    sidePicture: "",
    longitudDisponibleCm_: "",
    tiempoDeVidaDias_: "",
    tamanoFlor: "",
    espinas: "",
    petalosPorFlor: "",
    stock: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const createProduct = () => {
    if (Object.values(newProduct).some(val => val === "")) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    fetch("http://localhost:5000/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          alert("Producto creado exitosamente.");
          setShowModal(false);
          setNewProduct({
            tipo: "",
            variedad: "",
            color: "",
            descripcion: "",
            longitudDisponibleCm_: "",
            tiempoDeVidaDias_: "",
            tamanoFlor: "",
            espinas: "",
            petalosPorFlor: "",
            stock: "",
            topPicture: "",
            sidePicture: ""
          });
          fetchProducts(); // Recargar la lista de productos
        } else {
          alert("Error al crear el producto.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Ocurrió un error durante la operación.");
      });
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/getAllProducts');
      const data = await response.json();
      if (data.status === "ok") {
        setProductList(data.data);
      } else {
        console.error("Error al obtener los productos:", data.data);
      }
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-products-container">
      <h1>Productos</h1>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        Agregar Producto
      </button>

      {showModal && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-inner">
              <h3>Crear Nuevo Producto</h3>
              <input
                type="text"
                name="tipo"
                placeholder="Tipo"
                value={newProduct.tipo}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="text"
                name="variedad"
                placeholder="Variedad"
                value={newProduct.variedad}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={newProduct.color}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={newProduct.descripcion}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            <input
                type="text"
                name="longitudDisponibleCm_"
                placeholder="Longitud Disponible (cm)"
                value={newProduct.longitudDisponibleCm_}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="text"
                name="tiempoDeVidaDias_"
                placeholder="Tiempo de Vida (días)"
                value={newProduct.tiempoDeVidaDias_}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="float"
                name="tamanoFlor"
                placeholder="Tamaño Flor"
                value={newProduct.tamanoFlor}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="int"
                name="espinas"
                placeholder="Espinas"
                value={newProduct.espinas}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="int"
                name="petalosPorFlor"
                placeholder="Pétalos por Flor"
                value={newProduct.petalosPorFlor}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="int"
                name="stock"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="text"
                name="topPicture"
                placeholder="Imagen Principal URL"
                value={newProduct.topPicture}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
              <input
                type="text"
                name="sidePicture"
                placeholder="Imagen Lateral URL"
                value={newProduct.sidePicture}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />

              <button onClick={createProduct} className="btn btn-success">
                Crear Producto
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewProduct({
                    tipo: "",
                    variedad: "",
                    color: "",
                    descripcion: "",
                    topPicture: "",
                    sidePicture: "",
                    longitudDisponibleCm_: "",
                    tiempoDeVidaDias_: "",
                    tamanoFlor: "",
                    espinas: "",
                    petalosPorFlor: "",
                    stock: ""
                  });
                }}
                className="btn btn-secondary"
                style={{ marginLeft: 10 }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="product-table">
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Tipo</th>
            <th>Variedad</th>
            <th>Color</th>
            <th>Descripción</th>
            <th>Longitud Disponible (cm)</th>
            <th>Tiempo de Vida (días)</th>
            <th>Tamaño Flor</th>
            <th>Espinas</th>
            <th>Pétalos por Flor</th>
            <th>Stock</th>
            <th>Imagen Principal</th>
            <th>Imagen Lateral</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.ID_PRODUCTO}>
              <td>{product.ID_PRODUCTO}</td>
              <td>{product.TIPO}</td>
              <td>{product.VARIEDAD}</td>
              <td>{product.COLOR}</td>
              <td>{product.DESCRIPCION}</td>
              <td>{product.LONGITUD_DISPONIBLE_CM_}</td>
              <td>{product.TIEMPO_DE_VIDA_DIAS_}</td>
              <td>{product.TAMANO_FLOR}</td>
              <td>{product.ESPINAS}</td>
              <td>{product.PETALOS_POR_FLOR}</td>
              <td>{product.STOCK}</td>
              <td><img src={product.TOP_PICTURE} alt={product.VARIEDAD} className="product-image" /></td>
              <td><img src={product.SIDE_PICTURE} alt={`Side of ${product.VARIEDAD}`} className="product-image" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
