import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCursos from "../services/useCursos";
import {useAuth} from '../context/AuthContext'

export default function CourseView() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { getCursoById, joinCourse, isOnCourse } = useCursos();
  
  const [curso, setCurso] = useState(null);
  const [inscrito, setInscrito] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await getCursoById(id);

        setCurso(data);
        if (session && session.role === 'user') {
          const joined = await isOnCourse(session.id, id);
          setInscrito(joined);
        }

      } catch (err) {
        console.error(err);
      }
    };

    loadCourse();

  }, [id, session]);
  
  if (!curso) {
    return (
      <div className="text-center mt-20 text-xl text-red-500">
        Curso no encontrado
      </div>
    );
  }

  const handleInscribirse = async () => {

  if (!session) {
    alert('Debes iniciar sesión');

    navigate('/credentials', {
      state: {
        isLogin: true
      }
    });

    return;
  }

  if (session.role !== 'user') {
    alert('Solo los usuarios pueden inscribirse');
    return;
  }

  try {
    const success =
      await joinCourse(
        session.id,
        id
      );

    if (success) {

      setInscrito(true);
    }

  } catch (err) {

    console.error(err);

    alert(
      'Error al inscribirse'
    );
  }
};

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      
      {/* HERO */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        <img
          src={curso.image}
          alt={curso.title}
          className="w-full h'75 md:h-100 object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end">
          <h1 className="text-white text-3xl md:text-5xl font-bold p-6">
            {curso.title}
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="mt-10 grid md:grid-cols-3 gap-8">

        {/* INFO */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-[#833132]">
            Descripción del curso
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            {curso.description}
          </p>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              ¿Qué aprenderás?
            </h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              {curso.learnPoints.map((i, id) => (
                <li key={id}>{i}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border space-y-5 h-fit">

          <div>
            <p className="text-gray-500">Precio</p>
            <p className="text-3xl font-bold text-[#833132]">
              ${curso.price}
            </p>
          </div>

          <button
            onClick={handleInscribirse}
            disabled={inscrito || !session || session.role !== 'user'}
            className={`
              w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
              ${inscrito
                ? 'bg-green-600 cursor-not-allowed'
                : 'bg-[#833132] hover:bg-[#5f2324] hover:-translate-y-1 shadow-lg'}
            `}
          >
            { inscrito ? '✔ Inscrito' : !session ? 'Inicia sesión' : session.role !== 'user' ? 'Solo usuarios pueden inscribirse' : 'Inscribirse'}
          </button>

          {!inscrito && (
            <p className="text-sm text-gray-500 text-center">
              Acceso inmediato después de inscribirte
            </p>
          )}

          {inscrito && (
            <p className="text-sm text-green-600 text-center">
              Ya estás inscrito en este curso 🎉
            </p>
          )}

        </div>
      </div>
    </div>
  );
}