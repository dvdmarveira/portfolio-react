import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../services/firebase";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: "",
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const experienceCollectionRef = collection(db, "experiences");
      const data = await getDocs(experienceCollectionRef);

      const experienceData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Ordenar experiências pela data de início (mais recente primeiro)
      experienceData.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA;
      });

      setExperiences(experienceData);
    } catch (error) {
      console.error("Erro ao carregar experiências:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: "",
    });
  };

  const handleEdit = (experience) => {
    setIsEditing(true);
    setEditingExperience(experience);
    setFormData({
      position: experience.position || "",
      company: experience.company || "",
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      description: experience.description || "",
      technologies: experience.technologies ? experience.technologies.join(", ") : "",
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditingExperience(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const experienceData = {
        position: formData.position,
        company: formData.company,
        startDate: formData.startDate,
        endDate: formData.endDate || "",
        description: formData.description,
        technologies: formData.technologies
          ? formData.technologies.split(",").map((tech) => tech.trim())
          : [],
      };

      if (isEditing && editingExperience) {
        // Atualizar experiência existente
        const experienceRef = doc(db, "experiences", editingExperience.id);
        await updateDoc(experienceRef, experienceData);
      } else {
        // Adicionar nova experiência
        const experiencesCollectionRef = collection(db, "experiences");
        await addDoc(experiencesCollectionRef, experienceData);
      }

      // Resetar o formulário e buscar experiências atualizadas
      setFormData({
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: "",
      });
      setIsAdding(false);
      setIsEditing(false);
      setEditingExperience(null);
      await fetchExperiences();
    } catch (error) {
      console.error("Erro ao salvar experiência:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta experiência?")) {
      try {
        const experienceRef = doc(db, "experiences", id);
        await deleteDoc(experienceRef);
        await fetchExperiences();
      } catch (error) {
        console.error("Erro ao excluir experiência:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Experiência
        </h2>
        {!isAdding && !isEditing && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Adicionar Experiência
          </button>
        )}
      </div>

      {/* Formulário para adicionar ou editar experiência */}
      {(isAdding || isEditing) && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4 border-b pb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {isEditing ? "Editar Experiência" : "Adicionar Experiência"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cargo *
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Empresa *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data de Início *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data de Término (deixe em branco se atual)
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tecnologias (separadas por vírgula)
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              placeholder="React, Node.js, Firebase, etc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isEditing ? "Atualizar" : "Salvar"}
            </button>
          </div>
        </form>
      )}

      {/* Lista de experiências */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      ) : experiences.length > 0 ? (
        <div className="space-y-6">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="border-l-4 border-indigo-500 pl-4 relative group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {experience.position}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400">
                    {experience.company}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {experience.startDate} - {experience.endDate || "Presente"}
                </div>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {experience.description}
              </p>
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {experience.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Botões de ação no final do card */}
              {!isAdding && !isEditing && (
                <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    title="Editar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(experience.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Excluir"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          Nenhuma experiência cadastrada
        </p>
      )}
    </div>
  );
}
