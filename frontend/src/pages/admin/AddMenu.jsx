import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload, X, Loader2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading, categories } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      setLoading(true);
      
      // Professional way to handle multipart
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("price", formData.price);
      dataToSend.append("description", formData.description);
      dataToSend.append("category", formData.category);
      if (file) dataToSend.append("image", file);

      const { data } = await axios.post("/api/menu/add", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message || "Menu Item Added");
        navigate("/admin/menus");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 flex justify-center font-sans antialiased">
      <div className="w-full max-w-2xl px-6">
        
        {/* Header - Consistent with AddCategory */}
        <div className="mb-12 border-l-4 border-black pl-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">Add Menu Item</h1>
          <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest">Inventory Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Main Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Item Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-none focus:outline-none focus:border-black transition-colors text-gray-800"
                placeholder="e.g. Wagyu Beef Tartare"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Price (GBP)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-none focus:outline-none focus:border-black transition-colors text-gray-800"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Classification</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-none focus:outline-none focus:border-black appearance-none text-gray-800"
            >
              <option value="">Select a category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Description</label>
            <textarea
              name="description"
              required
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-none focus:outline-none focus:border-black transition-colors text-gray-800 resize-none"
              placeholder="Detail the ingredients and preparation..."
            />
          </div>

          {/* Upload Section */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Plating Imagery</label>
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-100 hover:border-black bg-gray-50 cursor-pointer transition-all group">
                <Upload className="w-5 h-5 text-gray-300 group-hover:text-black mb-2" />
                <span className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">Select File</span>
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="relative group border border-gray-200">
                <img src={preview} alt="preview" className="w-full h-56 object-cover" />
                <button 
                  type="button"
                  onClick={() => {setPreview(null); setFile(null);}}
                  className="absolute top-3 right-3 bg-black text-white p-2 hover:bg-neutral-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button 
              disabled={loading}
              className="w-full bg-black cursor-pointer text-white py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 disabled:bg-gray-300 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Updating System...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Publish to Menu
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;