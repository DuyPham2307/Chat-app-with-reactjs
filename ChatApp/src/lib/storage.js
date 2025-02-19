import supabase from "./supabase";

export const uploadImage = async (file) => {
  if (!file) return null;

  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`public/${fileName}`, file);

  if (error) {
    console.error("Lỗi tải ảnh lên:", error);
    return null;
  }

  // Lấy URL công khai
  const publicUrl = supabase.storage.from("images").getPublicUrl(data.path).data.publicUrl;
  console.log("Public Image URL:", publicUrl);
  return publicUrl;
};

export const downloadImage = async (path) => {
  const { data, error } = await supabase.storage.from("images").download(path);
  if (error) {
    console.error("Lỗi tải ảnh xuống:", error);
    return null;
  }
  return URL.createObjectURL(data);
};
