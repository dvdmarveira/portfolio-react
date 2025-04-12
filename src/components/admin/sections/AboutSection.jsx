import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";

export default function AboutSection() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [docId, setDocId] = useState("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutCollectionRef = collection(db, "about");
        const data = await getDocs(aboutCollectionRef);

        if (!data.empty) {
          const docData = data.docs[0].data();
          const id = data.docs[0].id;
          setAboutData(docData);
          setDocId(id);
          setDescription(docData.description || "");
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Sobre:", error);
        setError("Erro ao carregar dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDescription(aboutData?.description || "");
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    if (!docId) {
      setError("ID do documento não encontrado");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const aboutDocRef = doc(db, "about", docId);
      await updateDoc(aboutDocRef, {
        description: description,
        // Mantemos as habilidades no banco de dados, mas não as exibimos na interface
        // Isso evita perder dados existentes
      });

      // Atualizar o estado local
      setAboutData({
        ...aboutData,
        description: description,
      });

      setSuccess("Descrição atualizada com sucesso!");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar descrição:", error);
      setError("Erro ao salvar alterações. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Sobre mim
        </h2>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
          >
            Editar
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {aboutData ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Descrição
            </h3>
            {isEditing ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                rows="4"
                placeholder="Digite sua descrição aqui..."
              />
            ) : (
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {aboutData.description || "Nenhuma descrição disponível"}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          Nenhum dado disponível
        </p>
      )}
    </div>
  );
}
