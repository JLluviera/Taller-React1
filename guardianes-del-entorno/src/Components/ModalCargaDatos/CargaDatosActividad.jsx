import React from 'react'
import { useSelector } from 'react-redux'

const CargaDatosActividad = () => {

    const user = useSelector((state) => state.user);

    const [naturalAreaId, setNaturalAreaId] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const PostDatosActividad = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError(null);

        let postDatosActividad = {
            userId: user.id,
            activity: {
                naturalAreaId: naturalAreaId,
                descripcion: descripcion,
                date: date
            }
        };

        try {
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/insert?secret=TallerReact2025!", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    postDatosActividad
                )
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if(data.response === true) {
                alert("Actividad registrada correctamente");
            } else {
                alert("Error al registrar actividad");
            }

        }catch (error) {
                setError(error.message);
                alert(`Error: ${error.message}`);
                setLoading(false);
        }
    }
    
    const HandleSubmitActividades = async (e) => {
        e.preventDefault();
        await PostDatosActividad(e);
    }

  return (
    <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#DatosAreaModal">
                Agregar un Area Protegida
            </button>
        
            <div className="modal fade text-black" id="DatosArea" tabIndex="-1" aria-labelledby="DatosAreaLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="DatosAreaLabel">INgreso de datos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={HandleSubmitActividades}>  
                                <div className="mb-3">
                                    <label className='form-label' htmlFor='naturalAreaId'>ID Area Protegida</label>
                                    <input type='text' className='form-control' id='naturalAreaId' value={naturalAreaId} onChange={(e) => setNaturalAreaId(e.target.value)} required />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CargaDatosActividad;