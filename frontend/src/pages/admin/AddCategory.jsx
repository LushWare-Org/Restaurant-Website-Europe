import { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Upload, X, Loader2, Save } from "lucide-react";
import { toast } from "react-hot-toast";

const AddCategory = () => {
  const { id } = useParams();
  const { axios, navigate, fetchCategories } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchCategoryDetails = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/category/${id}`);
      if (data.success) {
        setFormData({ name: data.category.name });
        setPreview(data.category.image);
      }
    } catch (error) {
      console.error("Failed to fetch category details:", error);
      toast.error("Failed to fetch category details");
    }
  }, [axios, id]);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchCategoryDetails();
    }
  }, [id, fetchCategoryDetails]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      if (file) dataToSend.append("image", file);

      const url = isEditMode ? `/api/category/update/${id}` : "/api/category/add";
      const method = isEditMode ? "put" : "post";

      const { data } = await axios[method](url, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(isEditMode ? "Category Updated" : "Category Created");
        await fetchCategories(); // Refresh categories list
        navigate("/admin/categories");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Error creating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 flex justify-center">
      <div className="w-full max-w-lg px-6">
        
        {/* Simple Professional Header */}
        <div className="mb-12 border-l-4 border-black pl-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">{isEditMode ? "Edit Category" : "Add Category"}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Input Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Category Title
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-none focus:outline-none focus:border-black transition-colors text-gray-800"
              placeholder="e.g. Tasting Menu"
            />
          </div>

          {/* Upload Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Cover Image {isEditMode && !file && <span className="text-gray-400 normal-case font-normal">(Upload new to replace)</span>}
            </label>
            
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-100 hover:border-gray-300 bg-gray-50 cursor-pointer transition-all group">
                <Upload className="w-5 h-5 text-gray-300 group-hover:text-black mb-2" />
                <span className="text-[11px] text-gray-400 uppercase tracking-tighter">Click to upload photo</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            ) : (
              <div className="relative group overflow-hidden border border-gray-200">
                <img src={preview} alt="preview" className="w-full h-48 object-cover" />
                {file && (
                  <button 
                    type="button"
                    onClick={() => {setPreview(null); setFile(null);}}
                    className="absolute top-2 right-2 bg-black text-white p-1 hover:bg-gray-800"
                  >
                    <X size={16} />
                  </button>
                )}
                {isEditMode && !file && (
                  <label className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 hover:bg-gray-800 cursor-pointer text-xs uppercase tracking-wider">
                    Change
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                )}
              </div>
            )}
          </div>

          {/* Action Button */}
          <button 
            disabled={isSubmitting}
            className="w-full bg-black cursor-pointer text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 disabled:bg-gray-300 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                {isEditMode ? "Updating..." : "Processing"}
              </>
            ) : (
              <>
                {isEditMode && <Save size={16} />}
                {isEditMode ? "Update Category" : "Save Category"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;